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
import { AnimatedSection, AnimatedItem, ParallaxContainer } from "./animated-section";
import { Tiles } from "./tiles";

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

// Animated Section Wrapper with enhanced effects
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'zoom' | 'slideInLeft' | 'slideInRight';
}

function AnimatedSection({ children, className = "", delay = 0, direction = 'up' }: AnimatedSectionProps) {
  const [ref, isInView] = useScrollAnimationOld();
  
  const variants = {
    up: { y: 60, opacity: 0 },
    left: { x: -60, opacity: 0 },
    right: { x: 60, opacity: 0 },
    zoom: { scale: 0.8, opacity: 0 },
    slideInLeft: { x: -100, opacity: 0 },
    slideInRight: { x: 100, opacity: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { x: 0, y: 0, scale: 1, opacity: 1 } : variants[direction]}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 60
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
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
      description: "Advanced machine learning algorithms for precise medical analysis and early detection"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Continuous health tracking with intelligent alerts and personalized insights"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "HIPAA-compliant platform with military-grade encryption and data protection"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Clinical Integration",
      description: "Seamless workflow integration with existing medical systems and protocols"
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
    <div className="min-h-screen relative">
      {/* Fixed Tiles Background */}
      <div className="fixed inset-0 z-0">
        <Tiles 
          rows={120} 
          cols={20}
          tileSize="md"
          className="w-full h-full opacity-40"
        />
      </div>

      {/* Main Content with enhanced background */}
      <div className="relative z-10 premium-bg">
        {/* Hero Section - UNCHANGED as requested */}
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
                <img
                  className="size-full object-cover object-center opacity-80"
                  src={imageUrl}
                  alt={`Healthcare technology ${index + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </BentoCell>
            ))}
          </BentoGrid>
          
          <ContainerScale className="text-center z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto px-6"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
              >
                AI for Healthcare.
                <br />
                <span className="text-slate-800">Smarter Starts Here.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Experience health like never before — powered by intelligent design and cutting-edge AI technology.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <GlowingGradientButton className="animate-glow">
                  Try It Now <ArrowRight className="w-5 h-5" />
                </GlowingGradientButton>
                <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-300">
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </ContainerScale>
        </ContainerScroll>

        {/* Enhanced Stats Section with Smooth Scroll Animations */}
        <section className="py-24 px-6 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-sage-50/40 to-spa-blue-50/30 backdrop-blur-sm" />
          <div className="max-w-6xl mx-auto relative">
            <AnimatedSection variant="staggerContainer">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {stats.map((stat, index) => (
                  <AnimatedItem
                    key={index}
                    delay={index * 0.1}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        y: -4,
                        rotateY: 3,
                        rotateX: 2
                      }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="mb-4 transform-gpu card-float glass-card-soft p-6 rounded-2xl"
                    >
                      <AnimatedCounter
                        end={stat.number}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                      <p className="text-sage-600 font-medium mt-2 group-hover:text-sage-700 transition-colors duration-300">
                        {stat.label}
                      </p>
                    </motion.div>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="section-divider" />

        {/* Enhanced Health Risk Scanner with Parallax */}
        <div className="relative z-10 overflow-hidden py-12">
          <FloatingElements />
          <ParallaxContainer intensity={0.3}>
            <AnimatedSection variant="scaleIn" className="glass-card-soft mx-4 rounded-3xl">
              <HealthRiskScanner />
            </AnimatedSection>
          </ParallaxContainer>
        </div>

        <div className="section-divider" />

        {/* Enhanced Diagnostic Chat with Slide Animation */}
        <AnimatedSection variant="slideFromLeft" className="relative z-10 py-12">
          <div className="glass-card-soft mx-4 rounded-3xl">
            <DiagnosticChat />
          </div>
        </AnimatedSection>

        <div className="section-divider" />

        {/* Enhanced Medical Upload with Slide Animation */}
        <AnimatedSection variant="slideFromRight" className="relative z-10 py-12">
          <div className="glass-card-soft mx-4 rounded-3xl">
            <MedicalUpload />
          </div>
        </AnimatedSection>

        <div className="section-divider" />

        {/* Enhanced Healthcare Testimonials with Fade Up */}
        <section className="py-24 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-50/30 via-transparent to-spa-blue-50/30" />
          <AnimatedSection variant="fadeUp" className="relative">
            <HealthcareTestimonials />
          </AnimatedSection>
        </section>

        <div className="section-divider" />

        {/* Enhanced How It Works Section with Staggered Animations */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-sage-50/40 to-spa-blue-50/30 backdrop-blur-sm" />
          <div className="max-w-6xl mx-auto relative">
            <AnimatedSection variant="slideFromLeft" className="text-center mb-20">
              <motion.div
                className="inline-block px-6 py-2 rounded-full bg-sage-100/50 text-sage-700 text-sm font-medium mb-6"
              >
                How It Works
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-premium leading-tight">
                Your Health Journey
                <br />
                <span className="text-sage-800">Simplified</span>
              </h2>
              <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Three simple steps to transform your healthcare experience with intelligent AI assistance
              </p>
            </AnimatedSection>

            <AnimatedSection variant="staggerContainer">
              <div className="grid md:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                  <AnimatedItem
                    key={index}
                    delay={index * 0.15}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02, 
                        y: -8,
                        rotateY: 2,
                        rotateX: 1
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.23, 1, 0.32, 1] 
                      }}
                      className="h-full transform-gpu card-float"
                    >
                      <div className="glass-card p-10 h-full rounded-3xl group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sage-100/30 to-spa-blue-100/20 rounded-full -translate-y-16 translate-x-16" />
                        <motion.div 
                          className="text-7xl font-bold text-sage-200/60 mb-6 group-hover:text-sage-300/70 transition-colors relative z-10"
                          whileHover={{ 
                            rotate: [0, -3, 3, 0],
                            scale: 1.05
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          {step.number}
                        </motion.div>
                        <h3 className="text-2xl font-semibold mb-6 text-sage-800 relative z-10">
                          {step.title}
                        </h3>
                        <p className="text-warm-neutral-600 leading-relaxed relative z-10 text-lg">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="section-divider" />

        {/* Enhanced Features Section with Staggered Cards */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-50/20 via-transparent to-spa-blue-50/20" />
          <FloatingElements />
          <div className="max-w-6xl mx-auto relative">
            <AnimatedSection variant="slideFromRight" className="text-center mb-20">
              <motion.div
                className="inline-block px-6 py-2 rounded-full bg-spa-blue-100/50 text-spa-blue-700 text-sm font-medium mb-6"
              >
                Advanced Features
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-sage-800 leading-tight">
                Why Choose Our
                <br />
                <span className="text-premium">AI Healthcare Platform</span>
              </h2>
              <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Advanced AI capabilities designed specifically for healthcare professionals and patients
              </p>
            </AnimatedSection>

            <AnimatedSection variant="staggerContainer">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <AnimatedItem
                    key={index}
                    delay={index * 0.1}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.03, 
                        rotateY: 4,
                        rotateX: 2,
                        y: -6
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.23, 1, 0.32, 1] 
                      }}
                      className="h-full transform-gpu perspective-1000 card-float"
                    >
                      <div className="glass-card p-8 h-full rounded-3xl group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/30 to-spa-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <motion.div 
                          className="text-sage-500 mb-6 group-hover:text-sage-600 transition-colors relative z-10"
                          whileHover={{ 
                            scale: 1.15, 
                            rotate: 3,
                            y: -2
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-4 text-sage-800 relative z-10">
                          {feature.title}
                        </h3>
                        <p className="text-warm-neutral-600 text-sm leading-relaxed relative z-10">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="section-divider" />

        {/* Enhanced Screenshot Section with Parallax */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-sage-50/30 to-spa-blue-50/20 backdrop-blur-sm" />
          <div className="max-w-6xl mx-auto text-center relative">
            <AnimatedSection variant="fadeUp" className="mb-16">
              <motion.div
                className="inline-block px-6 py-2 rounded-full bg-sage-100/50 text-sage-700 text-sm font-medium mb-6"
              >
                Platform Preview
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-sage-800 leading-tight">
                See Innovation
                <br />
                <span className="text-premium">In Action</span>
              </h2>
              <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Experience the future of healthcare with our intuitive, AI-powered interface designed for excellence
              </p>
            </AnimatedSection>

            <ParallaxContainer intensity={0.2}>
              <AnimatedSection variant="scaleIn" delay={0.3}>
                <motion.div className="relative max-w-5xl mx-auto">
                  <motion.div 
                    className="relative rounded-3xl overflow-hidden glass-card p-4"
                    whileHover={{ 
                      scale: 1.01,
                      rotateY: 0.5,
                      rotateX: 0.3
                    }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-sage-50/20 to-spa-blue-50/10" />
                    <div className="relative z-10">
                      <motion.img
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2340&auto=format&fit=crop"
                        alt="Healthcare AI Dashboard"
                        className="w-full h-auto rounded-2xl shadow-2xl"
                        whileHover={{ scale: 1.005 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            </ParallaxContainer>
          </div>
        </section>

        <div className="section-divider" />

        {/* Enhanced Final CTA Section */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-900/95 via-sage-800/90 to-spa-blue-900/85 backdrop-blur-sm" />
          <FloatingElements />
          <div className="max-w-4xl mx-auto text-center relative">
            <AnimatedSection variant="scaleIn">
              <motion.div
                className="inline-block px-6 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm"
              >
                Ready to Transform Healthcare?
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-7xl font-bold mb-8 leading-tight"
                whileInView={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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
              <p className="text-xl md:text-2xl text-sage-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of healthcare professionals already using AI to improve patient outcomes and transform lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MagneticButton className="btn-premium btn-magnetic bg-gradient-to-r from-sage-500 to-spa-blue-500 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-2xl hover:shadow-sage-500/25">
                    Get Started Today <ArrowRight className="w-6 h-6 ml-2" />
                  </MagneticButton>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="glass-card-soft border-white/20 text-white hover:bg-white/10 transition-all duration-300 px-8 py-6 text-lg"
                  >
                    Schedule Demo
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HealthcareAILandingPage;
