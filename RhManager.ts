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

import { Keyboard } from './utils/Keyboard'
import { readJSON, writeToFile } from './utils/File'

import { Employee } from './Employee'
import { Benefit } from './Benefit'
import { Sector } from './Sector'
import { Vacancy } from './Vacancy'

const createInitialText = (param: string) => `Digite ${param}: `

export class RhManager {
  addBenefit() {
    const name = Keyboard(createInitialText('Nome'))
    const value = Number(Keyboard(createInitialText('Valor')))
    const description = Keyboard(createInitialText('Descrição'))

    const newBenefit = new Benefit({ description, name, value })

    const currentBenefits = readJSON(DATABASE_BENEFITS)

    let newBenefits = [newBenefit]

    if (currentBenefits) {
      newBenefits = [...currentBenefits, newBenefit]
    }

    writeToFile({ fileName: DATABASE_BENEFITS, data: newBenefits })
  }

  listBenefits() {
    const benefits = readJSON(DATABASE_BENEFITS)

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
    const name = Keyboard(createInitialText('Nome'))
    const employeesQuantity = Number(
      Keyboard(createInitialText('Quantidade de Funcionários'))
    )

    const newSector = new Sector({
      name,
      employeesQuantity,
      id: name.toLowerCase().replaceAll(' ', '-')
    })

    const currentSectors = readJSON(DATABASE_SECTORS)

    let newSectors = [newSector]
    if (currentSectors) {
      newSectors = [...currentSectors, newSector]
    }

    newSectors = newSectors.map(current => ({
      ...current,
      id: current.name.toLowerCase().replaceAll(' ', '-')
    }))
    writeToFile({ fileName: DATABASE_SECTORS, data: newSectors })
  }

  getSingleSector(sectorName: string) {
    const sectors = readJSON(DATABASE_SECTORS)

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
    const employeesList = readJSON(DATABASE_EMPLOYEES)

    const foundEmployee = employeesList.find((currentSector: SectorTypes) => {
      if (
        currentSector.name.toLowerCase() === employeeName.toLowerCase().trim()
      ) {
        return currentSector
      }
    })

    console.log('foundEmployee')
    console.log(foundEmployee)

    return foundEmployee
  }

  listSectors() {
    const sectors = readJSON(DATABASE_SECTORS)

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
    const currentEmployeeList = readJSON(DATABASE_EMPLOYEES)

    const newEmployeesList = currentEmployeeList.filter(
      (current: EmployeeTypes) => {
        if (current.name !== employeeToFire.name) {
          return current
        }
      }
    )

    writeToFile({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
  }

  writeEmployeeToFile(newEmployee: EmployeeTypes) {
    const currentEmployeeList = readJSON(DATABASE_EMPLOYEES)

    let newEmployeesList = [newEmployee]

    if (currentEmployeeList) {
      newEmployeesList = [...currentEmployeeList, newEmployee]
    }

    writeToFile({ fileName: DATABASE_EMPLOYEES, data: newEmployeesList })
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

    const name = Keyboard(createInitialText('nome'))
    const cpf = Keyboard(createInitialText('CPF'))
    const entryDate = new Date(Keyboard(createInitialText('Data de Entrada')))
    const salary = Number(Keyboard(createInitialText('Salário')))
    const cltNumber = Keyboard(createInitialText('Número CLT'))

    this.listSectors()
    const sectorName = Keyboard(createInitialText('Nome do Setor'))

    const sector = this.getSingleSector(sectorName)

    const levelId = Number(
      Keyboard(
        createInitialText(`Nível de Experiência\n${experienceOptions}\n`)
      )
    )

    const foundLevel = EXPERIENCE_LEVELS.find(current => {
      if (current.id === levelId) {
        return current.title
      }
    })

    let level = foundLevel === undefined ? '' : foundLevel.title

    const role = Keyboard(createInitialText('Cargo'))

    const phone = Keyboard(createInitialText('Telefone'))
    const jobStatus = Number(
      Keyboard(createInitialText('Status\n: 1 - Férias\n2 - Trabalhando\n'))
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
    console.log('newEmployee')
    console.log(newEmployee)
  }

  fireEmployee() {
    this.listEmployees()

    const employeeNameToFire = Keyboard(
      createInitialText('Nome do empregado a demitir')
    )

    console.log(employeeNameToFire)

    const employeeInstanceToFire = this.getSingleEmployee(employeeNameToFire)

    this.deleteEmployeeFromFile(employeeInstanceToFire)
  }

  listEmployees() {
    const employeesList = readJSON(DATABASE_EMPLOYEES)

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
    const vacancies = readJSON(DATABASE_VACANCIES)

    if (!vacancies) {
      console.log('Não há vagas cadastradas')
      return
    }

    vacancies.forEach((currentVacancy: VacancyType) => {
      console.log(
        `${currentVacancy.roleName}\n
        ${currentVacancy.description}
        \n\n`
      )
    })
  }

  writeVacancyToFile(newVacancy: VacancyType) {
    const currentVacancyList = readJSON(DATABASE_VACANCIES)

    let newVacanciesList = [newVacancy]

    if (currentVacancyList) {
      newVacanciesList = [...currentVacancyList, newVacancy]
    }

    writeToFile({ fileName: DATABASE_VACANCIES, data: newVacanciesList })
  }

  addVacancy() {
    const roleName = Keyboard(createInitialText('Nome do Cargo'))
    const quantity = Number(Keyboard(createInitialText('Quantidade de Vagas')))
    const description = Keyboard(createInitialText('Descrição'))
    const expirationDate = new Date(
      Keyboard(createInitialText('Data de expiração da vaga'))
    )

    this.listSectors()
    const sectorName = Keyboard(createInitialText('Nome do Setor do cargo'))

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
