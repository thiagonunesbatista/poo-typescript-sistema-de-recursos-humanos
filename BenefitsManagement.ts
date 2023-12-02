import { Benefit } from './Benefit'
import { File as FileClass } from './File'
import { Keyboard as KeyboardClass } from './Keyboard'
import { Management } from './Management'
import { createInitialText } from './utils/text'
import { DATABASE_BENEFITS } from './constants'
import { BenefitTypes } from './interfaces'

const file = new FileClass()
const Keyboard = new KeyboardClass()

export class BenefitsManagement extends Management {
  update() {
    this.list();

    const benefitNameToEdit = Keyboard.read(
      createInitialText('Nome do benefício a ser modificado')
    );

    // Buscar o benefício escolhido na lista
    const benefitToEdit = this.getSingleBenefit(benefitNameToEdit);

    if (!benefitToEdit) {
      console.log('Benefício não encontrado.');
      return;
    }

    // Exibir valor atual do benefício
    console.log(`Valor atual do benefício ${benefitToEdit.name}: ${benefitToEdit.value}`);

    // Obter novo valor do usuário
    const newBenefitValue = Keyboard.readNumber(createInitialText('o novo valor do benefício'));

    // Criar um novo benefício com o valor atualizado
    const updatedBenefit: BenefitTypes = {
      ...benefitToEdit,
      value: newBenefitValue,
    };

    // Atualizar o valor do benefício na lista
    const updatedBenefitsList = this.updateBenefitInList(DATABASE_BENEFITS, benefitToEdit, updatedBenefit);

    // Escrever a lista de benefícios atualizada para o arquivo
    file.write({ fileName: DATABASE_BENEFITS, data: updatedBenefitsList });

    console.log(`Valor do benefício ${benefitToEdit.name} atualizado com sucesso!`);
  }

  // Método auxiliar para atualizar o benefício na lista
  private updateBenefitInList(benefitsFileName: string, oldBenefit: BenefitTypes, updatedBenefit: BenefitTypes): BenefitTypes[] {
    const currentBenefitsList = file.readJSON(benefitsFileName);

    if (!currentBenefitsList) {
      console.log('Lista de benefícios não encontrada.');
      return [];
    }

    const updatedBenefitsList = currentBenefitsList.map((currentBenefit: BenefitTypes) => {
      if (currentBenefit.name !== oldBenefit.name) {
        return currentBenefit;
      }

      return updatedBenefit;
    });

    return updatedBenefitsList;
  }

  // Método auxiliar para obter um benefício específico da lista
  private getSingleBenefit(benefitName: string): BenefitTypes | undefined {
    const benefitsList = file.readJSON(DATABASE_BENEFITS);

    const foundBenefit = benefitsList.find((currentBenefit: BenefitTypes) => {
      return currentBenefit.name.toLowerCase() === benefitName.toLowerCase().trim();
    });

    return foundBenefit;
  }

  add() {
    const name = Keyboard.read(createInitialText('Nome'))
    const value = Keyboard.readNumber(createInitialText('Valor'))
    const description = Keyboard.read(createInitialText('Descrição'))

    const newBenefit = new Benefit({ description, name, value })

    const currentBenefits = file.readJSON(DATABASE_BENEFITS)

    let newBenefits = [newBenefit]

    if (currentBenefits) {
      newBenefits = [...currentBenefits, newBenefit]
    }

    file.write({ fileName: DATABASE_BENEFITS, data: newBenefits })
  }

  list() {
    const benefits = file.readJSON(DATABASE_BENEFITS)

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

  delete() {
    const benefits = file.readJSON(DATABASE_BENEFITS)

     if (!benefits) {
       console.log('Não há benefícios cadastrados')
       return
     }

     console.log('Benefícios Disponíveis:')
     benefits.forEach((benefit: BenefitTypes, index: number) => {
       console.log(`${index + 1}. ${benefit.name}`)
     })

     const choice = Keyboard.readNumber(
       'Escolha o benefício para excluir (digite o número): '
     )

     if (isNaN(choice) || choice <= 0 || choice > benefits.length) {
       console.log('Escolha inválida.')
       return
     }

     const benefitToDelete: BenefitTypes = benefits[choice - 1]
     const updatedBenefits = benefits.filter(
       (benefit: BenefitTypes) => benefit.name !== benefitToDelete.name
     )

     file.write({ fileName: DATABASE_BENEFITS, data: updatedBenefits })
     console.log(
       `O benefício "${benefitToDelete.name}" foi excluído com sucesso.`
     )
   }
 }
 

   