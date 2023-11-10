import { Keyboard } from './utils/Keyboard'

export class ProgramMenu {
  private chosenOption!: number

  public show() {
    console.log('============= MENU =============')
    console.log('| 0. Contratar         |')
    console.log('| 1. Adicionar Benefício         |')
    console.log('| 9. Sair         |')
    console.log('| ============================|')

    this.setChosenOption(Number(Keyboard('Escolha uma ação: ')))
  }

  private setChosenOption(option: number) {
    this.chosenOption = option
  }

  public getChosenOption(): number {
    return this.chosenOption
  }
}
