import { Person } from './Person'

import { JOB_STATUS } from './constants'
import { EmployeeTypes } from './interfaces'

export class Employee extends Person implements EmployeeTypes {
  public entryDate
  public cltNumber
  public salary
  public jobStatus = 1
  public sector
  public role
  public level
  public benefits
  public phone

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
    phone
  }: EmployeeTypes) {
    super({ cpf, name })

    this.entryDate = entryDate
    this.cltNumber = cltNumber
    this.salary = salary
    this.sector = sector
    this.role = role
    this.level = level
    this.benefits = benefits
    this.phone = phone

    if (!jobStatus) {
      const foundJobStatus = JOB_STATUS.find(
        currentStatus => currentStatus.id === 2
      )

      if (foundJobStatus) {
        this.jobStatus = foundJobStatus.id
      }
    }
  }

  raiseSalary(raisePercentage: 5 | 10 | 20 | 30) {
    this.salary += this.salary * (raisePercentage / 100)
  }
}
