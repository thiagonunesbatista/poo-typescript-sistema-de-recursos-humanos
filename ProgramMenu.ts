import { Keyboard } from './utils/Keyboard'

export class ProgramMenu {
  private chosenOption!: number

  public show() {
    console.log('============= MENU =============')
    console.log('| 01. Contratar Funcionário        |')
    console.log('| 02. Demitir Funcionário          |')
    console.log('| 03. Listar Funcionários          |')
    console.log('| 10. Adicionar Benefício         |')
    console.log('| 11. Listar Benefícios           |')
    console.log('| 20. Criar Setor                 |')
    console.log('| 21. Listar Setores              |')
    console.log('| 20. Cadastrar Vaga              |')
    console.log('| 09. Sair                        |')
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
