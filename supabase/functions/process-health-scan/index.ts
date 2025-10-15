import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { file_id, file_path } = await req.json();
    console.log('Processing health scan:', { file_id, file_path });

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('health_scans')
      .download(file_path);

    if (downloadError) {
      console.error('Download error:', downloadError);
      throw downloadError;
    }

    const arrayBuffer = await fileData.arrayBuffer();
    const fileExtension = file_path.toLowerCase().split('.').pop();

    let risksDetected: string[] = [];
    let confidenceScores: number[] = [];
    let aiSummary = '';
    let recommendations = '';

    // Convert image to base64 for AI analysis
    if (['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension || '')) {
      console.log('Processing X-ray image for AI analysis');
      
      // Convert to base64
      const base64Image = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const imageDataUrl = `data:image/${fileExtension};base64,${base64Image}`;

      // Analyze X-ray with Lovable AI vision model
      const analysisPrompt = `You are an expert medical imaging AI assistant specializing in X-ray analysis. Analyze this X-ray image carefully and provide:

1. A list of any anomalies, abnormalities, or areas of concern detected
2. For each finding, provide a confidence score (0-100%)
3. A brief description of each finding
4. Overall assessment of the X-ray

Format your response as JSON with this structure:
{
  "findings": [
    {"anomaly": "description", "confidence": 85, "details": "explanation"}
  ],
  "summary": "overall assessment"
}

IMPORTANT: This is for educational/screening purposes only. Always recommend consulting with a qualified radiologist or healthcare professional for definitive diagnosis.`;

      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: analysisPrompt },
                { type: 'image_url', image_url: { url: imageDataUrl } }
              ]
            }
          ],
          max_tokens: 1000
        })
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('Lovable AI error:', aiResponse.status, errorText);
        throw new Error(`AI analysis failed: ${errorText}`);
      }

      const aiData = await aiResponse.json();
      const aiContent = aiData?.choices?.[0]?.message?.content || '';
      
      console.log('AI Response:', aiContent);

      // Parse AI response
      try {
        // Extract JSON from the response (it might be wrapped in markdown code blocks)
        const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedResponse = JSON.parse(jsonMatch[0]);
          
          // Extract findings
          if (parsedResponse.findings && Array.isArray(parsedResponse.findings)) {
            risksDetected = parsedResponse.findings.map((f: any) => f.anomaly || f.description || 'Unspecified finding');
            confidenceScores = parsedResponse.findings.map((f: any) => (f.confidence || 50) / 100);
          }
          
          aiSummary = parsedResponse.summary || aiContent;
        } else {
          // Fallback if JSON parsing fails
          aiSummary = aiContent;
          risksDetected = ['AI analysis completed - review summary for details'];
          confidenceScores = [0.75];
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        aiSummary = aiContent;
        risksDetected = ['AI analysis completed - review summary for details'];
        confidenceScores = [0.75];
      }

      // Generate recommendations based on analysis
      const recResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'user',
              content: `Based on this X-ray analysis: "${aiSummary}", provide 3-5 specific, actionable healthcare recommendations. Format as bullet points. Remember to emphasize the importance of consulting with a qualified healthcare professional.`
            }
          ],
          max_tokens: 500
        })
      });

      const recData = await recResponse.json();
      recommendations = recData?.choices?.[0]?.message?.content || 'Please consult with a qualified radiologist or healthcare professional for a comprehensive evaluation and personalized recommendations.';

    } else {
      // Non-image files (PDFs, etc.)
      aiSummary = 'Document uploaded successfully. Please note that detailed analysis of PDF documents requires additional processing.';
      risksDetected = ['Document uploaded - manual review recommended'];
      confidenceScores = [0.5];
      recommendations = 'Please consult with a healthcare professional to review this document in detail.';
    }

    // Update the database record
    const { error: updateError } = await supabase
      .from('health_scan_results')
      .update({
        risks_detected: risksDetected,
        confidence_scores: confidenceScores,
        ai_summary: aiSummary,
        recommendations: recommendations,
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('file_id', file_id);

    if (updateError) {
      console.error('Update error:', updateError);
      throw updateError;
    }

    console.log('Health scan processing completed successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Health scan processed successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in process-health-scan function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});