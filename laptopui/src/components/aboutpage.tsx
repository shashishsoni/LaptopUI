import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "./navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Stat {
  number: string;
  label: string;
}

interface TimelineItem {
  title: string;
  description: string;
  image: string;
  align: "left" | "right";
  steps: string[];
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

const FeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      key={index}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={feature.icon}
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </motion.div>
  );
};
FeatureCard.displayName = "FeatureCard";

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
      <div className="text-gray-400">{stat.label}</div>
    </motion.div>
  );
};
StatCard.displayName = "StatCard";

const TimelineItem = ({
  title,
  description,
  image,
  align,
  steps,
}: TimelineItem) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
      animate={
        inView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: align === "left" ? -50 : 50 }
      }
      transition={{ duration: 0.5 }}
      className={`flex items-center ${
        align === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <div className="w-1/2 p-6">
        <div className="relative rounded-xl overflow-hidden group">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      </div>
      <div className="w-1/2 p-6">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        {steps && (
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10"
              >
                <h4 className="text-blue-400 font-medium mb-1">{step}</h4>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
TimelineItem.displayName = "TimelineItem";

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={12}
          height={12}
          className="rounded-full w-2 h-2 object-cover"
          style={{ width: "50px", height: "50px" }}
        />
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
    </motion.div>
  );
};

const PartnerLogo = ({ src, alt }: { src: string; alt: string }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group flex items-center justify-center"
    >
      <Image
        src={src}
        alt={alt}
        width={120}
        height={60}
        className="opacity-75 hover:opacity-100 transition-opacity duration-300 object-contain"
      />
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling from other pages
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: "Expert Curation",
      description:
        "We carefully select and test every gaming laptop to ensure premium quality and performance.",
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    },
    {
      title: "Custom Configuration",
      description:
        "Personalize your gaming laptop with our advanced configuration options.",
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    },
    {
      title: "Premium Support",
      description:
        "24/7 dedicated support team to assist you with any queries or concerns.",
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "3-Year", label: "Warranty" },
    { number: "150+", label: "Expert Staff" },
    { number: "5000+", label: "Configurations" },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Pro Gamer",
      image: "/image/testimonial1.avif",
      quote:
        "The configuration options and build quality are unmatched. Best gaming laptop I've ever owned.",
    },
    {
      name: "Sarah Miller",
      role: "Content Creator",
      image: "/image/testimonial2.avif",
      quote:
        "Perfect balance of performance and portability. Customer support is exceptional!",
    },
    {
      name: "James Wilson",
      role: "Esports Coach",
      image: "/image/testimonail3.avif",
      quote:
        "These machines deliver consistent performance under pressure. Highly recommended!",
    },
  ];

  const processItems = [
    {
      title: "Expert Selection",
      description:
        "Our rigorous selection process ensures only the best gaming laptops make it to our collection.",
      image: "/image/selection.webp",
      align: "left" as const,
      steps: ["Market Research", "Performance Analysis", "Build Quality Check"],
    },
    {
      title: "Quality Testing",
      description:
        "Every laptop undergoes extensive testing to ensure peak performance and reliability.",
      image: "/image/test.webp",
      align: "right" as const,
      steps: ["Stress Testing", "Thermal Analysis", "Display Calibration"],
    },
    {
      title: "Custom Configuration",
      description:
        "Personalize your gaming laptop with our expert-recommended configurations.",
      image: "/image/configuration.avif",
      align: "left" as const,
      steps: [
        "Component Selection",
        "Performance Optimization",
        "Quality Assurance",
      ],
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
      >
        <Head>
          <title>About Us | Premium Gaming Laptops</title>
          <meta
            name="description"
            content="Learn about our passion for gaming and commitment to quality"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        {/* Background */}
        <div className="fixed inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900 to-purple-900/50" />
          <div className="absolute inset-0 bg-[url('/image/grid.svg')] opacity-20 bg-repeat bg-[length:32px_32px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        <div className="absolute inset-0 overflow-y-auto">
          <Navbar />

          {/* Hero Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="pt-32 pb-16 px-4"
          >
            <div className="max-w-7xl mx-auto text-center">
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Elevate Your Gaming Experience
              </motion.h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                We&apos;re passionate about delivering the best gaming laptops with
                cutting-edge technology and exceptional performance.
              </p>
            </div>
          </motion.section>

          {/* Features Grid */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4 bg-white/5">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Why Choose Us
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Unmatched Expertise
                  </h3>
                  <p className="text-gray-400">
                    Our team of gaming enthusiasts and tech experts ensures you
                    get the best gaming laptop that matches your needs and
                    preferences.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-400">
                    Every laptop undergoes rigorous testing and quality checks
                    before reaching you, ensuring optimal performance and
                    reliability.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Our Process Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Our Process
              </motion.h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500 to-purple-500" />

                {/* Timeline Items */}
                <div className="space-y-24">
                  {processItems.map((item, index) => (
                    <TimelineItem
                      key={index}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      align={item.align}
                      steps={item.steps}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 px-4 bg-white/5">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                What Our Customers Say
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-16 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Our Partners
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto">
                <PartnerLogo src="/image/nividia.jpg" alt="NVIDIA" />
                <PartnerLogo src="/image/intel.avif" alt="Intel" />
                <PartnerLogo src="/image/amd.avif" alt="AMD" />
                <PartnerLogo src="/image/m.jpg" alt="Microsoft" />
              </div>
            </div>
          </section>

          {/* Contact CTA Section */}
          <section className="py-24 px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-white/10"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Built for gamers, by gamers &ldquo;Experience matters&rdquo;
              </h2>
              <p className="text-gray-300 mb-8">
                Contact our team of experts for personalized recommendations.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
                Get in Touch
              </button>
            </motion.div>
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AboutPage;
