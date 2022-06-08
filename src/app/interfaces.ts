export interface User {
  userId?: number,
  firstName: string,
  lastName: string,
  email: string,
  isAdmin?: boolean,
  dateAdded?: Date,
  dateUpdated?: Date
}

export interface UserAuth {
  email: string,
  password: string
}

export interface UserNewPassword {
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
  officeRegion: string,
  officeAddress: string,
  dateAdded?: Date,
  dateUpdated?: Date,
  recentInfo: string,
  dateLastContacted: Date,
  dateFollowUp: Date, 
  tags: string,
  lastEditorId: number,
  lastEditor?: User
}

export interface ClientSet{
  resultsFound: number,
  currentPage: number,
  totalPages: number,
  clients: Client[]
}

export interface Property{
  propertyId?: number,
  name: string,
  owner: string,
  price?: number,
  dateLoi: Date,
  dateAdded?: Date,
  dateUpdated?: Date,
  tags: string,
  lastEditorId?: number,
  lastEditor?: User
}

export interface PropertySet{
  resultsFound: number,
  currentPage: number,
  totalPages: number,
  properties: Property[]
}



