import type React from "react";
import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ourquilane.com"),
  title: {
    default:
      "OURQUILANE | Solutions Logicielles Innovantes & Transformation Digitale ",
    template: "%s | OURQUILANE",
  },
  description:
    "OURQUILANE développe des solutions logicielles innovantes pour l'optimisation des processus, la digitalisation et l'aide à la décision. Experts en transformation digitale et marketing digital. Nos clients incluent Yalidine, Varbiof, WeCan Services, Easy and Speed, Speedmail, Guepex Delivery.",
  keywords: [
    "solutions logicielles",
    "digitalisation",
    "marketing digital",
    "aide à la décision",
    "gestion ressources humaines",
    "optimisation processus",
    "HR Force",
    "FLEET Go",
    "ITOP",
    "CASH Box",
    "Route Planner",
    "CS Care",
    "Yalidine",
    "Varbiof",
    "WeCan Services",
    "Easy and Speed",
    "Speedmail",
    "Guepex Delivery",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "OURQUILANE | Solutions Logicielles Innovantes",
    description:
      "Solutions innovantes pour la digitalisation, le marketing digital et l'aide à la décision. Transformation digitale sur mesure pour votre entreprise.",
    url: "https://ourquilane.com",
    siteName: "OURQUILANE",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OURQUILANE | Solutions Logicielles Innovantes",
    description:
      "Experts en transformation digitale et solutions logicielles personnalisées.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <LanguageProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "OURQUILANE",
                url: "https://ourquilane.com",
                logo: "https://ourquilane.com/logo.png",
                description:
                  "Solutions logicielles innovantes pour l'optimisation des processus",
                sameAs: [
                  "https://www.instragram.com/ourquilane",
                  "https://www.instagram.com/yalidine_express/",
                  "https://www.instagram.com/varbioff.dz/",
                  "https://www.instagram.com/wecan.services_/",
                  "https://www.instagram.com/easy_and_speed/",
                  "https://www.instagram.com/speedmail.dz/",
                  "https://www.instagram.com/guepexdelivery/",
                  "https://www.linkedin.com/company/yalidine-express/posts/?feedView=all",
                  "https://www.linkedin.com/company/speedmaildz/",
                  "https://www.linkedin.com/company/guepex-delivery/",
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Rue d'Icosium Hydra El Biar Wilaya Alger",
                  addressLocality: "Hydra",
                  addressRegion: "Algiers",
                  addressCountry: "DZ",
                  postalCode: "16016",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+213550923561",
                  email: "admin@ourquilane.dz",
                  contactType: "customer service",
                },
                offers: {
                  "@type": "Offer",
                  itemOffered: [
                    {
                      "@type": "Service",
                      name: "Digitalisation",
                      description:
                        "Création de plateformes numériques innovantes pour transformer vos processus métier",
                    },
                    {
                      "@type": "Service",
                      name: "Marketing Digital",
                      description:
                        "Conception de sites e-commerce et stratégies de marketing digital sur mesure",
                    },
                    {
                      "@type": "Service",
                      name: "Aide à la décision",
                      description:
                        "Solutions d'optimisation et d'aide à la décision basées sur des données fiables",
                    },
                  ],
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Solutions Logicielles",
                  itemListElement: [
                    {
                      "@type": "Product",
                      name: "HR Force",
                      description: "Gestion complète des ressources humaines",
                    },
                    {
                      "@type": "Product",
                      name: "FLEET Go",
                      description:
                        "Gestion optimisée de flotte de véhicules en temps réel",
                    },
                    {
                      "@type": "Product",
                      name: "ITOP",
                      description:
                        "Gestion du parc informatique et téléphonique",
                    },
                    {
                      "@type": "Product",
                      name: "CASH Box",
                      description: "Gestion des opérations financières",
                    },
                    {
                      "@type": "Product",
                      name: "Route Planner",
                      description:
                        "Planification et optimisation des tournées de véhicules",
                    },
                    {
                      "@type": "Product",
                      name: "CS Care",
                      description: "Traitement des réclamations clients",
                    },
                  ],
                },
              }),
            }}
          />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
