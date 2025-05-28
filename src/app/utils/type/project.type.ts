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
    tags: {
        [uid: string]: string;
    }
}

export interface ProjectTypeUid extends ProjectType {
    memberRequest: string[]
    uid: string
    members: string[]
    open: boolean
}