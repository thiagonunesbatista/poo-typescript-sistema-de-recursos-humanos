import { PersonTypes } from './interfaces'

export abstract class Person implements PersonTypes {
  public name
  public cpf
  public id

  constructor({ name, cpf, id }: PersonTypes) {
    this.name = name
    this.cpf = cpf
    this.id = id
  }
}
