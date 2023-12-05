import { Person } from './Person'

import { JOB_STATUS } from './constants'
import { BenefitTypes, SectorTypes } from './interfaces'

export class Employee extends Person {
  private _entryDate: Date
  private _cltNumber: string
  private _salary: number
  private _jobStatus: number = 1
  private _sector: SectorTypes
  private _role: string
  private _level: string
  private _benefits: BenefitTypes[]
  private _phone: string

  constructor({
    cpf,
    cltNumber,
    name,
    entryDate,
    salary,
    jobStatus,
    sector,
    role,
    level,
    benefits,
    phone,
    id
  }: {
    entryDate: Date
    salary: number
    cltNumber: string
    sector: SectorTypes
    role: string
    level: string
    benefits: BenefitTypes[]
    phone: string
    jobStatus: number
    name: string
    cpf: string
    id: string
  }) {
    super({ cpf, name, id })

    this._entryDate = entryDate
    this._cltNumber = cltNumber
    this._salary = salary
    this._sector = sector
    this._role = role
    this._level = level
    this._benefits = benefits
    this._phone = phone

    if (!jobStatus) {
      const foundJobStatus = JOB_STATUS.find(
        currentStatus => currentStatus.id === 2
      )

      if (foundJobStatus) {
        this._jobStatus = foundJobStatus.id
      }
    }
  }

  public get entryData(): Date {
    return this._entryDate
  }

  public get cltNumber(): string {
    return this._cltNumber
  }

  public get salary(): number {
    return this._salary
  }

  public get jobStatus(): number {
    return this._jobStatus
  }

  public get sector(): SectorTypes {
    return this._sector
  }

  public get role(): string {
    return this._role
  }

  public get level(): string {
    return this._level
  }

  public get benefits(): BenefitTypes[] {
    return this._benefits
  }

  public get phone(): string {
    return this._phone
  }

  addToSalary(salaryToAdd: number) {
    this._salary += salaryToAdd
  }
}
