// import { DATABASE_BENEFITS } from './constants'

// import { BenefitTypes } from './interfaces'

// import { File as FileClass } from './File'
// import { Keyboard as KeyboardClass } from './Keyboard'

// import { Benefit } from './Benefit'

// const createInitialText = (param: string) => `Digite ${param}: `

// const File = new FileClass()
// const Keyboard = new KeyboardClass()
// export class RhManager {
//   EditBenefits() {
//     // Listar todos os beneficios
//     // A pessoas vai escolher 1 beneficio
//     // Vai adicionar todas as informações novamente
//     // mensagem: nome atual = ferias:
//     //digite o novo nome:
//     // Criar nova lista com o beneficio atualizado
//     // const novaListadeBeneficios = benefits.map(currentBenefit => {
//     //   if(currentBenefit.name !== editedBenefit) {
//     //     return currentBenefit
//     //   }
//     //   return editedBenefit
//     // })
//     // Escrevar lista de beneficios para o arquivo
//   }

//   addBenefit() {
//     const name = Keyboard.read(createInitialText('Nome'))
//     const value = Keyboard.readNumber(createInitialText('Valor'))
//     const description = Keyboard.read(createInitialText('Descrição'))

//     const newBenefit = new Benefit({ description, name, value })

//     const currentBenefits = File.readJSON(DATABASE_BENEFITS)

//     let newBenefits = [newBenefit]

//     if (currentBenefits) {
//       newBenefits = [...currentBenefits, newBenefit]
//     }

//     File.write({ fileName: DATABASE_BENEFITS, data: newBenefits })
//   }

//   listBenefits() {
//     const benefits = File.readJSON(DATABASE_BENEFITS)

//     if (!benefits) {
//       console.log('Não há beneficios cadastrados')
//       return
//     }

//     benefits.forEach((currentBenefit: BenefitTypes) => {
//       console.log(
//         `${currentBenefit.name} - ${Intl.NumberFormat('pt-BR', {
//           style: 'currency',
//           currency: 'BRL'
//         }).format(currentBenefit.value)}`
//       )
//     })
//   }

//   DeleteBenefits() {
//     const benefits = File.readJSON(DATABASE_BENEFITS)

//     if (!benefits) {
//       console.log('Não há benefícios cadastrados')
//       return
//     }

//     console.log('Benefícios Disponíveis:')
//     benefits.forEach((benefit: BenefitTypes, index: number) => {
//       console.log(`${index + 1}. ${benefit.name}`)
//     })

//     const choice = Keyboard.readNumber(
//       'Escolha o benefício para excluir (digite o número): '
//     )

//     if (isNaN(choice) || choice <= 0 || choice > benefits.length) {
//       console.log('Escolha inválida.')
//       return
//     }

//     const benefitToDelete: BenefitTypes = benefits[choice - 1]
//     const updatedBenefits = benefits.filter(
//       (benefit: BenefitTypes) => benefit.name !== benefitToDelete.name
//     )

//     File.write({ fileName: DATABASE_BENEFITS, data: updatedBenefits })
//     console.log(
//       `O benefício "${benefitToDelete.name}" foi excluído com sucesso.`
//     )
//   }
// }

export class BenefitsManagement {
  add() {}
  delete() {}
}
