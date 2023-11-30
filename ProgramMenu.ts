import { Keyboard as KeyboardClass } from './Keyboard'

const Keyboard = new KeyboardClass()

export class ProgramMenu {
  private chosenOption!: number

  public show() {
    console.log('|============ MENU ===============|')
    console.log('| 01. Contratar Funcionário       |')
    console.log('| 02. Demitir Funcionário         |')
    console.log('| 03. Listar Funcionários         |')
    console.log('| 04. Aumentar Salário            |')
    console.log('| 10. Adicionar Benefício         |')
    console.log('| 11. Listar Benefícios           |')
    console.log('| 12. Editar Benefícios           |')
    console.log('| 13. Deletar Benefício           |')
    console.log('| 20. Criar Setor                 |')
    console.log('| 21. Listar Setores              |')
    console.log('| 22. Atualizar Setor             |')
    console.log('| 30. Cadastrar Vaga              |')
    console.log('| 31. Listar Vagas                |')
    console.log('| 99. Sair                        |')
    console.log('|=================================|')

    this.setChosenOption(Keyboard.readNumber('Escolha uma ação: '))
  }

  private setChosenOption(option: number) {
    this.chosenOption = option
  }

  public getChosenOption(): number {
    return this.chosenOption
  }
}
