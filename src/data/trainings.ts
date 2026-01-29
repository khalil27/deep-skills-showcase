import trainingReact from "@/assets/training-react.jpg";
import trainingPython from "@/assets/training-python.jpg";
import trainingDevops from "@/assets/training-devops.jpg";
import trainingUxui from "@/assets/training-uxui.jpg";
import trainingSecurity from "@/assets/training-security.jpg";
import trainingAi from "@/assets/training-ai.jpg";

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
    id: "react-masterclass",
    title: "React.js Masterclass",
    shortDescription: "Maîtrisez React de A à Z : hooks, state management, et patterns avancés.",
    fullDescription: "Plongez dans l'univers de React.js avec cette formation complète. Vous apprendrez à construire des applications modernes et performantes en utilisant les dernières fonctionnalités de React, incluant les hooks, Context API, et les patterns de design les plus efficaces.",
    objectives: [
      "Comprendre les fondamentaux de React et JSX",
      "Maîtriser les hooks (useState, useEffect, useContext, useReducer)",
      "Implémenter le state management avec Redux ou Zustand",
      "Créer des composants réutilisables et performants",
      "Optimiser les performances de vos applications"
    ],
    program: [
      { title: "Module 1 - Fondamentaux", content: "Introduction à React, JSX, composants fonctionnels, props et state de base" },
      { title: "Module 2 - Hooks avancés", content: "useEffect, useCallback, useMemo, useRef, hooks personnalisés" },
      { title: "Module 3 - State Management", content: "Context API, Redux Toolkit, Zustand, bonnes pratiques" },
      { title: "Module 4 - Patterns & Performance", content: "Compound components, render props, HOC, lazy loading, memoization" },
      { title: "Module 5 - Projet Final", content: "Construction d'une application complète avec toutes les notions apprises" }
    ],
    duration: "20h",
    mode: "Hybride",
    image: trainingReact,
    category: "Frontend"
  },
  {
    id: "python-data-science",
    title: "Python pour Data Science",
    shortDescription: "Analysez et visualisez vos données avec Python, Pandas et NumPy.",
    fullDescription: "Cette formation vous donnera toutes les clés pour devenir un expert en analyse de données avec Python. De la manipulation de données avec Pandas à la visualisation avec Matplotlib et Seaborn, vous maîtriserez l'écosystème Data Science de Python.",
    objectives: [
      "Maîtriser les bases de Python pour la Data Science",
      "Manipuler des datasets complexes avec Pandas",
      "Effectuer des calculs numériques avec NumPy",
      "Créer des visualisations percutantes",
      "Appliquer des techniques de machine learning de base"
    ],
    program: [
      { title: "Module 1 - Python Essentials", content: "Variables, structures de données, fonctions, classes" },
      { title: "Module 2 - NumPy", content: "Arrays, opérations vectorisées, algèbre linéaire" },
      { title: "Module 3 - Pandas", content: "DataFrames, manipulation, nettoyage, agrégations" },
      { title: "Module 4 - Visualisation", content: "Matplotlib, Seaborn, Plotly, dashboards" },
      { title: "Module 5 - Introduction ML", content: "Scikit-learn, modèles supervisés, évaluation" }
    ],
    duration: "25h",
    mode: "Online",
    image: trainingPython,
    category: "Data Science"
  },
  {
    id: "devops-essentials",
    title: "DevOps Essentials",
    shortDescription: "Docker, CI/CD, Kubernetes : automatisez vos déploiements.",
    fullDescription: "Transformez votre façon de développer et déployer avec les pratiques DevOps. Cette formation couvre Docker, les pipelines CI/CD, Kubernetes, et les meilleures pratiques d'infrastructure as code.",
    objectives: [
      "Containeriser des applications avec Docker",
      "Mettre en place des pipelines CI/CD",
      "Orchestrer des containers avec Kubernetes",
      "Automatiser l'infrastructure avec Terraform",
      "Monitorer et loguer efficacement"
    ],
    program: [
      { title: "Module 1 - Docker", content: "Containers, images, Dockerfile, Docker Compose" },
      { title: "Module 2 - CI/CD", content: "GitHub Actions, GitLab CI, Jenkins, stratégies de déploiement" },
      { title: "Module 3 - Kubernetes", content: "Pods, services, deployments, ingress, helm" },
      { title: "Module 4 - IaC", content: "Terraform, Ansible, bonnes pratiques" },
      { title: "Module 5 - Observabilité", content: "Prometheus, Grafana, ELK Stack, alerting" }
    ],
    duration: "30h",
    mode: "Présentiel",
    image: trainingDevops,
    category: "DevOps"
  },
  {
    id: "ux-ui-design",
    title: "UX/UI Design Moderne",
    shortDescription: "Créez des interfaces utilisateur élégantes et intuitives.",
    fullDescription: "Apprenez à concevoir des expériences utilisateur exceptionnelles. Du wireframing au prototypage haute-fidélité avec Figma, maîtrisez tous les aspects du design d'interface moderne.",
    objectives: [
      "Comprendre les principes fondamentaux de l'UX",
      "Maîtriser Figma pour le design d'interface",
      "Créer des design systems cohérents",
      "Prototyper et tester vos designs",
      "Collaborer efficacement avec les développeurs"
    ],
    program: [
      { title: "Module 1 - UX Fundamentals", content: "Recherche utilisateur, personas, user journeys" },
      { title: "Module 2 - UI Principles", content: "Typographie, couleurs, grilles, hiérarchie visuelle" },
      { title: "Module 3 - Figma Mastery", content: "Composants, auto-layout, variants, plugins" },
      { title: "Module 4 - Design Systems", content: "Tokens, documentation, maintenance, scalabilité" },
      { title: "Module 5 - Prototyping", content: "Interactions, animations, tests utilisateurs" }
    ],
    duration: "18h",
    mode: "Online",
    image: trainingUxui,
    category: "Design"
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersécurité Fondamentaux",
    shortDescription: "Protégez vos systèmes contre les menaces modernes.",
    fullDescription: "Dans un monde de plus en plus connecté, la cybersécurité est essentielle. Cette formation vous apprendra à identifier les vulnérabilités, protéger les systèmes, et répondre aux incidents de sécurité.",
    objectives: [
      "Identifier les principales menaces de sécurité",
      "Sécuriser les applications web",
      "Mettre en place une politique de sécurité",
      "Réaliser des tests de pénétration basiques",
      "Gérer les incidents de sécurité"
    ],
    program: [
      { title: "Module 1 - Menaces", content: "Types d'attaques, vecteurs, acteurs malveillants" },
      { title: "Module 2 - Web Security", content: "OWASP Top 10, XSS, SQL Injection, CSRF" },
      { title: "Module 3 - Network Security", content: "Firewalls, VPN, IDS/IPS, segmentation" },
      { title: "Module 4 - Pentesting", content: "Méthodologie, outils, rapport d'audit" },
      { title: "Module 5 - Incident Response", content: "Détection, containment, recovery, lessons learned" }
    ],
    duration: "22h",
    mode: "Hybride",
    image: trainingSecurity,
    category: "Sécurité"
  },
  {
    id: "ai-machine-learning",
    title: "Intelligence Artificielle & ML",
    shortDescription: "Construisez des modèles d'IA et de machine learning performants.",
    fullDescription: "Plongez dans le monde fascinant de l'intelligence artificielle. Des réseaux de neurones au deep learning, apprenez à créer des modèles intelligents qui transforment les données en insights.",
    objectives: [
      "Comprendre les fondamentaux du Machine Learning",
      "Implémenter des réseaux de neurones avec TensorFlow/PyTorch",
      "Entraîner et évaluer des modèles de deep learning",
      "Déployer des modèles en production",
      "Appliquer l'IA à des cas d'usage réels"
    ],
    program: [
      { title: "Module 1 - ML Fundamentals", content: "Supervised, unsupervised, reinforcement learning" },
      { title: "Module 2 - Neural Networks", content: "Perceptrons, backpropagation, activation functions" },
      { title: "Module 3 - Deep Learning", content: "CNN, RNN, Transformers, transfer learning" },
      { title: "Module 4 - NLP & Vision", content: "Text processing, image classification, object detection" },
      { title: "Module 5 - MLOps", content: "Déploiement, monitoring, MLflow, versioning" }
    ],
    duration: "35h",
    mode: "Présentiel",
    image: trainingAi,
    category: "IA"
  }
];

export const getTrainingById = (id: string): Training | undefined => {
  return trainings.find(training => training.id === id);
};
