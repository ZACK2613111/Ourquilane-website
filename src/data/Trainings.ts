import technologies from '../../public/images/Trainers/technologies/';
import { Training } from "@/types/Trainings";

const { 
  Azure, Docker, MySql, Pandas, NodeJs, Numpy, Php, Python, ScikitLearn, React, TensorFlow, Matplotlib,
  AzureWhite, DockerWhite, MySqlWhite, PandasWhite, NodeJsWhite, NumpyWhite, PhpWhite, PythonWhite, ScikitLearnWhite, ReactWhite, TensorFlowWhite, MatplotlibWhite 
} = technologies;

export const Trainings: Training[] = [
  {
    title: "PFE : Prédiction des Demandes de Livraison et Analyse des Réclamations Clients via Apprentissage MultiModal et Détection des Changements de Contexte",
    description: "Un système intelligent et adaptatif combine Deep Learning et Apprentissage Multi-Modal pour analyser la demande et les réclamations clients. Grâce à la détection du concept drift, il ajuste dynamiquement ses prédictions, assurant ainsi une performance continue.",
    field: ["Systemes d'information et Technologies", "Ingéniorat", "ESI Alger"],
    TechIcons: [Python, Php, ScikitLearn, TensorFlow],
    TechIconsWhite: [PythonWhite, PhpWhite, ScikitLearnWhite, TensorFlowWhite]
  },
  {
    title: "PFE : Optimisation du service de livraison express cas: Yalidine El-djazair",
    description: "Une approche en deux phases optimise les tournées de livraison pour une flotte homogène en Algérie. En combinant le partitionnement par k-means et la comparaison des métaheuristiques ACS (Ant Colony System) et GB (Golden Ball), elle vise à améliorer l’efficacité des tournées.",
    field: ["Recherche opérationnelle", "MASTER 2", "USTHB"],
    TechIcons: [Pandas, Numpy, MySql, Matplotlib],
    TechIconsWhite: [PandasWhite, NumpyWhite, MySqlWhite, MatplotlibWhite]
  },
  {
    title: "PFE : Résolution du problème de localisation des agences de livraison de Yalidine Express",
    description: `Ce projet optimise la localisation des stations de livraison de Yalidine en réduisant leur nombre tout en assurant une couverture complète de la wilaya d’Alger. En s’appuyant sur une analyse basée sur des données réelles, il vise à améliorer le service et à soutenir l’expansion des activités. Cette approche stratégique constitue une base solide pour les futures optimisations logistiques.`,
    field: ["Recherche opérationnelle", "MASTER 2", "USTHB"],
    TechIcons: [Python, Php, Pandas, Matplotlib],
    TechIconsWhite: [PythonWhite, PhpWhite, PandasWhite, MatplotlibWhite]
  },
  {
    title: "Stage 1CS : Développement d'une plateforme de gestion pour la traçabilité et l'automatisation des processus agricoles",
    description: "Ce projet automatise et centralise la gestion des fournisseurs, la réception des produits et l’affectation des variétés. Il optimise les processus internes en assurant une traçabilité complète, un suivi des livraisons et une communication fluide entre les acteurs impliqués. Grâce à une interface intuitive et des notifications en temps réel, il améliore l’efficacité et le suivi des tâches.",
    field: ["Systemes d'information et Technologies", "Ingéniorat", "ESI Alger"],
    TechIcons: [Docker, NodeJs, React, Azure],
    TechIconsWhite: [DockerWhite, NodeJsWhite, ReactWhite, AzureWhite]
  }
];
