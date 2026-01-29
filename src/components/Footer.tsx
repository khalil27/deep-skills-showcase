import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/deepskills", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/company/deepskills", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/deepskills", label: "Instagram" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">D</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Deep<span className="gradient-text">Skills</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Développez vos compétences techniques avec nos formations de qualité. 
              Rejoignez une communauté de professionnels passionnés par la tech.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/formations" className="text-muted-foreground hover:text-primary transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@deepskills.tn"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={18} />
                  contact@deepskills.tn
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/21612345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone size={18} />
                  +216 12 345 678
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Deep Skills. Tous droits réservés.
            </p>
            <p className="text-muted-foreground text-sm">
              Développez vos compétences, transformez votre carrière.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
