import { Timestamp } from "@angular/fire/firestore";

export interface ProjectType {
    name: string,
    description: string,
    category: number,
    experience: string[],
    technologies: string[],
    startDate: string,
    estimtedTime: number,
    vancancy: number,
    repository: string,
    createdAt: Timestamp,
    userRef: string
}