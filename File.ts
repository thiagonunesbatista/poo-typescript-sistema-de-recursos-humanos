import fs from 'fs'

export class File {
  private readFromFile = (fileName: string) => {
    if (!fs.existsSync(fileName)) {
      return null
    }

    return fs.readFileSync(fileName, 'utf-8')
  }

  readJSON(fileName: string) {
    const readFile = this.readFromFile(fileName)

    if (!readFile) {
      return readFile
    }

    return JSON.parse(readFile)
  }

  write({ data, fileName }: { fileName: string; data: any }) {
    fs.writeFileSync(fileName, JSON.stringify(data))
  }
}
