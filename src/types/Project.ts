export interface Project {
    id: string
    number: string
    name: string
    client: string
    technologies: string[]
    description: string
  }
  
export interface ProjectCardProps {
    project: Project
    totalProjects: number
    i: number
  }