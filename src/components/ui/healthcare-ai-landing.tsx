
"use client"

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, Heart, Shield, Zap, Users, ArrowRight, CheckCircle, Brain, Activity, Stethoscope } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 text-slate-900">
      {/* Hero Section with Scroll Animation */}
      <ContainerScroll className="h-[400vh]">
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
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              AI for Healthcare.
              <br />
              <span className="text-slate-800">Smarter Starts Here.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience health like never before — powered by intelligent design and cutting-edge AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GlowingGradientButton>
                Try It Now <ArrowRight className="w-5 h-5" />
              </GlowingGradientButton>
              <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm border-white/30">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </ContainerScale>
      </ContainerScroll>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to transform your healthcare experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Card className="p-8 h-full bg-white/80 backdrop-blur-sm border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-cyan-50">
                  <div className="text-6xl font-bold text-blue-200 mb-4 group-hover:text-blue-300 transition-colors">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-800">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
              Why It's Different
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced AI capabilities designed specifically for healthcare professionals and patients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white">
                  <div className="text-blue-500 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot/Visual Section */}
      <section className="py-24 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              See It In Action
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience the future of healthcare with our intuitive, AI-powered interface
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm" />
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2340&auto=format&fit=crop"
                  alt="Healthcare AI Dashboard"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Take the intelligent path to health.
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join thousands of healthcare professionals already using AI to improve patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <GlowingGradientButton className="text-xl px-12 py-5">
                Get Started Today <ArrowRight className="w-6 h-6" />
              </GlowingGradientButton>
              <Button variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            © 2024 HealthAI. Transforming healthcare through intelligent technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HealthcareAILandingPage;
