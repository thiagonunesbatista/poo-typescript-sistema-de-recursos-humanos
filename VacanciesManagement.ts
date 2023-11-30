import { Vacancy } from './Vacancy'
import { File as FileClass } from './File'
import { Keyboard as KeyboardClass } from './Keyboard'
import { SectorsManagement as SectorsManagementClass } from './SectorsManagement'

import { DATABASE_VACANCIES } from './constants'

import { VacancyType } from './interfaces'
import { createInitialText } from './utils/text'

const file = new FileClass()
const Keyboard = new KeyboardClass()
const sectorsManagement = new SectorsManagementClass()

export class VacanciesManagement {
  list() {
    const vacancies = file.readJSON(DATABASE_VACANCIES)

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

  private writeVacancyToFile(newVacancy: VacancyType) {
    const currentVacancyList = file.readJSON(DATABASE_VACANCIES)

    let newVacanciesList = [newVacancy]

    if (currentVacancyList) {
      newVacanciesList = [...currentVacancyList, newVacancy]
    }

    file.write({ fileName: DATABASE_VACANCIES, data: newVacanciesList })
  }

  add() {
    const roleName = Keyboard.read(createInitialText('Nome do Cargo'))
    const quantity = Keyboard.readNumber(
      createInitialText('Quantidade de Vagas')
    )
    const description = Keyboard.read(createInitialText('Descrição'))
    const expirationDate = new Date(
      Keyboard.read(createInitialText('Data de expiração da vaga'))
    )

    sectorsManagement.list()
    const sectorName = Keyboard.read(
      createInitialText('Nome do Setor do cargo')
    )

    const sector = sectorsManagement.getSingleSector(sectorName)

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
