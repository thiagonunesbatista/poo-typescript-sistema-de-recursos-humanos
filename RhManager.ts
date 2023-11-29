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
  SectorTypes
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

  listVacancies() {}

  addVacancy() {
    // const roleName = Keyboard(createInitialText('Nome do Cargo'))

    // const description = Keyboard(createInitialText('Descrição'))
    // const expirationDate = new Date(
    //   Keyboard(createInitialText('Data de expiração da vaga'))
    // )

    // const quantity = Number(Keyboard(createInitialText('Quantidade de Vagas')))

    // const sector = Number(Keyboard(createInitialText('Nome do Setor do Cargo')))

    const currentVacancies = readJSON(DATABASE_VACANCIES)

    const newSectors = []

    // writeToFile({ fileName: DATABASE_VACANCIES, data: newSectors })
  }

  // listEmployees() {
  //   const employeesList = readJSON(DATABASE_)

  //   if (!employeesList) {
  //     console.log('Não há setores cadastrados')
  //     return
  //   }

  //   employeesList.forEach((currentSector: SectorTypes) => {
  //     console.log(
  //       `
  //       Setor: ${currentSector.name}\n
  //       Quantidade de funcionários: ${currentSector.employeesQuantity}\n
  //       `
  //     )
  //   })
  // }

  // fireEmployee() {
  //   // const employessList
  // }
}
