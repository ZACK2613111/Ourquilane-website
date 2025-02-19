import {Monitor, Global, Settings, Status, Lamp, Presentation } from '../../public/images/services';

import { Service } from '@/types/Service';

export const services: Service[] = [
  {
    title: "Special Offers for Startups and Young Entrepreneurs",
    description: "Tailored solutions for innovative project owners, with reduced rates and personalized support.",
    icon: Status
  },
  {
    title: "Web and Mobile Development",
    description:"Creation of high-performance, scalable applications tailored to business needs.",
    icon: Monitor 
  },
  {
    title: "Workshops with Specialists",
    description: "Interactive sessions led by experts to deepen knowledge and exchange best market practices.",
    icon: Presentation
  },
  {
    title: "Business Digitalization",
    description: "Support and consulting in digital transformation to modernize processes and enhance productivity through our R&D service.",
    icon: Lamp
  },
  {
    title: "ERP Implementation",
    description: "Integration and customization of complete management solutions to optimize business operations.",
    icon: Settings
  },
  {
    title: "Training in Development and Digital Professions",
    description: "Programs to develop skills in future technologies, particularly for young professionals.",
    icon: Global
  }
];

export const servicesFrensh: Service[] = [
  {
    title: "Offres spéciales pour les startups et jeunes entrepreneurs",
    description: "Des solutions sur mesure pour les propriétaires de projets innovants, avec des tarifs réduits et un accompagnement personnalisé.",
    icon: Status
  },
  {
    title: "Développement Web et Mobile",
    description:"Création d'applications performantes et évolutives adaptées aux besoins des entreprises.",
    icon: Monitor 
  },
  {
    title: "Ateliers avec des spécialistes",
    description: "Des sessions interactives animées par des experts pour approfondir les connaissances et échanger les meilleures pratiques du marché.",
    icon: Presentation
  },
  {
    title: "Numérisation des entreprises",
    description: "Support et conseil en transformation numérique pour moderniser les processus et améliorer la productivité grâce à notre service R&D.",
    icon: Lamp
  },
  {
    title: "Implémentation ERP",
    description: "Intégration et personnalisation de solutions complètes de gestion pour optimiser les opérations de l'entreprise.",
    icon: Settings
  },
  {
    title: "Formation aux métiers du développement et du numérique",
    description: "Des programmes pour développer des compétences sur les technologies de demain, particulièrement pour les jeunes professionnels.",
    icon: Global
  }
];
