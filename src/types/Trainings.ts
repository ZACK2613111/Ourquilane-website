import { StaticImageData } from "next/image";

export interface Training {
    title: string;
    description: string;
    field: string[];
    TechIcons: StaticImageData[];
    TechIconsWhite : StaticImageData[];
}
