import type {
  DepositBalanceEventDTO,
  DepositBalanceResponseDTO,
} from '../dto/BalanceEvent'
import { accountsRepository } from '../repositories'

export const execute = async (
  depositEvent: DepositBalanceEventDTO,
): Promise<DepositBalanceResponseDTO> => {
  const { destination, amount } = depositEvent
  const account = {
    id: destination,
    balance: amount,
  }

  const existingAccount = await accountsRepository.get(depositEvent.destination)

  if (!existingAccount) {
    await accountsRepository.create(account)
  } else {
    account.balance = existingAccount.balance + amount
    await accountsRepository.update(account)
  }

  return { destination: account }
}
