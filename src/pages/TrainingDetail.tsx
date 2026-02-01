import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Monitor, Users, Target, BookOpen, CheckCircle, Loader } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { getTrainingById } from "@/data/trainings";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TrainingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const training = getTrainingById(id || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientPhone, setClientPhone] = useState("");
  const [clientName, setClientName] = useState("");
  const [countryCode, setCountryCode] = useState("216"); // Tunisie par défaut
  const [isLoading, setIsLoading] = useState(false);

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

  const handleWhatsAppReservation = () => {
    setIsDialogOpen(true);
  };

  const handleSendReservation = async () => {
    if (!clientPhone || !clientName) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    try {
      const fullPhone = countryCode + clientPhone;
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/api/send-to-client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientPhone: fullPhone,
          clientName: clientName,
          trainingTitle: training.title,
          trainingPrice: training.price,
          trainingDuration: training.duration,
          trainingMode: training.mode
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ Succès!\n\nUn message de confirmation a été envoyé à ${clientName} sur WhatsApp.\nNuméro: +${fullPhone}`);
        setIsDialogOpen(false);
        setClientPhone("");
        setClientName("");
        setCountryCode("216");
      } else {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(
        '❌ Erreur de connexion\n\n' +
        'Le serveur WhatsApp n\'est pas disponible.\n' +
        'Veuillez démarrer le backend: cd server && node server.js'
      );
    } finally {
      setIsLoading(false);
    }
  };

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
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-1">Prix</div>
                    <div className="font-display font-bold text-2xl text-primary">{training.price} DT</div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppReservation}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 gradient-bg text-primary-foreground font-semibold rounded-lg glow-primary hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Réserver une place
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Réservation gratuite via WhatsApp
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dialog pour les informations du client */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Réserver votre place</DialogTitle>
            <DialogDescription>
              Entrez vos coordonnées. Vous recevrez une confirmation automatique sur WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom et Prénom *</Label>
              <Input
                id="name"
                placeholder="Ex: Mohamed Ben Ali"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Pays *</Label>
              <Select value={countryCode} onValueChange={setCountryCode} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {/* Afrique du Nord & Moyen-Orient */}
                  <SelectItem value="216">🇹🇳 Tunisie (+216)</SelectItem>
                  <SelectItem value="213">🇩🇿 Algérie (+213)</SelectItem>
                  <SelectItem value="212">🇲🇦 Maroc (+212)</SelectItem>
                  <SelectItem value="20">🇪🇬 Égypte (+20)</SelectItem>
                  <SelectItem value="218">🇱🇾 Libye (+218)</SelectItem>
                  <SelectItem value="222">🇲🇷 Mauritanie (+222)</SelectItem>
                  <SelectItem value="249">🇸🇩 Soudan (+249)</SelectItem>
                  <SelectItem value="966">🇸🇦 Arabie Saoudite (+966)</SelectItem>
                  <SelectItem value="971">🇦🇪 Émirats Arabes Unis (+971)</SelectItem>
                  <SelectItem value="974">🇶🇦 Qatar (+974)</SelectItem>
                  <SelectItem value="973">🇧🇭 Bahreïn (+973)</SelectItem>
                  <SelectItem value="968">🇴🇲 Oman (+968)</SelectItem>
                  <SelectItem value="965">🇰🇼 Koweït (+965)</SelectItem>
                  <SelectItem value="962">🇯🇴 Jordanie (+962)</SelectItem>
                  <SelectItem value="961">🇱🇧 Liban (+961)</SelectItem>
                  <SelectItem value="963">🇸🇾 Syrie (+963)</SelectItem>
                  <SelectItem value="964">🇮🇶 Irak (+964)</SelectItem>
                  <SelectItem value="970">🇵🇸 Palestine (+970)</SelectItem>
                  <SelectItem value="972">🇮🇱 Israël (+972)</SelectItem>
                  <SelectItem value="98">🇮🇷 Iran (+98)</SelectItem>
                  <SelectItem value="90">🇹🇷 Turquie (+90)</SelectItem>
                  
                  {/* Europe */}
                  <SelectItem value="33">🇫🇷 France (+33)</SelectItem>
                  <SelectItem value="32">🇧🇪 Belgique (+32)</SelectItem>
                  <SelectItem value="41">🇨🇭 Suisse (+41)</SelectItem>
                  <SelectItem value="49">🇩🇪 Allemagne (+49)</SelectItem>
                  <SelectItem value="39">🇮🇹 Italie (+39)</SelectItem>
                  <SelectItem value="34">🇪🇸 Espagne (+34)</SelectItem>
                  <SelectItem value="44">🇬🇧 Royaume-Uni (+44)</SelectItem>
                  <SelectItem value="31">🇳🇱 Pays-Bas (+31)</SelectItem>
                  <SelectItem value="351">🇵🇹 Portugal (+351)</SelectItem>
                  <SelectItem value="30">🇬🇷 Grèce (+30)</SelectItem>
                  <SelectItem value="48">🇵🇱 Pologne (+48)</SelectItem>
                  <SelectItem value="46">🇸🇪 Suède (+46)</SelectItem>
                  <SelectItem value="47">🇳🇴 Norvège (+47)</SelectItem>
                  <SelectItem value="45">🇩🇰 Danemark (+45)</SelectItem>
                  <SelectItem value="358">🇫🇮 Finlande (+358)</SelectItem>
                  <SelectItem value="43">🇦🇹 Autriche (+43)</SelectItem>
                  <SelectItem value="420">🇨🇿 République Tchèque (+420)</SelectItem>
                  <SelectItem value="36">🇭🇺 Hongrie (+36)</SelectItem>
                  <SelectItem value="40">🇷🇴 Roumanie (+40)</SelectItem>
                  <SelectItem value="7">🇷🇺 Russie (+7)</SelectItem>
                  <SelectItem value="380">🇺🇦 Ukraine (+380)</SelectItem>
                  
                  {/* Amériques */}
                  <SelectItem value="1">🇺🇸 États-Unis (+1)</SelectItem>
                  <SelectItem value="1">🇨🇦 Canada (+1)</SelectItem>
                  <SelectItem value="52">🇲🇽 Mexique (+52)</SelectItem>
                  <SelectItem value="55">🇧🇷 Brésil (+55)</SelectItem>
                  <SelectItem value="54">🇦🇷 Argentine (+54)</SelectItem>
                  <SelectItem value="56">🇨🇱 Chili (+56)</SelectItem>
                  <SelectItem value="57">🇨🇴 Colombie (+57)</SelectItem>
                  <SelectItem value="51">🇵🇪 Pérou (+51)</SelectItem>
                  <SelectItem value="58">🇻🇪 Venezuela (+58)</SelectItem>
                  
                  {/* Asie */}
                  <SelectItem value="86">🇨🇳 Chine (+86)</SelectItem>
                  <SelectItem value="81">🇯🇵 Japon (+81)</SelectItem>
                  <SelectItem value="82">🇰🇷 Corée du Sud (+82)</SelectItem>
                  <SelectItem value="91">🇮🇳 Inde (+91)</SelectItem>
                  <SelectItem value="92">🇵🇰 Pakistan (+92)</SelectItem>
                  <SelectItem value="880">🇧🇩 Bangladesh (+880)</SelectItem>
                  <SelectItem value="84">🇻🇳 Vietnam (+84)</SelectItem>
                  <SelectItem value="66">🇹🇭 Thaïlande (+66)</SelectItem>
                  <SelectItem value="60">🇲🇾 Malaisie (+60)</SelectItem>
                  <SelectItem value="65">🇸🇬 Singapour (+65)</SelectItem>
                  <SelectItem value="63">🇵🇭 Philippines (+63)</SelectItem>
                  <SelectItem value="62">🇮🇩 Indonésie (+62)</SelectItem>
                  
                  {/* Afrique Subsaharienne */}
                  <SelectItem value="27">🇿🇦 Afrique du Sud (+27)</SelectItem>
                  <SelectItem value="234">🇳🇬 Nigeria (+234)</SelectItem>
                  <SelectItem value="254">🇰🇪 Kenya (+254)</SelectItem>
                  <SelectItem value="233">🇬🇭 Ghana (+233)</SelectItem>
                  <SelectItem value="225">🇨🇮 Côte d'Ivoire (+225)</SelectItem>
                  <SelectItem value="221">🇸🇳 Sénégal (+221)</SelectItem>
                  <SelectItem value="237">🇨🇲 Cameroun (+237)</SelectItem>
                  <SelectItem value="255">🇹🇿 Tanzanie (+255)</SelectItem>
                  <SelectItem value="256">🇺🇬 Ouganda (+256)</SelectItem>
                  <SelectItem value="251">🇪🇹 Éthiopie (+251)</SelectItem>
                  
                  {/* Océanie */}
                  <SelectItem value="61">🇦🇺 Australie (+61)</SelectItem>
                  <SelectItem value="64">🇳🇿 Nouvelle-Zélande (+64)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Numéro WhatsApp *</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-muted rounded-md border">
                  <span className="text-sm text-muted-foreground">+{countryCode}</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ex: 50985534"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  disabled={isLoading}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Entrez uniquement votre numéro sans le code pays
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSendReservation}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                "Confirmer"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TrainingDetail;
