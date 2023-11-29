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
    case 4:
      manager.addBenefit()
      break
    case 5:
      manager.listBenefits()
      break
    //case 6:
    // manager.EditBenefits()
    // break
    //case 7:
    // manager.DeleteBenefits()
    // break
    case 8:
      manager.addSector()
      break
    case 9:
      manager.listSectors()
      break
    case 10:
      manager.addVacancy()
      break
    case 11:
      manager.listVacancies()
      break
    //case 12:
    // manager.editVacancies()
    // break
    case 13:
    default:
      exitProgram()
      break
  }
}
