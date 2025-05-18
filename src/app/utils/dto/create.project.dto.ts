export interface CreateProjectDTO {
    name: string,
    description: string,
    category: number,
    experience: string[],
    technologies: string[],
    startDate: string,
    estimtedTime: number,
    vancancy: number,
    repository: string
}