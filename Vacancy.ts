import { VacancyType } from './interfaces'

export class Vacancy implements VacancyType {
  public quantity
  public sector
  public description
  public roleName
  public status
  public expirationDate

  constructor({
    quantity,
    sector,
    description,
    roleName,
    status,
    expirationDate
  }: VacancyType) {
    this.quantity = quantity
    this.sector = sector
    this.description = description
    this.roleName = roleName
    this.status = status
    this.expirationDate = expirationDate
  }
}
