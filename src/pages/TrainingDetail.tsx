import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Monitor, Users, Target, BookOpen, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { getTrainingById } from "@/data/trainings";
import { Button } from "@/components/ui/button";

const TrainingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const training = getTrainingById(id || "");

  if (!training) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display font-bold text-2xl text-foreground mb-4">
              Formation non trouvée
            </h1>
            <Link to="/formations">
              <Button variant="outline">Retour aux formations</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "Online":
        return <Monitor size={20} />;
      case "Présentiel":
        return <Users size={20} />;
      default:
        return <Monitor size={20} />;
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je souhaite réserver une place pour la formation ${training.title}`
  );
  const whatsappLink = `https://wa.me/21612345678?text=${whatsappMessage}`;

  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={training.image}
          alt={training.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-24 left-4 md:left-8">
          <Link to="/formations">
            <Button variant="outline" size="sm" className="glass border-border/50">
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </Link>
        </div>
      </div>

      <section className="pb-20 -mt-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Title & Description */}
              <div className="bg-card rounded-xl border border-border p-8">
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full gradient-bg text-primary-foreground mb-4">
                  {training.category}
                </span>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                  {training.title}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {training.fullDescription}
                </p>
              </div>

              {/* Objectives */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Target size={20} className="text-primary-foreground" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Objectifs de la formation
                  </h2>
                </div>
                <ul className="space-y-3">
                  {training.objectives.map((objective, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{objective}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Program */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <BookOpen size={20} className="text-primary-foreground" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Programme détaillé
                  </h2>
                </div>
                <div className="space-y-4">
                  {training.program.map((module, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-secondary/50 rounded-lg p-4 border border-border/50"
                    >
                      <h3 className="font-semibold text-foreground mb-2">
                        {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {module.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6 glow-card">
                <h3 className="font-display font-bold text-lg text-foreground mb-6">
                  Détails de la formation
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Clock size={20} className="text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Durée</div>
                      <div className="font-medium text-foreground">{training.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    {getModeIcon(training.mode)}
                    <div>
                      <div className="text-sm text-muted-foreground">Mode</div>
                      <div className="font-medium text-foreground">{training.mode}</div>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 gradient-bg text-primary-foreground font-semibold rounded-lg glow-primary hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Réserver une place
                </a>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Réservation gratuite via WhatsApp
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TrainingDetail;
