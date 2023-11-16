import fs from 'fs'

export const readFromFile = (fileName: string) => {
  if (!fs.existsSync(fileName)) {
    return null
  }

  return fs.readFileSync(fileName, 'utf-8')
}

export const readJSON = (fileName: string) => {
  const readFile = readFromFile(fileName)

  if (!readFile) {
    return readFile
  }

  return JSON.parse(readFile)
}

export const writeToFile = ({
  data,
  fileName
}: {
  fileName: string
  data: any
}) => {
  console.log(JSON.stringify(data))

  fs.writeFileSync(fileName, JSON.stringify(data))
}
