import fs from 'fs'

export const readFromFile = (fileName: string) => {
  const leitura = fs.readFileSync(fileName)
  // console.log(typeScriptChato)
}

export const writeToFile = ({
  data,
  fileName
}: {
  fileName: string
  data: any
}) => {
  console.log(JSON.stringify(data))

  fs.writeFileSync(fileName, JSON.stringify([data]))
}
