import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Github, Linkedin } from "lucide-react";

interface Member { name: string; role: string; skills: string[]; stack: string }

const COLORS = ["gradient-teal", "gradient-warm", "gradient-teal", "gradient-warm"];

export const TeamSection = () => {
  const { t } = useTranslation();
  const members = t("team.members", { returnObjects: true }) as Member[];

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
            {t("team.sectionLabel")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            {t("team.title")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("team.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-smooth hover:-translate-y-1"
            >
              <div className={`h-16 w-16 rounded-2xl ${COLORS[i]} flex items-center justify-center text-2xl font-display font-bold text-primary-foreground shadow-glow mb-4`}>
                {m.name.charAt(0)}
              </div>
              <h3 className="font-display font-bold text-xl">{m.name}</h3>
              <p className="text-sm text-primary font-semibold mt-1 mb-3">{m.role}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {m.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted-foreground border-t border-border pt-3 mb-3">
                <span className="font-semibold text-foreground/70">Stack:</span> {m.stack}
              </div>
              <div className="flex gap-2">
                <a href="#" aria-label="GitHub" className="h-8 w-8 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="h-8 w-8 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
