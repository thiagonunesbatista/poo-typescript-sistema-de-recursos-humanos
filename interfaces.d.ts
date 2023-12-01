export interface PersonTypes {
  name: string
  cpf: string
  id: string
}

export interface EmployeeTypes extends PersonTypes {
  entryDate: Date
  salary: number
  cltNumber: string
  sector: SectorTypes
  role: string
  level: string
  benefits: BenefitTypes[]
  phone: string
  jobStatus: number
}

export interface BenefitTypes {
  description: string
  name: string
  value: number
}

export interface SectorTypes {
  name: string
  manager?: EmployeeTypes
  employeesQuantity: number
  id: string
}

export type ExperienceLevelType = {
  id: number
  title: string
}

export type VacancyType = {
  quantity: number
  sector: SectorTypes
  roleName: string
  expirationDate?: Date
  description: string
  status: number
}
