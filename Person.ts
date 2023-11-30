import { PersonTypes } from './interfaces'

export abstract class Person implements PersonTypes {
  public name
  public cpf

  constructor({ name, cpf }: PersonTypes) {
    this.name = name
    this.cpf = cpf
  }
}
