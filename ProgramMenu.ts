import { Keyboard } from './utils/Keyboard'

export class ProgramMenu {
  private chosenOption!: number

  public show() {
    console.log('|============ MENU ===============|')
    console.log('| 01. Contratar Funcionário       |')
    console.log('| 02. Demitir Funcionário         |')
    console.log('| 03. Listar Funcionários         |')
    console.log('| 04. Adicionar Benefício         |')
    console.log('| 05. Listar Benefícios           |')
    console.log('| 06. Editar Benefícios           |')
    console.log('| 07. Deletar Benefício           |')
    console.log('| 08. Criar Setor                 |')
    console.log('| 09. Listar Setores              |')
    console.log('| 10. Cadastrar Vaga              |')
    console.log('| 11. Listar Vagas                |')
    console.log('| 12. Editar Vaga                 |')
    console.log('| 13. Sair                        |')
    console.log('|=================================|')

    this.setChosenOption(Number(Keyboard('Escolha uma ação: ')))
  }

  private setChosenOption(ogption: number) {
    this.chosenOption = option
  }

  public getChosenOption(): number {
    return this.chosenOption
  }
}
