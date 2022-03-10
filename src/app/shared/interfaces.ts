export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
  dateAdded?: Date,
  dateUpdated?: Date,
  dateLogin?: Date,
  dateLogoff?: Date,
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
  dateContacted: Date,
  dateFollowUp: Date,
  dateAdded?: Date,
  dateUpdated?: Date,
  companyName: string,
  isActive: boolean,
  lastEditorId: number,
  lastEditor?: User
}

export interface Tag{
  id: number,
  name: string,
  isSelected?: boolean | null
}

export interface ClientTag{
  clientId: number,
  tagId: number,
  tag?: Tag
}

export interface ClientFilters{
  search?: string | null,
  status?: string | null,
  followUpPeriod?: string | null,
  contactPeriod?: string | null
}