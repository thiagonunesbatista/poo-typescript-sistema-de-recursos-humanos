import {
  DATABASE_BENEFITS,
  DATABASE_SECTORS,
  DATABASE_VACANCIES,
  EXPERIENCE_LEVELS,
  DATABASE_EMPLOYEES
} from './constants'

import {
  BenefitTypes,
  EmployeeTypes,
  ExperienceLevelType,
  SectorTypes,
  VacancyType
} from './interfaces'

import { File as FileClass } from './File'
import { Keyboard as KeyboardClass } from './Keyboard'
import { Employee } from './Employee'
import { Benefit } from './Benefit'
import { Sector } from './Sector'
import { Vacancy } from './Vacancy'

const createInitialText = (param: string) => `Digite ${param}: `

const File = new FileClass()
const Keyboard = new KeyboardClass()
export class RhManager {
  raiseSalary() {
    console.log('raiseSalary')
  }

  addBenefit() {
    const name = Keyboard.read(createInitialText('Nome'))
    const value = Keyboard.readNumber(createInitialText('Valor'))
    const description = Keyboard.read(createInitialText('Descrição'))

    const newBenefit = new Benefit({ description, name, value })

    const currentBenefits = File.readJSON(DATABASE_BENEFITS)

    let newBenefits = [newBenefit]

    if (currentBenefits) {
      newBenefits = [...currentBenefits, newBenefit]
    }

    File.write({ fileName: DATABASE_BENEFITS, data: newBenefits })
  }

  listBenefits() {
    const benefits = File.readJSON(DATABASE_BENEFITS)

    if (!benefits) {
      console.log('Não há beneficios cadastrados')
      return
    }

    benefits.forEach((currentBenefit: BenefitTypes) => {
      console.log(
        `${currentBenefit.name} - ${Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(currentBenefit.value)}`
      )
    })
  }
    
  /*DeleteBenefits() {
    const benefits = readJSON(DATABASE_BENEFITS);

    if (!benefits) {
      console.log('Não há benefícios cadastrados');
      return;
    }

    console.log('Benefícios Disponíveis:');
    benefits.forEach((benefit: BenefitTypes, index: number) => {
      console.log(`${index + 1}. ${benefit.name}`);
    });

    const choice = Number(Keyboard('Escolha o benefício para excluir (digite o número): '));

    if (isNaN(choice) || choice <= 0 || choice > benefits.length) {
      console.log('Escolha inválida.');
      return;
    }

    const benefitToDelete = benefits[choice - 1];
    const updatedBenefits = benefits.filter((benefit: BenefitTypes) => benefit !== benefitToDelete);

    writeToFile({ fileName: DATABASE_BENEFITS, data: updatedBenefits });
    console.log(`O benefício "${benefitToDelete.name}" foi excluído com sucesso.`);
  }*/


  addSector() {
    const name = Keyboard.read(createInitialText('Nome'))
    const employeesQuantity = Number(
      Keyboard.read(createInitialText('Quantidade de Funcionários'))
    )

    const newSector = new Sector({
      name,
      employeesQuantity,
      id: name.toLowerCase().replaceAll(' ', '-')
    })

    const currentSectors = File.readJSON(DATABASE_SECTORS)

    let newSectors = [newSector]
    if (currentSectors) {
      newSectors = [...currentSectors, newSector]
    }

    newSectors = newSectors.map(current => ({
      ...current,
      id: current.name.toLowerCase().replaceAll(' ', '-')
    }))
    File.write({ fileName: DATABASE_SECTORS, data: newSectors })
  }

  getSingleSector(sectorName: string) {
    const sectors = File.readJSON(DATABASE_SECTORS)

    const foundSector = sectors.find((currentSector: SectorTypes) => {
      if (
        currentSector.name.toLowerCase() === sectorName.toLowerCase().trim()
      ) {
        return currentSector
      }
    })

    return new Sector(foundSector)
  }

