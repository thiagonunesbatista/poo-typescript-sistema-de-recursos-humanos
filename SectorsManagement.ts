import { File as FileClass } from './File'
import { Keyboard as KeyboardClass } from './Keyboard'
import { Sector } from './Sector'

import { DATABASE_SECTORS } from './constants'

import { createInitialText } from './utils/text'

import { SectorTypes } from './interfaces'

const file = new FileClass()
const Keyboard = new KeyboardClass()

export class SectorsManagement {
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
}
