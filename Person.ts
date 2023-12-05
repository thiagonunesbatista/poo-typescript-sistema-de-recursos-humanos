export abstract class Person {
  private _name: string
  private _cpf: string
  private _id: string

  constructor({ name, cpf, id }: { name: string; cpf: string; id: string }) {
    this._name = name
    this._cpf = cpf
    this._id = id
  }

  public get name(): string {
    return this._name
  }

  public get cpf(): string {
    return this._cpf
  }

  public get id(): string {
    return this._id
  }

  public set id(id: string) {
    this._id = id
  }
}
