export interface UserProfileDTO {
    uid: string,
    name: string,
    email: string,
    createdAt: Date,
    savedProjects: Object[]
}