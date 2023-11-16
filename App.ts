import { RhManager } from './RhManager'

import { ProgramMenu } from './ProgramMenu'

const Menu = new ProgramMenu()

let isProgramExecuting = true

const exitProgram = () => {
  isProgramExecuting = false
}

const manager = new RhManager()

while (isProgramExecuting) {
  Menu.show()

  const menuChosenOption = Menu.getChosenOption()

  switch (menuChosenOption) {
    case 1:
      manager.hireEmployee()
      break
    // case 2:
    //   manager.fireEmployee()
    //   break
    // case 3:
    //   manager.listEmployees()
    //   break
    case 10:
      manager.addBenefit()
      break
    case 11:
      manager.listBenefits()
      break
    case 20:
      manager.addSector()
      break
    case 21:
      manager.listSectors()
      break
    case 9:
    default:
      exitProgram()
      break
  }
}
