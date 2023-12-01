import { EmployeesManagement as EmployeesManagementClass } from './EmployeesManagement'
import { File as FileClass } from './File'
import { Keyboard as KeyboardClass } from './Keyboard'
import { Management } from './Management'
import { Sector } from './Sector'

import { DATABASE_SECTORS } from './constants'

import { createInitialText } from './utils/text'

import { SectorTypes } from './interfaces'

const file = new FileClass()

const Keyboard = new KeyboardClass()

export class SectorsManagement extends Management {
  add() {
    const name = Keyboard.read(createInitialText('Nome'))
    const employeesQuantity = Number(
      Keyboard.read(createInitialText('Quantidade de Funcionários'))
    )

    const newSector = new Sector({
      name,
      employeesQuantity,
      id: name.toLowerCase().replaceAll(' ', '-')
    })

    const currentSectors = file.readJSON(DATABASE_SECTORS)

    let newSectors = [newSector]
    if (currentSectors) {
      newSectors = [...currentSectors, newSector]
    }

    newSectors = newSectors.map(current => ({
      ...current,
      id: current.name.toLowerCase().replaceAll(' ', '-')
    }))
    file.write({ fileName: DATABASE_SECTORS, data: newSectors })
  }

  getSingleSector(sectorName: string) {
    const sectors = file.readJSON(DATABASE_SECTORS)

    const foundSector = sectors.find((currentSector: SectorTypes) => {
      if (
        currentSector.name.toLowerCase() === sectorName.toLowerCase().trim()
      ) {
        return currentSector
      }
    })

    return new Sector(foundSector)
  }

  list() {
    const sectors = file.readJSON(DATABASE_SECTORS)

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

  replaceOnFile(newSector: SectorTypes) {
    const currentSectorList = file.readJSON(DATABASE_SECTORS)

    const newSectorsList = currentSectorList.map((current: SectorTypes) => {
      if (current.id !== newSector.id) {
        return current
      }

      return newSector
    })

    file.write({ fileName: DATABASE_SECTORS, data: newSectorsList })
  }

  update() {
    const employeesManagement = new EmployeesManagementClass()

    this.list()

    const name = Keyboard.read(createInitialText('Nome do setor'))

    const sectorToUpdate = this.getSingleSector(name)

    const newName = Keyboard.read(createInitialText('Novo Nome'))

    const newEmployeesQuantity = Number(
      Keyboard.read(createInitialText('Nova Quant'))
    )

    employeesManagement.list()

    const managerName = Keyboard.read('Nome do Gerente: ')

    const newManager = employeesManagement.getSingleEmployee(managerName)

    const updatedSectorInstance = new Sector({
      ...sectorToUpdate,
      name: newName,
      employeesQuantity: newEmployeesQuantity,
      manager: newManager
    })

    this.replaceOnFile(updatedSectorInstance)
  }

  private deleteFromFile(sectorToDelete: SectorTypes) {
    const currentSectors = file.readJSON(DATABASE_SECTORS)

    const newSectorsList = currentSectors.filter((current: SectorTypes) => {
      if (current.id !== sectorToDelete.id) {
        return current
      }
    })

    file.write({ fileName: DATABASE_SECTORS, data: newSectorsList })
  }

  delete() {
    this.list()

    const sectorNameToDelete = Keyboard.read(
      createInitialText('Nome setor a deletar')
    )

    const sectorInstanceToDelete = this.getSingleSector(sectorNameToDelete)

    this.deleteFromFile(sectorInstanceToDelete)
  }
}
