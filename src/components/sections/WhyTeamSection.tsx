import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Heart, Layers, Rocket, MapPin } from "lucide-react";

const ICONS = [Heart, Layers, Rocket, MapPin];

interface Point { title: string; body: string }

export const WhyTeamSection = () => {
  const { t } = useTranslation();
  const points = t("whyTeam.points", { returnObjects: true }) as Point[];

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
            {t("whyTeam.sectionLabel")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3">
            {t("whyTeam.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {points.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-7 shadow-soft hover:shadow-card transition-smooth flex gap-5"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-xl gradient-teal flex items-center justify-center shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
