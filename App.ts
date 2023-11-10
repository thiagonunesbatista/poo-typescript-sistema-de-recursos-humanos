import { Keyboard } from './utils/Keyboard'
import { readFromFile, writeToFile } from './utils/File'

import { Employee } from './Employee'
import { Benefit } from './Benefit'
import { ProgramMenu } from './ProgramMenu'

readFromFile('benefits.json')

const Menu = new ProgramMenu()

let isProgramExecuting = true

const addBenefit = () => {
  // const createInitialText = (param: string) => `Digite ${param}: `

  // const name = Keyboard(createInitialText('Nome'))
  // const value = Number(Keyboard(createInitialText('Valor')))
  // const description = Keyboard(createInitialText('Descrição'))

  // const newBenefit = new Benefit({ description, name, value })

  const newBenefit = new Benefit({
    description: 'Descrição legal',
    name: 'Nome Incrível',
    value: 999
  })

  writeToFile({ fileName: 'benefits.json', data: newBenefit })
}

const exitProgram = () => {
  isProgramExecuting = false
}

const hireEmployee = () => {
  const createInitialText = (param: string) => `Digite ${param}: `

  const name = Keyboard(createInitialText('nome'))
  const cpf = Keyboard(createInitialText('CPF'))
  const entryDate = new Date(Keyboard(createInitialText('Data de Entrada')))
  const salary = Number(Keyboard(createInitialText('Salário')))
  const cltNumber = Keyboard(createInitialText('Número CLT'))

  const newEmployee = new Employee({
    name,
    cpf,
    entryDate,
    salary,
    cltNumber
  })

  console.log(newEmployee)
}

while (isProgramExecuting) {
  Menu.show()

  const menuChosenOption = Menu.getChosenOption()

  switch (menuChosenOption) {
    case 0:
      hireEmployee()
      break
    case 1:
      addBenefit()
      break
    case 9:
      exitProgram()
      break

    default:
      break
  }
}
