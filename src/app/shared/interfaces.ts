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
  dateLastContacted: Date,
  dateFollowUp: Date,
  dateAdded?: Date,
  dateUpdated?: Date,
  companyName: string,
  isActive: boolean,
  lastEditorId: number,
  lastEditor?: User,
  followUpDays?: number,
  lastContactedDays?: number,
  updatedDays?: number,
  tags?: string
  tagArray?: any[]
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

export interface ClientFilters{
  search?: string | null,
  status?: string | null,
  followUpPeriod?: string | null,
  lastContactedPeriod?: string | null
}