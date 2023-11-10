import { BenefitTypes } from './interfaces'

export class Benefit implements BenefitTypes {
  public description
  public name
  public value

  constructor({ description, name, value }: BenefitTypes) {
    this.description = description
    this.name = name
    this.value = value
  }
}
