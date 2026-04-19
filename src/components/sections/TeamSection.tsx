import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Member {
  name: string;
  role: string;
  skills: string[];
  stack: string;
  photo: string;
}

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

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-smooth hover:-translate-y-1 text-center"
            >
              <div className="relative w-28 h-28 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full gradient-teal opacity-20 blur-xl scale-110" />
                <img
                  src={m.photo}
                  alt={m.name}
                  className="relative w-28 h-28 rounded-full object-cover border-3 border-primary/20 shadow-glow"
                />
              </div>
              <h3 className="font-display font-bold text-xl">{m.name}</h3>
              <p className="text-sm text-primary font-semibold mt-1 mb-4">{m.role}</p>
              <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                {m.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted-foreground border-t border-border pt-3">
                <span className="font-semibold text-foreground/70">Stack:</span> {m.stack}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
