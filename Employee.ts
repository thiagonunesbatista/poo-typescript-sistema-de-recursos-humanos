import { EmployeeTypes } from './interfaces'

export class Employee implements EmployeeTypes {
  public name: string
  public cpf

  constructor({ name, cpf }: EmployeeTypes) {
    this.name = name
    this.cpf = cpf
  }

  public setName(name: string) {
    this.name = name
  }
}
