import Prompt from 'prompt-sync'

const Keyboard = Prompt()

export class ProgramMenu {
  private chosenOption!: number

  public chooseOption() {
    console.clear()
    console.log('============= MENU =============')
    console.log('| 0. Contratar         |')
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
