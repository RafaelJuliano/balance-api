import { accountsRepository } from '../repositories'

export const execute = async (): Promise<void> => {
  await accountsRepository.resetTable()
}
