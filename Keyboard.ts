import Prompt from 'prompt-sync'

export class Keyboard {
  read(message: string) {
    const value = String(Prompt()(message))

    return value
  }
  readNumber(message: string) {
    const value = Number(this.read(message))

    return value
  }
}
