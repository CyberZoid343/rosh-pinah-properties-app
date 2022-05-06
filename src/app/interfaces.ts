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
  dateAdded?: Date,
  dateUpdated?: Date,
  lastEditor: string,
  recentInfo: string,
  dateLastContacted: Date,
  dateFollowUp: Date, 
  tags: string
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
  price: number,
  dateLoi: Date,
  dateAdded?: Date,
  dateUpdated?: Date,
  lastEditor: string,
  tags: string
}

export interface PropertySet{
  resultsFound: number,
  properties: Property[]
}



