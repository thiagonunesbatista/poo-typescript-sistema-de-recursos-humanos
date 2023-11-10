import { EmployeeTypes } from './interfaces'

export class Employee implements EmployeeTypes {
  public name
  public cpf
  public entryDate
  public cltNumber
  public salary

  constructor({ cpf, cltNumber, name, entryDate, salary }: EmployeeTypes) {
    this.name = name
    this.cpf = cpf
    this.entryDate = entryDate
    this.cltNumber = cltNumber
    this.salary = salary
  }

  public setName(name: string) {
    this.name = name
  }
}
