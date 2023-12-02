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



  delete() {
    this.list();

    const roleNameToDelete = Keyboard.read(
      createInitialText('Nome do cargo da vaga a ser excluída')
    );

    const vacancyToDelete = this.getSingleVacancy(roleNameToDelete);

    if (!vacancyToDelete) {
      console.log('Vaga não encontrada.');
      return;
    }

    // Exibir informações sobre a vaga antes de excluir
    console.log('\nInformações da vaga a ser excluída:');
    console.log('-------------------------------------');
    console.log(`Cargo: ${vacancyToDelete.roleName}`);
    console.log(`Descrição: ${vacancyToDelete.description}`);
    console.log(`Quantidade: ${vacancyToDelete.quantity}\n`);

    const confirmDeletion = Keyboard.readNumber(
      createInitialText('Digite 1 para confirmar a exclusão ou 2 para cancelar')
    );

    if (confirmDeletion === 1) {
      const updatedVacancies = this.deleteVacancyFromFile(vacancyToDelete);
      console.log('Vaga excluída com sucesso.');
    } else {
      console.log('Exclusão cancelada.');
    }
  }

  private deleteVacancyFromFile(vacancyToDelete: VacancyType): VacancyType[] {
    const currentVacancyList = file.readJSON(DATABASE_VACANCIES);

    const updatedVacanciesList = currentVacancyList.filter(
      (current: VacancyType) => {
        return current.roleName !== vacancyToDelete.roleName;
      }
    );

    file.write({ fileName: DATABASE_VACANCIES, data: updatedVacanciesList });

    return updatedVacanciesList;
  }

  private getSingleVacancy(roleName: string): Vacancy | undefined {
    const vacanciesList = file.readJSON(DATABASE_VACANCIES);

    const foundVacancy = vacanciesList.find(
      (currentVacancy: VacancyType) => {
        return currentVacancy.roleName.toLowerCase() === roleName.toLowerCase().trim();
      }
    );

    return foundVacancy;
  } 
  
  update() {/* inicializada */}
}
