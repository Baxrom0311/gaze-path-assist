import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EyeLogo } from "./EyeLogo";
import { Github, ExternalLink } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/30 mt-20">
      <div className="container py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-teal text-primary-foreground">
              <EyeLogo className="h-5 w-5" />
            </span>
            <span className="font-display font-bold text-lg">{t("brand.name")}</span>
          </div>
          <p className="text-sm text-muted-foreground italic">"{t("footer.tagline")}"</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
            {t("footer.links")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/demo" className="hover:text-primary transition-smooth">{t("footer.demo")}</Link>
            </li>
            <li>
              <a href="https://eyetracking.boos.uz" target="_blank" rel="noreferrer" className="hover:text-primary transition-smooth inline-flex items-center gap-1">
                {t("footer.prototype")} <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-smooth inline-flex items-center gap-1">
                <Github className="h-3.5 w-3.5" /> {t("footer.github")}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:text-right">
          <p className="text-xs text-muted-foreground">
            © {year} {t("brand.name")}. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Made with care in Uzbekistan 🇺🇿</p>
        </div>
      </div>
    </footer>
  );
};