  getSingleEmployee(employeeName: string) {
    const employeesList = File.readJSON(DATABASE_EMPLOYEES)

    const foundEmployee = employeesList.find((currentSector: SectorTypes) => {
      if (
        currentSector.name.toLowerCase() === employeeName.toLowerCase().trim()
      ) {
        return currentSector
      }
    })
    return foundEmployee
  }

  listSectors() {
    const sectors = File.readJSON(DATABASE_SECTORS)

    if (!sectors) {
      console.log('Não há setores cadastrados')
      return
    }

    sectors.forEach((currentSector: SectorTypes) => {
      console.log(
        `
        Setor: ${currentSector.name}\n
        Quantidade de funcionários: ${currentSector.employeesQuantity}\n
        `
      )
    })
  }

  deleteEmployeeFromFile(employeeToFire: EmployeeTypes) {
    const currentEmployeeList = File.readJSON(DATABASE_EMPLOYEES)

    const newEmployeesList = currentEmployeeList.filter(
      (current: EmployeeTypes) => {
        if (current.name !== employeeToFire.name) {
          return current
        }
      }
    )

    File.write({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
  }

  writeEmployeeToFile(newEmployee: EmployeeTypes) {
    const currentEmployeeList = File.readJSON(DATABASE_EMPLOYEES)

    let newEmployeesList = [newEmployee]

    if (currentEmployeeList) {
      newEmployeesList = [...currentEmployeeList, newEmployee]
    }

    File.write({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
  }

  hireEmployee() {
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

    this.listSectors()
    const sectorName = Keyboard.read(createInitialText('Nome do Setor'))

    const sector = this.getSingleSector(sectorName)

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

    this.writeEmployeeToFile(newEmployee)
  }

  fireEmployee() {
    this.listEmployees()

    const employeeNameToFire = Keyboard.read(
      createInitialText('Nome do empregado a demitir')
    )

    const employeeInstanceToFire = this.getSingleEmployee(employeeNameToFire)

    this.deleteEmployeeFromFile(employeeInstanceToFire)
  }

  listEmployees() {
    const employeesList = File.readJSON(DATABASE_EMPLOYEES)

    if (!employeesList) {
      console.log('Não há empregados cadastrados')
      return
    }

    employeesList.forEach((currentEmployee: EmployeeTypes) => {
      console.log(
        `
        Nome: ${currentEmployee.name}\nCargo: ${currentEmployee.role}\n\n
        `
      )
    })
  }

  listVacancies() {
    const vacancies = File.readJSON(DATABASE_VACANCIES)

    if (!vacancies) {
      console.log('Não há vagas cadastradas')
      return
    }

    vacancies.forEach((currentVacancy: VacancyType) => {
      console.log(
        `${currentVacancy.roleName}\n${currentVacancy.description}\n\n`
      )
    })
  }

  writeVacancyToFile(newVacancy: VacancyType) {
    const currentVacancyList = File.readJSON(DATABASE_VACANCIES)

    let newVacanciesList = [newVacancy]

    if (currentVacancyList) {
      newVacanciesList = [...currentVacancyList, newVacancy]
    }

    File.write({ fileName: DATABASE_VACANCIES, data: newVacanciesList })
  }

  addVacancy() {
    const roleName = Keyboard.read(createInitialText('Nome do Cargo'))
    const quantity = Keyboard.readNumber(
      createInitialText('Quantidade de Vagas')
    )
    const description = Keyboard.read(createInitialText('Descrição'))
    const expirationDate = new Date(
      Keyboard.read(createInitialText('Data de expiração da vaga'))
    )

    this.listSectors()
    const sectorName = Keyboard.read(
      createInitialText('Nome do Setor do cargo')
    )

    const sector = this.getSingleSector(sectorName)

    const status = 1

    const newVacancy = new Vacancy({
      roleName,
      quantity,
      description,
      expirationDate,
      sector,
      status
    })

    this.writeVacancyToFile(newVacancy)
  }
}
