import { SectorTypes } from './interfaces'

export class Sector implements SectorTypes {
  public name
  public manager
  public employeesQuantity
  public id

  constructor({ name, manager, employeesQuantity, id }: SectorTypes) {
    this.name = name
    this.id = id
    this.employeesQuantity = employeesQuantity

    if (manager) {
      this.manager = manager
    }
  }
}
