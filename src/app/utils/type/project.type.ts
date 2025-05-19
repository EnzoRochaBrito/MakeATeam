import { Timestamp } from "@angular/fire/firestore";

export interface ProjectType {
    name: string
    description: string
    category: number
    experience: string[]
    technologies: string[]
    startDate: string
    estimtedTime: number
    vancancy: number
    repository: string
    createdAt: number
    userRef: string
    creator: string
}

export interface ProjectTypeUid extends ProjectType {
    uid: string
    creator: string
    peopleIn: number
}