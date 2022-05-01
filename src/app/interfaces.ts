export interface User {
  userId?: number,
  firstName: string,
  lastName: string,
  email: string,
  dateAdded?: Date,
  dateUpdated?: Date,
  isAdmin?: boolean
}

export interface UserAuthentication {
  email: string,
  password: string
}

export interface ChangePassword {
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

export interface Client{
  clientId?: number,
  firstName: string,
  lastName: string,
  company: string,
  email: string,
  cellphone: string,
  telephone: string,
  dateAdded?: Date,
  dateUpdated?: Date,
  lastEditor: string,
  recentInfo: string,
  dateLastContacted: Date,
  dateFollowUp: Date,  
  clientTags?: ClientTag[]
}

export interface ClientTag{
  clientTagId?: number,
  clientId?: number,
  tagId: number,
  tag?: Tag
}

export interface Property{
  propertyId?: number,
  name: string,
  owner: string,
  price: number,
  dateLoi: Date,
  dateAdded?: Date,
  dateUpdated?: Date,
  lastEditor: string,
  propertyTags?: PropertyTag[]
}

export interface PropertyTag{
  propertyTagId?: number,
  propertyId?: number,
  tagId: number,
  tag?: Tag
}

export interface Tag{
  tagId?: number,
  name: string,
  description: string,
  isClientTag: boolean,
  isPropertyTag: boolean,
  dateAdded?: Date,
  dateUpdated?: Date,
  lastEditor: string,
  isSelected?: boolean
}

