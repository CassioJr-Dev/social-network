import { hash, compare } from 'bcryptjs'

export class AdapterHashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 6)
  }

  async compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash)
  }
}
