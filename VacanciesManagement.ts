import { Vacancy } from './Vacancy'
import { File as FileClass } from './File'
import { Keyboard as KeyboardClass } from './Keyboard'
import { SectorsManagement as SectorsManagementClass } from './SectorsManagement'
import { Management } from './Management'
import { DATABASE_VACANCIES } from './constants'

import { VacancyType } from './interfaces'
import { createInitialText } from './utils/text'

const file = new FileClass()
const Keyboard = new KeyboardClass()
const sectorsManagement = new SectorsManagementClass()

export class VacanciesManagement extends Management {
  list() {
    const vacancies = file.readJSON(DATABASE_VACANCIES)

    if (!vacancies) {
      console.log('Não há vagas cadastradas')
      return
    }

    vacancies.forEach((currentVacancy: VacancyType) => {
      const {
        _description: description,
        _expirationDate: expirationDate,
        _quantity: quantity,
        _roleName: roleName,
        _sector: sector,
        _status: status
      } = currentVacancy

      const instance = new Vacancy({
        description,
        expirationDate,
        quantity,
        roleName,
        sector,
        status
      })

      console.log(`${instance.roleName}\n${instance.description}\n\n`)
    })
  }

  private writeVacancyToFile(newVacancy: Vacancy) {
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

  delete() {
    this.list()

    const roleNameToDelete = Keyboard.read(
      createInitialText('Nome do cargo da vaga a ser excluída')
    )

    const {
      _description: description,
      _expirationDate: expirationDate,
      _quantity: quantity,
      _roleName: roleName,
      _sector: sector,
      _status: status
    } = this.getSingle(roleNameToDelete)

    const instance = new Vacancy({
      description,
      expirationDate,
      quantity,
      roleName,
      sector,
      status
    })

    // Exibir informações sobre a vaga antes de excluir
    console.log('\nInformações da vaga a ser excluída:')
    console.log('-------------------------------------')
    console.log(`Cargo: ${instance.roleName}`)
    console.log(`Descrição: ${instance.description}`)
    console.log(`Quantidade: ${instance.quantity}\n`)

    const confirmDeletion = Keyboard.readNumber(
      createInitialText('Digite 1 para confirmar a exclusão ou 2 para cancelar')
    )

    if (confirmDeletion === 1) {
      const updatedVacancies = this.deleteVacancyFromFile(instance)
      console.log('Vaga excluída com sucesso.')
    } else {
      console.log('Exclusão cancelada.')
    }
  }

  private deleteVacancyFromFile(vacancyToDelete: Vacancy): VacancyType[] {
    const currentVacancyList = file.readJSON(DATABASE_VACANCIES)

    const updatedVacanciesList = currentVacancyList.filter(
      (current: VacancyType) => {
        return current._roleName !== vacancyToDelete.roleName
      }
    )

    file.write({ fileName: DATABASE_VACANCIES, data: updatedVacanciesList })

    return updatedVacanciesList
  }

  private getSingle(roleName: string): VacancyType {
    const vacanciesList = file.readJSON(DATABASE_VACANCIES)

    const foundVacancy = vacanciesList.find((currentVacancy: VacancyType) => {
      return (
        currentVacancy._roleName.toLowerCase() === roleName.toLowerCase().trim()
      )
    })

    return foundVacancy
  }

  update(): void {}
}
