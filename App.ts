import { ProgramMenu } from './ProgramMenu'

import { EmployeesManagement as EmployeesManagementClass } from './EmployeesManagement'
import { SectorsManagement as SectorsManagementClass } from './SectorsManagement'
import { VacanciesManagement as VacanciesManagementClass } from './VacanciesManagement'
import { BenefitsManagement as BenefitsManagementClass } from './BenefitsManagement'

const Menu = new ProgramMenu()

let isProgramExecuting = true

const exitProgram = () => {
  isProgramExecuting = false
}

const benefitsManagement = new BenefitsManagementClass()
const sectorsManagement = new SectorsManagementClass()
const employeesManagement = new EmployeesManagementClass()
const vacanciesManagement = new VacanciesManagementClass()

while (isProgramExecuting) {
  Menu.show()

  const menuChosenOption = Menu.getChosenOption()

  switch (menuChosenOption) {
    case 1:
      employeesManagement.add()
      break
    case 2:
      employeesManagement.delete()
      break
    case 3:
      employeesManagement.list()
      break
    case 4:
      employeesManagement.raiseSalary()
      break
    case 5:
      employeesManagement.update()
      break
     case 6:
       benefitsManagement.add()
       break
     case 7:
       benefitsManagement.list()
       break
     case 8:
       benefitsManagement.update()
       break
    case 9:
      benefitsManagement.delete()
      break
    case 10:
      sectorsManagement.add()
      break
    case 11:
      sectorsManagement.list()
      break
    case 12:
      sectorsManagement.update()
      break
    case 13:
      sectorsManagement.delete()
      break
    case 14:
      vacanciesManagement.add()
      break
    case 15:
      vacanciesManagement.list()
      break
    case 16:
      vacanciesManagement.delete()
     break
    case 17:
    default:
      exitProgram()
      break
  }
}
