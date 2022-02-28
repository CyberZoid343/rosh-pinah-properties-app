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

export interface NewUser {
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

export interface UserNewPassword {
  newPassword: string,
  confirmPassword: string
}

export interface Company{
  id: number,
  name: string,
  dateAdded: Date,
  dateLastUpdated: Date,
  lastEditor: string
}

export interface Client{
  id: number,
  name: string,
  surname: string,
  email: string,
  cellNumber: string,
  telNumber: string,
  dateLastContacted?: Date | null,
  dateFollowUp?: Date | null,
  dateAdded: Date,
  dateLastUpdated: Date,
  companyName: string,
  isActive: boolean,
  clientTags?: Array<ClientTag>;
}

export interface Tag{
  id: number,
  name: string
}

export interface ClientTag{
  clientId: number,
  tagId: number,
  tag?: Tag
}