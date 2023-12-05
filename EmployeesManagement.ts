import { Employee } from './Employee'
import { File as FileClass } from './File'
import { Keyboard as KeyboardClass } from './Keyboard'
import { Management } from './Management'
import { SectorsManagement as SectorsManagementClass } from './SectorsManagement'

import { DATABASE_EMPLOYEES, EXPERIENCE_LEVELS } from './constants'

import { EmployeeTypes, ExperienceLevelType } from './interfaces'
import { createInitialText } from './utils/text'

const file = new FileClass()
const Keyboard = new KeyboardClass()
const sectorsManagement = new SectorsManagementClass()

export class EmployeesManagement extends Management {
  raiseSalary() {
    this.list()

    const employeeNameToRaiseSalary = Keyboard.read(
      createInitialText('Nome do empregado a aumentar salário')
    )

    const aux = this.getSingle(employeeNameToRaiseSalary)

    const {
      _cpf: cpf,
      _name: name,
      _jobStatus: jobStatus,
      _role: role,
      _level: level,
      _cltNumber: cltNumber,
      _entryDate: entryDate,
      _sector: sector,
      _phone: phone,
      _salary: salary,
      _id: id,
      _benefits: benefits
    } = aux

    const employeeInstance = new Employee({
      name,
      cpf,
      entryDate,
      salary,
      cltNumber,
      level,
      sector,
      role,
      benefits,
      phone,
      jobStatus,
      id
    })

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

  private createEmployeeFromInput() {
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
      jobStatus,
      id: name.toLowerCase().replaceAll(' ', '-')
    })

    return newEmployee
  }

  update() {
    this.list()

    const employeeNameToUpdate = Keyboard.read(
      createInitialText('Nome do empregado a atualizar')
    )

    const {
      _cpf: cpf,
      _name: name,
      _jobStatus: jobStatus,
      _role: role,
      _level: level,
      _cltNumber: cltNumber,
      _entryDate: entryDate,
      _sector: sector,
      _phone: phone,
      _salary: salary,
      _id: id,
      _benefits: benefits
    } = this.getSingle(employeeNameToUpdate)

    const employeeInstance = new Employee({
      name,
      cpf,
      entryDate,
      salary,
      cltNumber,
      level,
      sector,
      role,
      benefits,
      phone,
      jobStatus,
      id
    })

    let updatedEmployee = this.createEmployeeFromInput()

    const oldId = employeeInstance.id

    updatedEmployee.id = oldId

    this.replaceOnFile(updatedEmployee)
  }

  add() {
    const newEmployee = this.createEmployeeFromInput()

    this.addEmployeeToFileEnd(newEmployee)
  }

  private replaceOnFile(employee: Employee) {
    const currentEmployeeList = file.readJSON(DATABASE_EMPLOYEES)

    const newEmployeesList = currentEmployeeList.map(
      (current: EmployeeTypes) => {
        if (current._id !== employee.id) {
          return current
        }

        return employee
      }
    )

    file.write({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
  }

  private addEmployeeToFileEnd(newEmployee: Employee) {
    const currentEmployeeList = file.readJSON(DATABASE_EMPLOYEES)

    let newEmployeesList = [newEmployee]

    if (currentEmployeeList) {
      newEmployeesList = [...currentEmployeeList, newEmployee]
    }

    file.write({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
  }

  private deleteEmployeeFromFile(employeeToFire: Employee) {
    const currentEmployeeList = file.readJSON(DATABASE_EMPLOYEES)

    const newEmployeesList = currentEmployeeList.filter(
      (current: EmployeeTypes) => {
        if (current._name !== employeeToFire.name) {
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
      const {
        _cpf: cpf,
        _name: name,
        _jobStatus: jobStatus,
        _role: role,
        _level: level,
        _cltNumber: cltNumber,
        _entryDate: entryDate,
        _sector: sector,
        _phone: phone,
        _salary: salary,
        _id: id
      } = currentEmployee

      const employeeInstance = new Employee({
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
        jobStatus,
        id
      })

      console.log(
        `Nome: ${employeeInstance.name}\nCargo: ${employeeInstance.role}\n\n`
      )
    })
  }

  delete() {
    this.list()

    const employeeNameToFire = Keyboard.read(
      createInitialText('Nome do empregado a demitir')
    )

    const {
      _cpf: cpf,
      _name: name,
      _jobStatus: jobStatus,
      _role: role,
      _level: level,
      _cltNumber: cltNumber,
      _entryDate: entryDate,
      _sector: sector,
      _phone: phone,
      _salary: salary,
      _id: id,
      _benefits: benefits
    } = this.getSingle(employeeNameToFire)

    const employeeInstance = new Employee({
      name,
      cpf,
      entryDate,
      salary,
      cltNumber,
      level,
      sector,
      role,
      benefits,
      phone,
      jobStatus,
      id
    })

    this.deleteEmployeeFromFile(employeeInstance)
  }

  getSingle(employeeName: string): EmployeeTypes {
    const employeesList = file.readJSON(DATABASE_EMPLOYEES)

    const foundEmployee = employeesList.find(
      (currentEmployee: EmployeeTypes) => {
        const {
          _cpf: cpf,
          _name: name,
          _jobStatus: jobStatus,
          _role: role,
          _level: level,
          _cltNumber: cltNumber,
          _entryDate: entryDate,
          _sector: sector,
          _phone: phone,
          _salary: salary,
          _id: id
        } = currentEmployee

        const aux = {
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
          jobStatus,
          id
        }

        const employeeInstance = new Employee(aux)

        if (
          employeeInstance.name.toLowerCase() ===
          employeeName.toLowerCase().trim()
        ) {
          return employeeInstance
        }
      }
    )

    return foundEmployee
  }
}
