import trainingReact from "@/assets/training-react.jpg";
import trainingDevops from "@/assets/training-devops.jpg";
import trainingUxui from "@/assets/training-uxui.jpg";
import trainingSecurity from "@/assets/training-security.jpg";

export interface Training {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  program: { title: string; content: string }[];
  duration: string;
  mode: "Présentiel" | "Online" | "Hybride";
  image: string;
  category: string;
}

export const trainings: Training[] = [
  {
    id: "personal-branding",
    title: "Personal Branding",
    shortDescription: "Construisez une marque personnelle crédible et différenciante.",
    fullDescription: "Cette formation vous aide à clarifier votre positionnement, raconter votre histoire et développer une présence professionnelle cohérente en ligne comme hors ligne.",
    objectives: [
      "Définir votre positionnement et votre proposition de valeur",
      "Créer un storytelling authentique",
      "Optimiser vos profils professionnels (LinkedIn, CV)",
      "Développer une stratégie de contenu simple",
      "Mettre en place un plan d'action mesurable"
    ],
    program: [
      { title: "Module 1 - Positionnement", content: "Audit personnel, valeurs, forces, cible et promesse" },
      { title: "Module 2 - Storytelling", content: "Parcours, différenciation, pitch et narratif" },
      { title: "Module 3 - Visibilité", content: "LinkedIn, portfolio, preuves sociales" },
      { title: "Module 4 - Contenu", content: "Plan éditorial, formats simples, constance" },
      { title: "Module 5 - Plan d'action", content: "Objectifs, indicateurs, routine hebdomadaire" }
    ],
    duration: "12h",
    mode: "Online",
    image: trainingReact,
    category: "Soft Skills"
  },
  {
    id: "dev",
    title: "Développement Web",
    shortDescription: "Bases solides pour créer des applications web modernes.",
    fullDescription: "Apprenez à construire des interfaces web claires et fonctionnelles, avec les bases du front-end et les bonnes pratiques de développement.",
    objectives: [
      "Comprendre HTML, CSS et JavaScript",
      "Créer des pages responsives",
      "Structurer un projet front-end",
      "Manipuler le DOM et les événements",
      "Appliquer les bonnes pratiques de code"
    ],
    program: [
      { title: "Module 1 - HTML/CSS", content: "Structure, styles, responsive et bonnes pratiques" },
      { title: "Module 2 - JavaScript", content: "Syntaxe, fonctions, tableaux, objets" },
      { title: "Module 3 - DOM", content: "Sélection, événements, manipulation" },
      { title: "Module 4 - Outils", content: "Git, organisation du code, conventions" },
      { title: "Module 5 - Projet", content: "Mini-projet guidé" }
    ],
    duration: "20h",
    mode: "Présentiel",
    image: trainingDevops,
    category: "Développement"
  },
  {
    id: "n8n-automation",
    title: "Automatisation avec n8n",
    shortDescription: "Créez des workflows d'automatisation sans code.",
    fullDescription: "Apprenez à automatiser vos processus avec n8n : intégrations, webhooks et scénarios concrets pour gagner du temps.",
    objectives: [
      "Comprendre les bases de l'automatisation",
      "Créer des workflows avec n8n",
      "Connecter des applications via API",
      "Utiliser des webhooks",
      "Sécuriser et documenter les scénarios"
    ],
    program: [
      { title: "Module 1 - Concepts", content: "Automatisation, triggers, actions" },
      { title: "Module 2 - n8n Basics", content: "Nodes, credentials, exécutions" },
      { title: "Module 3 - Intégrations", content: "Google, Slack, Airtable, CRM" },
      { title: "Module 4 - Webhooks", content: "Entrants/sortants, filtres, conditions" },
      { title: "Module 5 - Cas pratiques", content: "Workflows métiers prêts à l'emploi" }
    ],
    duration: "16h",
    mode: "Hybride",
    image: trainingDevops,
    category: "Automatisation"
  },
  {
    id: "securite",
    title: "Sécurité",
    shortDescription: "Protégez vos systèmes et bonnes pratiques essentielles.",
    fullDescription: "Cette formation vous donne les bases pour sécuriser les environnements, comprendre les menaces et appliquer les bonnes pratiques de cybersécurité.",
    objectives: [
      "Identifier les menaces courantes",
      "Sécuriser les comptes et accès",
      "Comprendre les vulnérabilités web",
      "Mettre en place des bonnes pratiques",
      "Réagir aux incidents de base"
    ],
    program: [
      { title: "Module 1 - Fondamentaux", content: "Menaces, surfaces d'attaque, vocabulaire" },
      { title: "Module 2 - Sécurité web", content: "OWASP Top 10, XSS, CSRF" },
      { title: "Module 3 - Bonnes pratiques", content: "Mots de passe, MFA, sauvegardes" },
      { title: "Module 4 - Réseau", content: "Bases de segmentation, firewall" },
      { title: "Module 5 - Gestion d'incident", content: "Détection, réponse, documentation" }
    ],
    duration: "18h",
    mode: "Présentiel",
    image: trainingSecurity,
    category: "Sécurité"
  }
];

export const getTrainingById = (id: string): Training | undefined => {
  return trainings.find(training => training.id === id);
};
