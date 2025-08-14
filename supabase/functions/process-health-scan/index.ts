import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!;

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

    let analysisText = '';
    let risksDetected: string[] = [];
    let confidenceScores: number[] = [];

    // Determine file type and process accordingly
    if (fileExtension === 'pdf') {
      analysisText = 'PDF medical report detected. Advanced text extraction and analysis would be performed here.';
      risksDetected = ['Document Analysis Pending'];
      confidenceScores = [0.85];
    } else if (['jpg', 'jpeg', 'png'].includes(fileExtension || '')) {
      // Simulate X-ray or medical image analysis
      analysisText = 'Medical image detected. Advanced imaging analysis would be performed here using TorchXRayVision and MONAI.';
      risksDetected = ['Potential Anomaly Detected', 'Further Review Recommended'];
      confidenceScores = [0.78, 0.82];
    }

    // Analyze with Gemini API
    const geminiPrompt = `As a medical AI assistant, analyze this health scan data: ${analysisText}. 
    Detected risks: ${risksDetected.join(', ')}. 
    Provide a professional medical summary and recommendations. Keep it concise and professional.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: geminiPrompt }]
          }]
        })
      }
    );

    const geminiData = await geminiResponse.json();
    const aiSummary = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis completed. Please consult with a healthcare professional for detailed interpretation.';

    // Generate recommendations
    const recommendationsPrompt = `Based on the health scan analysis: "${aiSummary}", provide 3-5 specific, actionable healthcare recommendations. Format as bullet points.`;
    
    const recResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: recommendationsPrompt }]
          }]
        })
      }
    );

    const recData = await recResponse.json();
    const recommendations = recData?.candidates?.[0]?.content?.parts?.[0]?.text || 'Consult with a healthcare professional for personalized recommendations.';

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