"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue, HTMLMotionProps, useInView, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, Heart, Shield, Zap, Users, ArrowRight, CheckCircle, Brain, Activity, Stethoscope } from "lucide-react";
import { HealthRiskScanner } from "./health-risk-scanner";
import { DiagnosticChat } from "./diagnostic-chat";
import { MedicalUpload } from "./medical-upload";
import { PremiumScrollProgress } from "./premium-scroll-progress";
import { PremiumBackground } from "./premium-background";
import { MagneticButton } from "./magnetic-button";

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  return (
    <MagneticButton
      className={`btn-premium relative px-8 py-4 rounded-full text-lg font-semibold text-white cursor-pointer transition-all duration-500 overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full"
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? 180 : 0
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div 
        className="absolute inset-0.5 bg-gray-900 rounded-full transition-opacity duration-500 group-hover:opacity-0" 
      />
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.2), transparent 80%)`
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </MagneticButton>
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

// Enhanced Animation Hook with Intersection Observer
function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3
  });
  return [ref, isInView] as const;
}

// Premium Animated Section Wrapper
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'zoom' | 'bottom';
  stagger?: boolean;
}

function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0, 
  direction = 'up',
  stagger = false 
}: AnimatedSectionProps) {
  const [ref, isInView] = useScrollAnimation();
  
  const variants = {
    up: { y: 60, opacity: 0, scale: 0.95 },
    left: { x: -50, opacity: 0, rotateY: -10 },
    right: { x: 50, opacity: 0, rotateY: 10 },
    zoom: { scale: 0.8, opacity: 0, rotateZ: -5 },
    bottom: { y: 100, opacity: 0, rotateX: 45 }
  };

  const exitVariants = {
    up: { y: 0, opacity: 1, scale: 1 },
    left: { x: 0, opacity: 1, rotateY: 0 },
    right: { x: 0, opacity: 1, rotateY: 0 },
    zoom: { scale: 1, opacity: 1, rotateZ: 0 },
    bottom: { y: 0, opacity: 1, rotateX: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? exitVariants[direction] : variants[direction]}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={className}
    >
      {stagger ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: delay + (index * 0.1) }}
          >
            {child}
          </motion.div>
        ))
      ) : children}
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
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=2340&auto=format&fit=crop",
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Diagnostics",
      description: "Advanced machine learning algorithms for precise medical analysis"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Continuous health tracking with intelligent alerts and insights"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "HIPAA-compliant platform with end-to-end encryption"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Clinical Integration",
      description: "Seamless workflow integration with existing medical systems"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Your Data",
      description: "Securely link your health records and devices"
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our intelligent system processes and analyzes your information"
    },
    {
      number: "03",
      title: "Get Insights",
      description: "Receive personalized health recommendations and alerts"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PremiumScrollProgress />
      <PremiumBackground />
      
      {/* Hero Section with Enhanced Scroll Animation */}
      <ContainerScroll className="h-[400vh] relative z-10">
        <BentoGrid
          variant="fourCells"
          className="sticky left-0 top-0 h-screen w-full p-4"
        >
          {HEALTHCARE_IMAGES.map((imageUrl, index) => (
            <BentoCell
              key={index}
              className="overflow-hidden rounded-3xl shadow-2xl glass-morphism border-white/30 group hover-lift"
            >
              <motion.img
                className="size-full object-cover object-center"
                src={imageUrl}
                alt={`Healthcare technology ${index + 1}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent group-hover:from-purple-900/40 transition-all duration-500" />
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
                }}
              />
            </BentoCell>
          ))}
        </BentoGrid>
        
        <ContainerScale className="text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto px-6"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 gradient-text-premium"
            >
              AI for Healthcare.
              <br />
              <span className="text-slate-800">Smarter Starts Here.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Experience health like never before — powered by intelligent design and cutting-edge AI technology.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <GlowingGradientButton className="animate-pulse-glow">
                Try It Now <ArrowRight className="w-5 h-5" />
              </GlowingGradientButton>
              <MagneticButton className="px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-slate-800 hover:bg-white/30 transition-all duration-300 font-semibold">
                Watch Demo
              </MagneticButton>
            </motion.div>
          </motion.div>
        </ContainerScale>
      </ContainerScroll>

      {/* Enhanced Health Risk Scanner */}
      <div className="relative z-10">
        <HealthRiskScanner />
      </div>

      {/* Enhanced Diagnostic Chat */}
      <div className="relative z-10">
        <DiagnosticChat />
      </div>

      {/* Enhanced Medical Upload */}
      <div className="relative z-10">
        <MedicalUpload />
      </div>

      {/* Premium How It Works Section */}
      <section className="py-32 px-6 glass-morphism-strong relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20" direction="zoom">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-premium">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to transform your healthcare experience
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                direction="bottom"
                className="group"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -15,
                    rotateY: 10,
                    rotateX: 5
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-full perspective-1000"
                >
                  <Card className="p-10 h-full glass-morphism border-white/30 shadow-2xl hover:shadow-4xl transition-all duration-500 group-hover:border-white/50 animate-morphing-border">
                    <motion.div 
                      className="text-8xl font-bold text-transparent bg-gradient-to-br from-blue-400 to-purple-600 bg-clip-text mb-6 group-hover:from-purple-400 group-hover:to-cyan-600 transition-all duration-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {step.number}
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-4 text-slate-800">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20" direction="zoom">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
              Why It's Different
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced AI capabilities designed specifically for healthcare professionals and patients
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.15}
                direction={index % 2 === 0 ? 'left' : 'right'}
                className="group"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.08,
                    y: -10,
                    rotateZ: index % 2 === 0 ? 2 : -2
                  }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                  className="h-full"
                >
                  <Card className="p-8 h-full glass-morphism border-white/30 shadow-xl hover:shadow-3xl transition-all duration-500 group-hover:border-blue-300/50 hover-lift">
                    <motion.div 
                      className="text-blue-500 mb-6 group-hover:text-blue-600 transition-colors group-hover:scale-110"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Screenshot Section */}
      <section className="py-32 px-6 glass-morphism relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection className="mb-16" direction="zoom">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text-premium">
              See It In Action
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience the future of healthcare with our intuitive, AI-powered interface
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3} direction="bottom" className="relative max-w-5xl mx-auto">
            <motion.div 
              className="relative rounded-3xl overflow-hidden shadow-4xl glass-morphism-strong p-8 hover-lift group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-700" />
              <div className="relative z-10">
                <motion.img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2340&auto=format&fit=crop"
                  alt="Healthcare AI Dashboard"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 animate-shimmer rounded-2xl" />
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium Final CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="zoom">
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-8 gradient-text-premium"
              whileHover={{ scale: 1.05 }}
            >
              It's time your healthcare was intelligent.
            </motion.h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-16 max-w-2xl mx-auto leading-relaxed">
              Join thousands of healthcare professionals already using AI to improve patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <GlowingGradientButton className="text-xl px-16 py-6 animate-pulse-glow">
                Get Started <ArrowRight className="w-6 h-6" />
              </GlowingGradientButton>
              <MagneticButton className="px-8 py-4 rounded-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 font-semibold backdrop-blur-sm">
                Schedule Demo
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-16 px-6 bg-slate-900 text-slate-400 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection direction="up">
            <p className="text-sm">
              © 2024 HealthAI. Transforming healthcare through intelligent technology.
            </p>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
};

export default HealthcareAILandingPage;
