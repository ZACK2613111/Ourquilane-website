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