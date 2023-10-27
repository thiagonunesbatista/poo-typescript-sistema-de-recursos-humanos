import { Employee } from './Employee'
import { ProgramMenu } from './ProgramMenu'
import { RhExployee } from './RhEmployee'

const Menu = new ProgramMenu()
const Management = new RhExployee()

const thiagoEmployee = new Employee({
  cpf: '000.000.000-00',
  name: 'Thiago Nunes Batista'
})

let isProgramExecuting = true

const hireEmployee = () => {}

while (isProgramExecuting) {
  Menu.chooseOption()

  const menuChosenOption = Menu.getChosenOption()

  switch (menuChosenOption) {
    case 0:
      hireEmployee()
      break

    default:
      break
  }
}
