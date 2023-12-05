import { Employee } from './Employee'
import { Vacancy } from './Vacancy'

export type PersonTypes = {
  _name: string
  _cpf: string
  _id: string
}

export interface EmployeeTypes extends PersonTypes {
  _entryDate: Date
  _salary: number
  _cltNumber: string
  _sector: SectorTypes
  _role: string
  _level: string
  _benefits: BenefitTypes[]
  _phone: string
  _jobStatus: number
}

export interface BenefitTypes {
  description: string
  name: string
  value: number
}

export interface SectorTypes {
  name: string
  manager?: Employee
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
