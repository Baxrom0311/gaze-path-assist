import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const AnimatedEye = () => (
  <div className="relative w-full aspect-square max-w-md mx-auto">
    {/* Glow rings */}
    <div className="absolute inset-0 rounded-full gradient-teal opacity-20 blur-3xl animate-gaze-pulse" />
    <div className="absolute inset-8 rounded-full gradient-warm opacity-30 blur-2xl animate-gaze-pulse" style={{ animationDelay: "0.7s" }} />

    {/* Eye SVG */}
    <svg viewBox="0 0 200 200" className="relative w-full h-full">
      <defs>
        <radialGradient id="iris" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary-glow))" />
          <stop offset="60%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
        </radialGradient>
        <radialGradient id="sclera" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--background))" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" />
        </radialGradient>
      </defs>
      {/* Eye shape */}
      <path
        d="M20 100 Q100 30 180 100 Q100 170 20 100 Z"
        fill="url(#sclera)"
        stroke="hsl(var(--foreground) / 0.15)"
        strokeWidth="2"
      />
      {/* Iris with motion */}
      <g className="animate-iris-move" style={{ transformOrigin: "100px 100px" }}>
        <circle cx="100" cy="100" r="32" fill="url(#iris)" />
        <circle cx="100" cy="100" r="14" fill="hsl(var(--foreground))" />
        <circle cx="92" cy="92" r="5" fill="hsl(var(--background))" opacity="0.9" />
      </g>
      {/* Gaze tracking dots */}
      {[
        [40, 60], [160, 60], [40, 140], [160, 140], [100, 40],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill="hsl(var(--accent))"
          opacity="0.7"
          className="animate-gaze-pulse"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {/* Tracking lines */}
      <g stroke="hsl(var(--accent) / 0.4)" strokeWidth="1" strokeDasharray="3 4" fill="none">
        <line x1="100" y1="100" x2="40" y2="60" />
        <line x1="100" y1="100" x2="160" y2="60" />
        <line x1="100" y1="100" x2="100" y2="40" />
      </g>
    </svg>
  </div>
);

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full gradient-teal opacity-10 blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full gradient-warm opacity-10 blur-3xl" />
      </div>

      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-semibold uppercase tracking-wider text-primary mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {t("hero.eyebrow")}
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
            {t("hero.title")}
            <br />
            <span className="text-gradient">{t("hero.titleAccent")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="gradient-teal text-primary-foreground shadow-glow hover:opacity-90 hover:scale-[1.02] transition-bounce">
              <a href="https://eyetracking.boos.uz" target="_blank" rel="noreferrer">
                {t("hero.ctaPrimary")} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="hover:scale-[1.02] transition-bounce">
              <Link to="/demo">
                <Play className="mr-2 h-4 w-4" /> {t("hero.ctaSecondary")}
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <AnimatedEye />
        </motion.div>
      </div>
    </section>
  );
};
