import type {
  TransferBalanceEventDTO,
  TransferBalanceResponseDTO,
} from '../dto/BalanceEvent'
import { execute as depositUseCase } from './depositUseCase'
import { execute as withDrawUseCase } from './withDrawUseCase'

export const execute = async (
  withdrawEvent: TransferBalanceEventDTO,
): Promise<TransferBalanceResponseDTO> => {
  const { origin } = await withDrawUseCase(withdrawEvent)
  const { destination } = await depositUseCase(withdrawEvent)

  return {
    origin,
    destination,
  }
}
