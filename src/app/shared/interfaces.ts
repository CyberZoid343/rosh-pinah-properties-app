export interface User {
    id: number,
    name: string,
    surname: string,
    email: string,
    dateAdded: Date,
    dateLastUpdated: Date,
    dateLastLogin: Date,
    dateLastLogoff: Date,
    isAdmin: boolean,
    isOnline: boolean,
    isActivated: boolean
}

export interface UserAuthentication {
  email: string,
  password: string
}
