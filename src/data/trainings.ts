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
  price: number;
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
    duration: "5h",
    mode: "Online",
    image: trainingReact,
    category: "Soft Skills",
    price: 70
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
    duration: "48h",
    mode: "Présentiel",
    image: trainingDevops,
    category: "Développement",
    price: 250
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
    duration: "15h",
    mode: "Hybride",
    image: trainingDevops,
    category: "Automatisation",
    price: 150
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
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
    duration: "20h",
    mode: "Présentiel",
    image: trainingSecurity,
    category: "Sécurité",
    price: 180
  },
  {
    id: "power-bi",
    title: "Power BI",
    shortDescription: "Créez des tableaux de bord et rapports interactifs.",
    fullDescription: "Maîtrisez Power BI pour transformer vos données en insights visuels et actionnables. Créez des rapports professionnels et des tableaux de bord performants.",
    objectives: [
      "Importer et nettoyer les données",
      "Créer des modèles de données",
      "Concevoir des visualisations percutantes",
      "Créer des tableaux de bord interactifs",
      "Publier et partager les rapports"
    ],
    program: [
      { title: "Module 1 - Fondamentaux", content: "Interface, concepts, types de données" },
      { title: "Module 2 - Données", content: "Import, transformation, nettoyage" },
      { title: "Module 3 - Modèles", content: "Relations, mesures, DAX de base" },
      { title: "Module 4 - Visualisations", content: "Graphiques, KPI, rapports interactifs" },
      { title: "Module 5 - Partage", content: "Publication, dashboards, permissions" }
    ],
    duration: "30h",
    mode: "Hybride",
    image: trainingUxui,
    category: "Data & Analytics",
    price: 200
  },
  {
    id: "linux",
    title: "Linux",
    shortDescription: "Maîtrisez le système d'exploitation Linux.",
    fullDescription: "Apprenez les fondamentaux de Linux, la ligne de commande, la gestion des fichiers et les concepts essentiels pour administrer et utiliser Linux efficacement.",
    objectives: [
      "Comprendre les concepts de Linux",
      "Maîtriser la ligne de commande",
      "Gérer les fichiers et permissions",
      "Gérer les utilisateurs et les services",
      "Sécuriser un système Linux"
    ],
    program: [
      { title: "Module 1 - Fondamentaux", content: "Distribution, noyau, architecture" },
      { title: "Module 2 - Ligne de commande", content: "Commandes essentielles, shell, scripts" },
      { title: "Module 3 - Système de fichiers", content: "Répertoires, permissions, propriétaires" },
      { title: "Module 4 - Administration", content: "Utilisateurs, groupes, paquets" },
      { title: "Module 5 - Services", content: "Daemons, logs, sécurité de base" }
    ],
    duration: "20h",
    mode: "Présentiel",
    image: trainingDevops,
    category: "Infrastructure",
    price: 180
  },
  {
    id: "test-logiciel",
    title: "Test Logiciel",
    shortDescription: "Maîtrisez les techniques et outils de test logiciel.",
    fullDescription: "Apprenez à tester efficacement les applications logicielles, identifier les bugs et garantir la qualité avec des méthodes éprouvées.",
    objectives: [
      "Comprendre les types et niveaux de test",
      "Écrire des cas de test efficaces",
      "Utiliser les outils de test automation",
      "Gérer les défauts et traçabilité",
      "Appliquer les bonnes pratiques de QA"
    ],
    program: [
      { title: "Module 1 - Fondamentaux", content: "Types de test, niveaux, stratégies" },
      { title: "Module 2 - Test manuel", content: "Cas de test, exécution, documentation" },
      { title: "Module 3 - Test automation", content: "Selenium, Cypress, frameworks" },
      { title: "Module 4 - Performance", content: "Outils, métriques, optimisation" },
      { title: "Module 5 - Gestion de défauts", content: "Bug tracking, cycles de test" }
    ],
    duration: "20h",
    mode: "Hybride",
    image: trainingUxui,
    category: "QA & Testing",
    price: 180
  }
];

export const getTrainingById = (id: string): Training | undefined => {
  return trainings.find(training => training.id === id);
};
