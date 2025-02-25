export interface NavbarTranslations {
    home: string
    aboutUs: string
    services: string
    projects: string
    products: string
    trainings: string
    contact: string
    selectLanguage: string
    getStarted: string
  }
  
  export interface NavItem {
    key: keyof NavbarTranslations
    href: string
    route?: string
  }
  
  export const NAV_ITEMS: NavItem[] = [
    { key: "home", href: "#home", route: "/" },
    { key: "aboutUs", href: "#entreprise" },
    { key: "services", href: "#services" },
    { key: "projects", href: "#projects" },
    { key: "products", href: "#products" },
    { key: "trainings", href: "", route: "/trainings" },
    { key: "contact", href: "", route: "/contact" },
  ] as const
  
  export interface DesktopNavProps {
    items: NavItem[]
    activeSection: string
    onNavigate: (href: string, route?: string, e?: React.MouseEvent) => void
    t: (key: keyof NavbarTranslations) => string
  }
  
  export interface MobileNavProps {
    isOpen: boolean
    items: NavItem[]
    activeSection: string
    onNavigate: (href: string, route?: string, e?: React.MouseEvent) => void
    onClose: () => void
    t: (key: keyof NavbarTranslations) => string
    language: string
    onLanguageChange: (lang: string) => void
  }