import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Camera, Grid3x3, Crosshair, Settings, Cloud } from "lucide-react";

const ICONS = [Camera, Grid3x3, Crosshair, Settings, Cloud];

interface Step { title: string; items: string[] }

export const ImplementationSection = () => {
  const { t } = useTranslation();
  const steps = t("implementation.steps", { returnObjects: true }) as Step[];

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {t("implementation.sectionLabel")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            {t("implementation.title")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("implementation.subtitle")}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-accent/40" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative flex gap-5 md:gap-6"
                >
                  <div className="flex-shrink-0 relative z-10">
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl gradient-teal text-primary-foreground flex items-center justify-center shadow-glow">
                      <Icon className="h-5 w-5 md:h-7 md:w-7" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-soft">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 bg-card border border-border rounded-2xl p-5 md:p-6 shadow-soft hover:shadow-card transition-smooth">
                    <h3 className="font-display font-bold text-xl mb-3">{step.title}</h3>
                    <ul className="space-y-1.5">
                      {step.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
