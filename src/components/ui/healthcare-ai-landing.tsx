"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue, HTMLMotionProps, useInView } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, Heart, Shield, Zap, Users, ArrowRight, CheckCircle, Brain, Activity, Stethoscope, TrendingUp, Award, Clock } from "lucide-react";
import { HealthRiskScanner } from "./health-risk-scanner";
import { DiagnosticChat } from "./diagnostic-chat";
import { MedicalUpload } from "./medical-upload";
import { FloatingElements } from "./floating-elements";
import { HealthcareTestimonials } from "./testimonials-columns-1";
import { AnimatedCounter } from "./animated-counter";
import { MagneticButton } from "./magnetic-button";
import { AnimatedSection, AnimatedItem, ParallaxContainer, TextReveal, ParallaxBackground } from "./animated-section";
import { Tiles } from "./tiles";
import { Floating3DCard } from "./floating-3d-card";
import { Floating3DIcons } from "./floating-3d-icons";
import { Interactive3DButton } from "./interactive-3d-button";
import { SubtleBackgroundAnimation } from "./subtle-background-animation";
import { EnhancedTooltip } from "./enhanced-tooltip";

// Utility function
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Card component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// Glowing Button Component
interface GlowingGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function GlowingGradientButton({ 
  children, 
  className = '',
  ...props 
}: GlowingGradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      className={`relative px-8 py-4 rounded-full text-lg font-semibold text-white cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-full" />
      <div 
        className={`absolute inset-0.5 bg-gray-900 rounded-full transition-opacity duration-500 ${
          isHovered ? 'opacity-70' : 'opacity-100'
        }`} 
      />
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-full blur-xl transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

// Get Started Button Component
function GetStartedButton() {
  return (
    <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" size="lg">
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        Try It Now
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}

// Enhanced Animation Hook
function useScrollAnimationOld() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return [ref, isInView] as const;
}

// Scroll Animation Components
interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error("useContainerScrollContext must be used within a ContainerScroll Component");
  }
  return context;
}

const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });
  
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

const bentoGridVariants = cva(
  "relative grid gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
  {
    variants: {
      variant: {
        default: `
          grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]
          [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3
          [&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block
          [&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block
          [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
          [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
        `,
        threeCells: `
          grid-cols-2 grid-rows-2
          [&>*:first-child]:col-span-2
        `,
        fourCells: `
          grid-cols-3 grid-rows-2
          [&>*:first-child]:col-span-1
          [&>*:nth-child(2)]:col-span-2
          [&>*:nth-child(3)]:col-span-2
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  );
});
BentoGrid.displayName = "BentoGrid";

const BentoCell = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext();
    const translate = useTransform(scrollYProgress, [0.1, 0.9], ["-35%", "0%"]);
    const scale = useTransform(scrollYProgress, [0, 0.9], [0.5, 1]);

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ translate, scale, ...style }}
        {...props}
      />
    );
  }
);
BentoCell.displayName = "BentoCell";

const ContainerScale = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext();
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const position = useTransform(scrollYProgress, (pos) =>
      pos >= 0.6 ? "absolute" : "fixed"
    );
    
    return (
      <motion.div
        ref={ref}
        className={cn("left-1/2 top-1/2 size-fit", className)}
        style={{
          translate: "-50% -50%",
          scale,
          position,
          opacity,
          ...style,
        }}
        {...props}
      />
    );
  }
);
ContainerScale.displayName = "ContainerScale";

