import { Keyboard as KeyboardClass } from './Keyboard'

const Keyboard = new KeyboardClass()

export class ProgramMenu {
  private chosenOption!: number

  public show() {
    console.log('|============ MENU ===============|')
    console.log('| 01. Contratar Funcionário      |')
    console.log('| 02. Demitir Funcionário        |')
    console.log('| 03. Listar Funcionários        |')
    console.log('| 04. Aumentar Salário           |')
    console.log('| 05. Editar Dados               |')
    console.log('| 06. Adicionar Benefício        |')
    console.log('| 07. Listar Benefícios          |')
    console.log('| 08. Editar Benefícios          |')
    console.log('| 09. Deletar Benefício          |')
    console.log('| 10. Criar Setor                |')
    console.log('| 11. Listar Setores             |')
    console.log('| 12. Atualizar Setor            |')
    console.log('| 13. Deletar Setor              |')
    console.log('| 14. Cadastrar Vaga             |')
    console.log('| 15. Listar Vagas               |')
    console.log('| 16. Deletar Vaga               |')
    console.log('| 17. Sair                       |')
    console.log('|================================|')

    this.setChosenOption(Keyboard.readNumber('Escolha uma ação: '))
  }

  private setChosenOption(option: number) {
    this.chosenOption = option
  }

  public getChosenOption(): number {
    return this.chosenOption
  }
}
