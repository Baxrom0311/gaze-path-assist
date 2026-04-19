import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AlertTriangle, Sparkles, Check } from "lucide-react";

interface Stat { value: string; label: string }

export const ProblemSolutionSection = () => {
  const { t } = useTranslation();
  const stats = t("problemSolution.problemStats", { returnObjects: true }) as Stat[];
  const points = t("problemSolution.solutionPoints", { returnObjects: true }) as string[];

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {t("problemSolution.sectionLabel")}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl gradient-problem p-8 md:p-10 text-white shadow-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-warning/20 blur-3xl -mr-20 -mt-20" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-xl bg-warning/20 backdrop-blur flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">{t("problemSolution.problemTitle")}</h2>
              </div>
              <p className="text-white/85 text-lg leading-relaxed mb-8">
                {t("problemSolution.problemBody")}
              </p>
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="font-display text-2xl md:text-3xl font-bold text-warning">{s.value}</div>
                    <div className="text-xs text-white/70 mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl gradient-solution p-8 md:p-10 shadow-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl -mr-20 -mt-20" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-xl gradient-teal flex items-center justify-center shadow-glow">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">{t("problemSolution.solutionTitle")}</h2>
              </div>
              <p className="text-foreground/80 text-lg leading-relaxed mb-8">
                {t("problemSolution.solutionBody")}
              </p>
              <ul className="space-y-3">
                {points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full gradient-teal flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/85">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
