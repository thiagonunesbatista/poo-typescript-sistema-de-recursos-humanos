export interface EmployeeTypes {
  name: string
  cpf: string
  entryDate: Date
  salary: number
  cltNumber: string
  sector: SectorTypes
  role: 'string'
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
}

export type ExperienceLevelType = {
  id: number
  title: string
}

export type VacancyType = {
  status: number
}
