import {
  DATABASE_BENEFITS,
  DATABASE_SECTORS,
  DATABASE_VACANCIES,
  EXPERIENCE_LEVELS
} from './constants'

import { BenefitTypes, ExperienceLevelType, SectorTypes } from './interfaces'

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

    const levelId = Number(
      Keyboard(createInitialText(`Nível de Experiência\n${experienceOptions}`))
    )

    const foundLevel = EXPERIENCE_LEVELS.find(current => {
      if (current.id === levelId) {
        return current.title
      }
    })

    let level = foundLevel === undefined ? '' : foundLevel.title
    //sector, role, benefits, job Status

    console.log(level)

    const sector = ''

    const role = ''
    const benefits = []
    const phone = ''
    const jobStatus = 1

    // level ? level.title : ''

    // const newEmployee = new Employee({
    //   name,
    //   cpf,
    //   entryDate,
    //   salary,
    //   cltNumber,
    //   level,
    //   sector,
    //   role,
    //   benefits,
    //   phone,
    //   jobStatus
    // })

    // console.log(newEmployee)
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
