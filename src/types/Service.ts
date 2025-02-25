import { StaticImageData } from "next/image";

export interface Service {
  title: string;
  description: string;
  icon: StaticImageData;
}

export interface ServiceCardProps {
  service: Service;
  className?: string;
}