// Healthcare AI Landing Page Component
const HealthcareAILandingPage = () => {
  const HEALTHCARE_IMAGES = [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2340&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2340&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2340&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2340&auto=format&fit=crop",
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Diagnostics",
      description: "Advanced machine learning algorithms for precise medical analysis and early detection",
      tooltip: "Our AI processes millions of medical cases to provide accurate diagnostics"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Continuous health tracking with intelligent alerts and personalized insights",
      tooltip: "24/7 monitoring with instant notifications for critical changes"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "HIPAA-compliant platform with military-grade encryption and data protection",
      tooltip: "Your health data is protected with enterprise-level security"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Clinical Integration",
      description: "Seamless workflow integration with existing medical systems and protocols",
      tooltip: "Works with all major healthcare management systems"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Your Data",
      description: "Securely link your health records, wearables, and medical devices"
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our intelligent system processes and analyzes your comprehensive health profile"
    },
    {
      number: "03",
      title: "Get Insights",
      description: "Receive personalized health recommendations, alerts, and actionable insights"
    }
  ];

  const stats = [
    { number: 50000, suffix: "+", label: "Patients Served" },
    { number: 98, suffix: "%", label: "Accuracy Rate" },
    { number: 24, suffix: "/7", label: "AI Monitoring" },
    { number: 500, suffix: "+", label: "Healthcare Partners" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle Background Animation */}
      <SubtleBackgroundAnimation />
      
      {/* Floating 3D Icons */}
      <Floating3DIcons />

      {/* Fixed Tiles Background with Parallax */}
      <div className="fixed inset-0 z-0">
        <motion.div
          initial={{ opacity: 0.2, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Tiles 
            rows={120} 
            cols={20}
            tileSize="md"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Main Content with enhanced background */}
      <div className="relative z-10 premium-bg">
        {/* Hero Section with Enhanced Cinematic Entry */}
        <ContainerScroll className="h-[400vh] relative z-10">
          <BentoGrid
            variant="fourCells"
            className="sticky left-0 top-0 h-screen w-full p-4"
          >
            {HEALTHCARE_IMAGES.map((imageUrl, index) => (
              <BentoCell
                key={index}
                className="overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20"
              >
                <motion.img
                  className="size-full object-cover object-center opacity-80"
                  src={imageUrl}
                  alt={`Healthcare technology ${index + 1}`}
                  initial={{ scale: 1.2, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ 
                    duration: 2 + index * 0.2, 
                    ease: "easeOut" 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </BentoCell>
            ))}
          </BentoGrid>
          
          <ContainerScale className="text-center z-20">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto px-6"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
              >
                AI for Healthcare.
                <br />
                <span className="text-slate-800">Smarter Starts Here.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Experience health like never before — powered by intelligent design and cutting-edge AI technology.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Interactive3DButton variant="primary" size="lg" shimmer>
                  Try It Now
                </Interactive3DButton>
                <Interactive3DButton variant="outline" size="lg">
                  Watch Demo
                </Interactive3DButton>
              </motion.div>
            </motion.div>
          </ContainerScale>
        </ContainerScroll>

        {/* Enhanced Stats Section with 3D Cards */}
        <section className="py-24 px-6 relative z-10 overflow-hidden">
          <ParallaxContainer intensity={0.3}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-sage-50/40 to-spa-blue-50/30 backdrop-blur-sm" />
          </ParallaxContainer>
          <div className="max-w-6xl mx-auto relative">
            <AnimatedSection variant="staggerContainer">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {stats.map((stat, index) => (
                  <AnimatedItem
                    key={index}
                    delay={index * 0.15}
                    className="text-center group"
                  >
                    <Floating3DCard 
                      depth="medium" 
                      glowColor="rgba(16, 185, 129, 0.2)"
                      floatIntensity={1.2}
                      className="p-6"
                    >
                      <AnimatedCounter
                        end={stat.number}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                      <p className="text-sage-600 font-medium mt-2 group-hover:text-sage-700 transition-colors duration-300">
                        {stat.label}
                      </p>
                    </Floating3DCard>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="section-divider" />

        {/* Enhanced Health Risk Scanner with 3D Card */}
        <div className="relative z-10 overflow-hidden py-12">
          <FloatingElements />
          <ParallaxContainer intensity={0.4}>
            <AnimatedSection variant="scaleIn" threshold={0.2}>
              <Floating3DCard className="mx-4" depth="deep" glowColor="rgba(6, 182, 212, 0.2)">
                <HealthRiskScanner />
              </Floating3DCard>
            </AnimatedSection>
          </ParallaxContainer>
        </div>

        <div className="section-divider" />

        {/* Enhanced Diagnostic Chat with 3D Card */}
        <AnimatedSection variant="slideFromLeft" threshold={0.15} className="relative z-10 py-12">
          <Floating3DCard className="mx-4" depth="deep" glowColor="rgba(16, 185, 129, 0.2)">
            <DiagnosticChat />
          </Floating3DCard>
        </AnimatedSection>

        <div className="section-divider" />

        {/* Enhanced Medical Upload with 3D Card */}
        <AnimatedSection variant="slideFromRight" threshold={0.15} className="relative z-10 py-12">
          <Floating3DCard className="mx-4" depth="deep" glowColor="rgba(139, 69, 19, 0.1)">
            <MedicalUpload />
          </Floating3DCard>
        </AnimatedSection>

        <div className="section-divider" />

        {/* Enhanced Healthcare Testimonials */}
        <section className="py-24 relative z-10">
          <ParallaxContainer intensity={0.2}>
            <div className="absolute inset-0 bg-gradient-to-br from-sage-50/30 via-transparent to-spa-blue-50/30" />
          </ParallaxContainer>
          <AnimatedSection variant="fadeUp" threshold={0.1} className="relative">
            <HealthcareTestimonials />
          </AnimatedSection>
        </section>

        <div className="section-divider" />

        {/* Enhanced How It Works Section with 3D Cards */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          <ParallaxContainer intensity={0.25}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-sage-50/40 to-spa-blue-50/30 backdrop-blur-sm" />
          </ParallaxContainer>
          <div className="max-w-6xl mx-auto relative">
            <AnimatedSection variant="slideFromLeft" threshold={0.2} className="text-center mb-20">
              <TextReveal direction="up" delay={0.2}>
                <div className="inline-block px-6 py-2 rounded-full bg-sage-100/50 text-sage-700 text-sm font-medium mb-6">
                  How It Works
                </div>
              </TextReveal>
              <TextReveal direction="up" delay={0.4}>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-premium leading-tight">
                  Your Health Journey
                  <br />
                  <span className="text-sage-800">Simplified</span>
                </h2>
              </TextReveal>
              <TextReveal direction="up" delay={0.6}>
                <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  Three simple steps to transform your healthcare experience with intelligent AI assistance
                </p>
              </TextReveal>
            </AnimatedSection>

            <AnimatedSection variant="staggerContainer" threshold={0.15}>
              <div className="grid md:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                  <AnimatedItem
                    key={index}
                    delay={index * 0.2}
                    className="group"
                  >
                    <Floating3DCard 
                      depth="medium" 
                      glowColor={`rgba(${16 + index * 40}, ${185 - index * 20}, 129, 0.15)`}
                      floatIntensity={0.8}
                      className="h-full p-10"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sage-100/30 to-spa-blue-100/20 rounded-full -translate-y-16 translate-x-16" />
                      <motion.div 
                        className="text-7xl font-bold text-sage-200/60 mb-6 group-hover:text-sage-300/70 transition-colors relative z-10"
                        whileHover={{ 
                          rotate: [0, -2, 2, 0],
                          scale: 1.05
                        }}
                        transition={{ duration: 0.8 }}
                      >
                        {step.number}
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-6 text-sage-800 relative z-10">
                        {step.title}
                      </h3>
                      <p className="text-warm-neutral-600 leading-relaxed relative z-10 text-lg">
                        {step.description}
                      </p>
                    </Floating3DCard>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="section-divider" />

        {/* Enhanced Features Section with 3D Cards and Tooltips */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          <ParallaxContainer intensity={0.3}>
            <div className="absolute inset-0 bg-gradient-to-br from-sage-50/20 via-transparent to-spa-blue-50/20" />
          </ParallaxContainer>
          <FloatingElements />
          <div className="max-w-6xl mx-auto relative">
            <AnimatedSection variant="slideFromRight" threshold={0.2} className="text-center mb-20">
              <TextReveal direction="right" delay={0.2}>
                <div className="inline-block px-6 py-2 rounded-full bg-spa-blue-100/50 text-spa-blue-700 text-sm font-medium mb-6">
                  Advanced Features
                </div>
              </TextReveal>
              <TextReveal direction="up" delay={0.4}>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-sage-800 leading-tight">
                  Why Choose Our
                  <br />
                  <span className="text-premium">AI Healthcare Platform</span>
                </h2>
              </TextReveal>
              <TextReveal direction="up" delay={0.6}>
                <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  Advanced AI capabilities designed specifically for healthcare professionals and patients
                </p>
              </TextReveal>
            </AnimatedSection>

            <AnimatedSection variant="staggerContainer" threshold={0.15}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <AnimatedItem
                    key={index}
                    delay={index * 0.15}
                    className="group"
                  >
                    <EnhancedTooltip content={feature.tooltip}>
                      <Floating3DCard 
                        depth="medium" 
                        glowColor={`rgba(${16 + index * 40}, ${185 - index * 20}, 129, 0.12)`}
                        floatIntensity={1}
                        className="h-full p-8 cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/30 to-spa-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <motion.div 
                          className="text-sage-500 mb-6 group-hover:text-sage-600 transition-colors relative z-10"
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 5,
                            y: -4
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-4 text-sage-800 relative z-10">
                          {feature.title}
                        </h3>
                        <p className="text-warm-neutral-600 text-sm leading-relaxed relative z-10">
                          {feature.description}
                        </p>
                      </Floating3DCard>
                    </EnhancedTooltip>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="section-divider" />

        {/* Enhanced Screenshot Section with 3D Parallax */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          <ParallaxContainer intensity={0.4}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-sage-50/30 to-spa-blue-50/20 backdrop-blur-sm" />
          </ParallaxContainer>
          <div className="max-w-6xl mx-auto text-center relative">
            <AnimatedSection variant="fadeUp" threshold={0.2} className="mb-16">
              <TextReveal direction="up" delay={0.2}>
                <div className="inline-block px-6 py-2 rounded-full bg-sage-100/50 text-sage-700 text-sm font-medium mb-6">
                  Platform Preview
                </div>
              </TextReveal>
              <TextReveal direction="up" delay={0.4}>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-sage-800 leading-tight">
                  See Innovation
                  <br />
                  <span className="text-premium">In Action</span>
                </h2>
              </TextReveal>
              <TextReveal direction="up" delay={0.6}>
                <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  Experience the future of healthcare with our intuitive, AI-powered interface designed for excellence
                </p>
              </TextReveal>
            </AnimatedSection>

            <ParallaxContainer intensity={0.3}>
              <AnimatedSection variant="scaleIn" delay={0.3} threshold={0.2}>
                <Floating3DCard 
                  className="max-w-5xl mx-auto p-4" 
                  depth="deep" 
                  glowColor="rgba(16, 185, 129, 0.1)"
                >
                  <div className="relative z-10">
                    <motion.img
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2340&auto=format&fit=crop"
                      alt="Healthcare AI Dashboard"
                      className="w-full h-auto rounded-2xl shadow-2xl"
                      initial={{ scale: 1.1, opacity: 0.8, filter: 'blur(4px)' }}
                      whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      viewport={{ once: true, margin: "-10%" }}
                    />
                  </div>
                </Floating3DCard>
              </AnimatedSection>
            </ParallaxContainer>
          </div>
        </section>

        <div className="section-divider" />

        {/* Enhanced Final CTA Section with 3D Effects */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          <ParallaxContainer intensity={0.5}>
            <div className="absolute inset-0 bg-gradient-to-br from-sage-900/95 via-sage-800/90 to-spa-blue-900/85 backdrop-blur-sm" />
          </ParallaxContainer>
          <FloatingElements />
          <div className="max-w-4xl mx-auto text-center relative">
            <AnimatedSection variant="scaleIn" threshold={0.2}>
              <TextReveal direction="up" delay={0.2}>
                <div className="inline-block px-6 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm">
                  Ready to Transform Healthcare?
                </div>
              </TextReveal>
              <motion.h2 
                className="text-4xl md:text-7xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
                style={{
                  background: "linear-gradient(45deg, #ffffff, #10b981, #06b6d4, #ffffff)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Health Journey
                <br />
                Starts Here
              </motion.h2>
              <TextReveal direction="up" delay={0.6}>
                <p className="text-xl md:text-2xl text-sage-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of healthcare professionals already using AI to improve patient outcomes and transform lives.
                </p>
              </TextReveal>
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
              >
                <Interactive3DButton 
                  variant="primary" 
                  size="lg" 
                  className="text-white shadow-2xl"
                  shimmer
                >
                  Get Started Today
                </Interactive3DButton>
                <Interactive3DButton 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Schedule Demo
                </Interactive3DButton>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HealthcareAILandingPage;
