import { JOB_STATUS } from './constants'
import { EmployeeTypes } from './interfaces'

export class Employee implements EmployeeTypes {
  public name
  public cpf
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
    this.name = name
    this.cpf = cpf
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
}
