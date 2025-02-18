import { Project } from "@/types/Project";

export const projects: Project[] = [
    {
      id: "1",
      number: "01",
      name: "ITOP",
      client: "OURQUILANE",
      technologies: ["Angular", "TailwindCSS", "NestJs", "TypeScript"],
      description : "Conçue pour assurer  une gestion efficace des adresses mails, de l'équipement IT, des demandes d'assistance avec un système de tickets et de l'inventaire."
    },
    {
      id: "2",
      number: "02",
      name: "CS CARE",
      client: "OURQUILANE",
      technologies: ["Angular", "TailwindCSS", "NestJs", "TypeScript"],
      description: "Conçue pour assurer un traitement rapide et efficace des demandes clients  et réclamations, avec une liaison via API avec le système de livraison pour assurer le tracking et la clôture automatique des demandes."
    },
    {
      id: "3",
      number: "03",
      name: "RETOUR",
      client: "OURQUILANE",
      technologies: [".Net core", "C#", "JavaScript"],
      description:"Une application conçue pour la gestion des centres de retour, l'étiquetage et le stockage des colis, avec une mise à jour automatique des statuts via une API avec le système de livraison.",
    },
    {
      id: "4",
      number: "04",
      name: "DISPATCH CENTER",
      client: "OURQUILANE",
      technologies: ["Django", "ReactJS", "Python", "JavaScript"],
      description:"Outil de Aide a la decision, calcul des performances livreur et station, suggestion de disaptch des colis aux livreurs, dashboard de KPis et statistiques avec prevision des demandes de livraison. "
    }
  ];