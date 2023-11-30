import { ProgramMenu } from './ProgramMenu'

import { EmployeesManagement as EmployeesManagementClass } from './EmployeesManagement'
import { SectorsManagement as SectorsManagementClass } from './SectorsManagement'
import { VacanciesManagement as VacanciesManagementClass } from './VacanciesManagement'
// import { BenefitsManagement as BenefitsManagementClass } from './BenefitsManagement'

const Menu = new ProgramMenu()

let isProgramExecuting = true

const exitProgram = () => {
  isProgramExecuting = false
}

const sectorsManagement = new SectorsManagementClass()
const employeesManagement = new EmployeesManagementClass()
const vacanciesManagement = new VacanciesManagementClass()
// const benefitsManagement = new BenefitsManagementClass()

while (isProgramExecuting) {
  Menu.show()

  const menuChosenOption = Menu.getChosenOption()

  switch (menuChosenOption) {
    case 1:
      employeesManagement.hire()
      break
    case 2:
      employeesManagement.fire()
      break
    case 3:
      employeesManagement.list()
      break
    case 4:
      employeesManagement.raiseSalary()
      break
    // case 10:
    //   benefitsManagement.add()
    //   break
    // case 11:
    //   benefitsManagement.list()
    //   break
    // case 12:
    //   benefitsManagement.edit()
    //   break
    // case 13:
    //   benefitsManagement.delete()
    //   break
    case 20:
      sectorsManagement.add()
      break
    case 21:
      sectorsManagement.list()
      break
    case 22:
      sectorsManagement.update()
      break
    case 30:
      vacanciesManagement.add()
      break
    case 31:
      vacanciesManagement.list()
      break
    //case 32:
    // manager.editVacancies()
    // break
    case 99:
    default:
      exitProgram()
      break
  }
}
