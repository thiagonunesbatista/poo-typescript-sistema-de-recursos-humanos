import { Employee } from './Employee'
import { File as FileClass } from './File'
import { Keyboard as KeyboardClass } from './Keyboard'
import { SectorsManagement as SectorsManagementClass } from './SectorsManagement'

import { DATABASE_EMPLOYEES, EXPERIENCE_LEVELS } from './constants'

import { EmployeeTypes, ExperienceLevelType } from './interfaces'
import { createInitialText } from './utils/text'

const file = new FileClass()
const Keyboard = new KeyboardClass()
const sectorsManagement = new SectorsManagementClass()

export class EmployeesManagement {
  raiseSalary() {
    this.list()

    const employeeNameToRaiseSalary = Keyboard.read(
      createInitialText('Nome do empregado a aumentar salário')
    )

    const employeeInstance = this.getSingleEmployee(employeeNameToRaiseSalary)
    const raiseOption = Keyboard.readNumber(
      'Porcentagem a aumentar:\n1 - 5%\n2  - 10%\n3 - 20%\n'
    )

    let salaryRaisePercentage

    switch (raiseOption) {
      case 1:
        salaryRaisePercentage = 5 / 100
        break
      case 2:
        salaryRaisePercentage = 10 / 100
        break
      case 3:
        salaryRaisePercentage = 20 / 100
        break
      default:
        salaryRaisePercentage = 0
    }

    const salaryToAdd = employeeInstance.salary * salaryRaisePercentage

    employeeInstance.addToSalary(salaryToAdd)

    this.replaceOnFile(employeeInstance)
  }

  hire() {
    const createInitialText = (param: string) => `Digite ${param}: `
    const getExperienceLevelsText = (
      accumulator: string,
      currentValue: ExperienceLevelType
    ) => {
      return (accumulator += `${currentValue.id} - ${currentValue.title}\n`)
    }
    const experienceOptions = EXPERIENCE_LEVELS.reduce(
      getExperienceLevelsText,
      ''
    )
    const name = Keyboard.read(createInitialText('nome'))
    const cpf = Keyboard.read(createInitialText('CPF'))
    const entryDate = new Date(
      Keyboard.read(createInitialText('Data de Entrada'))
    )
    const salary = Keyboard.readNumber(createInitialText('Salário'))
    const cltNumber = Keyboard.read(createInitialText('Número CLT'))

    sectorsManagement.list()
    const sectorName = Keyboard.read(createInitialText('Nome do Setor'))

    const sector = sectorsManagement.getSingleSector(sectorName)
    const levelId = Number(
      Keyboard.read(
        createInitialText(`Nível de Experiência\n${experienceOptions}\n`)
      )
    )

    const foundLevel = EXPERIENCE_LEVELS.find(current => {
      if (current.id === levelId) {
        return current.title
      }
    })

    let level = foundLevel === undefined ? '' : foundLevel.title
    const role = Keyboard.read(createInitialText('Cargo'))
    const phone = Keyboard.read(createInitialText('Telefone'))
    const jobStatus = Number(
      Keyboard.read(
        createInitialText('Status\n: 1 - Férias\n2 - Trabalhando\n')
      )
    )
    const newEmployee = new Employee({
      name,
      cpf,
      entryDate,
      salary,
      cltNumber,
      level,
      sector,
      role,
      benefits: [],
      phone,
      jobStatus
    })
    this.addEmployeeToFileEnd(newEmployee)
  }

  private replaceOnFile(employee: EmployeeTypes) {
    const currentEmployeeList = file.readJSON(DATABASE_EMPLOYEES)

    const newEmployeesList = currentEmployeeList.map(
      (current: EmployeeTypes) => {
        if (current.name !== employee.name) {
          return current
        }

        return employee
      }
    )

    file.write({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
  }

  private addEmployeeToFileEnd(newEmployee: EmployeeTypes) {
    const currentEmployeeList = file.readJSON(DATABASE_EMPLOYEES)

    let newEmployeesList = [newEmployee]

    if (currentEmployeeList) {
      newEmployeesList = [...currentEmployeeList, newEmployee]
    }

    file.write({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
  }

  private deleteEmployeeFromFile(employeeToFire: EmployeeTypes) {
    const currentEmployeeList = file.readJSON(DATABASE_EMPLOYEES)

    const newEmployeesList = currentEmployeeList.filter(
      (current: EmployeeTypes) => {
        if (current.name !== employeeToFire.name) {
          return current
        }
      }
    )

    file.write({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
  }

  list() {
    const employeesList = file.readJSON(DATABASE_EMPLOYEES)

    if (!employeesList) {
      console.log('Não há empregados cadastrados')
      return
    }

    employeesList.forEach((currentEmployee: EmployeeTypes) => {
      console.log(
        `Nome: ${currentEmployee.name}\nCargo: ${currentEmployee.role}\n\n`
      )
    })
  }

  fire() {
    this.list()

    const employeeNameToFire = Keyboard.read(
      createInitialText('Nome do empregado a demitir')
    )

    const employeeInstanceToFire = this.getSingleEmployee(employeeNameToFire)

    this.deleteEmployeeFromFile(employeeInstanceToFire)
  }

  getSingleEmployee(employeeName: string) {
    const employeesList = file.readJSON(DATABASE_EMPLOYEES)

    const foundEmployee = employeesList.find(
      (currentEmployee: EmployeeTypes) => {
        if (
          currentEmployee.name.toLowerCase() ===
          employeeName.toLowerCase().trim()
        ) {
          return currentEmployee
        }
      }
    )

    return new Employee(foundEmployee)
  }
}
