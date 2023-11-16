import { SectorTypes } from './interfaces'

export class Sector implements SectorTypes {
  public name
  public manager
  public employeesQuantity

  constructor({ name, manager, employeesQuantity }: SectorTypes) {
    this.name = name
    this.employeesQuantity = employeesQuantity

    if (manager) {
      this.manager = manager
    }
  }
}
