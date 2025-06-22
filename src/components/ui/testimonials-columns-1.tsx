
"use client";
import React from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "This AI healthcare platform transformed our diagnostic accuracy by 40%. The real-time patient monitoring has saved countless lives in our ICU.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Dr. Priya Sharma",
    role: "Chief Medical Officer",
  },
  {
    text: "Implementation was seamless and our medical staff adapted quickly. The AI-powered insights have revolutionized our treatment protocols.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Dr. Rajesh Kumar",
    role: "Head of Cardiology",
  },
  {
    text: "The AI diagnostic support has been exceptional, providing 24/7 assistance and reducing our diagnostic time by 60%. Patient outcomes have improved significantly.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Dr. Anjali Patel",
    role: "Emergency Medicine Director",
  },
  {
    text: "This healthcare AI platform's predictive analytics helped us prevent multiple cardiac events. The integration with our existing systems was flawless.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Dr. Arjun Mehta",
    role: "Hospital CEO",
  },
  {
    text: "The AI-powered patient monitoring system has transformed our workflow efficiency. Early warning alerts have become a game-changer for critical care.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Dr. Kavita Singh",
    role: "ICU Specialist",
  },
  {
    text: "Implementation exceeded our expectations. The AI diagnostic accuracy and seamless EMR integration improved our overall patient care quality.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Dr. Neha Gupta",
    role: "Clinical Research Lead",
  },
  {
    text: "Our radiology department efficiency improved dramatically with AI-assisted imaging analysis. Diagnostic precision has reached new heights.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Dr. Vikram Joshi",
    role: "Chief Radiologist",
  },
  {
    text: "The AI platform delivered beyond expectations, understanding our clinical needs and enhancing patient safety protocols throughout our facility.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Dr. Ritu Agarwal",
    role: "Quality Assurance Director",
  },
  {
    text: "Using this AI healthcare system, our patient satisfaction scores and treatment outcomes improved significantly, transforming our medical practice.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Dr. Suresh Reddy",
    role: "Chief of Surgery",
  },
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const HealthcareTestimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what healthcare professionals have to say about our AI platform.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};
