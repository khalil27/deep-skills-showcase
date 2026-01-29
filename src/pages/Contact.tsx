import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import Layout from "@/components/Layout";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@deepskills.tn",
      href: "mailto:contact@deepskills.tn",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+216 12 345 678",
      href: "https://wa.me/21612345678",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Tunis, Tunisie",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/deepskills", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Linkedin, href: "https://linkedin.com/company/deepskills", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: Instagram, href: "https://instagram.com/deepskills", label: "Instagram", color: "hover:bg-pink-600" },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Contactez-<span className="gradient-text">nous</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Une question sur nos formations ? N'hésitez pas à nous contacter. 
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl border border-border p-6 card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                        <info.icon size={24} className="text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {info.label}
                        </div>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith("http") ? "_blank" : undefined}
                            rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="font-semibold text-foreground">{info.value}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social & CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Social Links */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display font-bold text-lg text-foreground mb-6">
                    Suivez-nous
                  </h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all ${social.color}`}
                        aria-label={social.label}
                      >
                        <social.icon size={24} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-card rounded-xl border border-border p-6 glow-card">
                  <h3 className="font-display font-bold text-lg text-foreground mb-3">
                    Réponse rapide garantie
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Contactez-nous directement sur WhatsApp pour une réponse instantanée à vos questions.
                  </p>
                  <a
                    href="https://wa.me/21612345678?text=Bonjour%20je%20souhaite%20avoir%20plus%20d%27informations%20sur%20vos%20formations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 gradient-bg text-primary-foreground font-semibold rounded-lg glow-primary hover:opacity-90 transition-opacity"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Démarrer une conversation
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
