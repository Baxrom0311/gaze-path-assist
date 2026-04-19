import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Loader2, Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage { icon: string; name: string; status: string; description: string }

const STATUS_META = {
  0: { Icon: CheckCircle2, color: "text-success", bg: "bg-success/15", border: "border-success/40", line: "bg-success" },
  1: { Icon: Loader2, color: "text-primary", bg: "bg-primary/15", border: "border-primary", line: "bg-gradient-to-b from-primary to-border", spin: true, current: true },
  2: { Icon: Clock, color: "text-accent", bg: "bg-accent/15", border: "border-accent/30", line: "bg-border" },
  3: { Icon: Lock, color: "text-muted-foreground", bg: "bg-muted", border: "border-border", line: "bg-border" },
} as const;

export const RoadmapSection = () => {
  const { t } = useTranslation();
  const stages = t("roadmap.stages", { returnObjects: true }) as Stage[];

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {t("roadmap.sectionLabel")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3">
            {t("roadmap.title")}
          </h2>
        </motion.div>

        {/* Desktop horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stages.map((stage, i) => {
            const meta = STATUS_META[i as 0 | 1 | 2 | 3];
            const { Icon } = meta;
            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {i < stages.length - 1 && (
                  <div className={cn("absolute top-8 left-1/2 w-full h-0.5", meta.line)} />
                )}
                <div className={cn(
                  "relative bg-card border-2 rounded-2xl p-5 shadow-soft transition-smooth",
                  meta.border,
                  "current" in meta && meta.current && "shadow-glow"
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{stage.icon}</span>
                    <div className={cn("h-9 w-9 rounded-full flex items-center justify-center", meta.bg)}>
                      <Icon className={cn("h-4 w-4", meta.color, "spin" in meta && meta.spin && "animate-spin")} />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">{stage.name}</h3>
                  <span className={cn("text-xs font-bold uppercase tracking-wider", meta.color)}>{stage.status}</span>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{stage.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-4 max-w-md mx-auto">
          {stages.map((stage, i) => {
            const meta = STATUS_META[i as 0 | 1 | 2 | 3];
            const { Icon } = meta;
            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "bg-card border-2 rounded-2xl p-5 shadow-soft",
                  meta.border,
                  "current" in meta && meta.current && "shadow-glow"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{stage.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg">{stage.name}</h3>
                    <span className={cn("text-xs font-bold uppercase tracking-wider", meta.color)}>{stage.status}</span>
                  </div>
                  <div className={cn("h-9 w-9 rounded-full flex items-center justify-center", meta.bg)}>
                    <Icon className={cn("h-4 w-4", meta.color, "spin" in meta && meta.spin && "animate-spin")} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
