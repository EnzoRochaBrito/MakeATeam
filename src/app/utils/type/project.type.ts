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
    userRef: any
    creator: string
}

export interface ProjectTypeUid extends ProjectType {
    uid: string
    members: string[]
    requests: string[]
    open: boolean
}