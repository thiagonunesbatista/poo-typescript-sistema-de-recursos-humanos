import { Sector } from './Sector'

export class Vacancy {
  private _quantity: number
  private _sector: Sector
  private _description: string
  private _roleName: string
  private _status: number
  private _expirationDate: Date

  constructor({
    quantity,
    sector,
    description,
    roleName,
    status,
    expirationDate
  }: {
    quantity: number
    sector: Sector
    description: string
    roleName: string
    status: number
    expirationDate: Date
  }) {
    this._quantity = quantity
    this._sector = sector
    this._description = description
    this._roleName = roleName
    this._status = status
    this._expirationDate = expirationDate
  }

  public get quantity(): number {
    return this._quantity
  }

  public get sector(): Sector {
    return this._sector
  }

  public get description(): string {
    return this._description
  }

  public get roleName(): string {
    return this._roleName
  }

  public get status(): number {
    return this._status
  }

  public get expirationDate(): Date {
    return this._expirationDate
  }
}
