import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";

const DemoPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {t("demoPage.eyebrow")}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mt-3 mb-4 leading-tight">
              {t("demoPage.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("demoPage.subtitle")}
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl overflow-hidden shadow-card border border-border mb-12"
          >
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto"
              poster="/baxrom.jpg"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-soft mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl gradient-teal flex items-center justify-center shadow-glow">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                {t("demoPage.descriptionTitle")}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {t("demoPage.description")}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl gradient-teal p-8 md:p-12 text-primary-foreground text-center shadow-glow relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-3">
                {t("demoPage.prototypeTitle")}
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-6 max-w-xl mx-auto">
                {t("demoPage.prototypeBody")}
              </p>
              <Button asChild size="lg" variant="secondary" className="text-base font-bold hover:scale-105 transition-bounce">
                <a href="https://eyetracking.boos.uz" target="_blank" rel="noreferrer">
                  {t("demoPage.prototypeCta")} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default DemoPage;
