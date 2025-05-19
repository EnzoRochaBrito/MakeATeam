export interface UserProfileDTO {
    uid: string,
    name: string,
    email: string,
    createdAt: Date,
    savedProjects: string[]
    projectsOwned: string[]
    memberOf: string[]
}

export interface IUserProfile extends UserProfileDTO {
    description?: string
    stack?: string[]
    country?: string
}