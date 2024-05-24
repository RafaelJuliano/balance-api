import { mocked } from 'jest-mock'
import { TransferBalanceEventDTO } from '../../dto/BalanceEvent'
import { execute } from '../transferUseCase'
import { execute as depositUseCase } from '../depositUseCase'
import { execute as withDrawUseCase } from '../withDrawUseCase'


jest.mock('../depositUseCase')
jest.mock('../withDrawUseCase')

describe('Transfer Use Case', () => {
  const mockedDepositUseCase = mocked(depositUseCase)
  const mockedWithDrawUseCase = mocked(withDrawUseCase)


  it('should withdraw from an existing account', async () => {
    const originAccount = { id: '100', balance: 10}
    const destinationAccount = { id: '300', balance: 30}

    mockedDepositUseCase.mockResolvedValueOnce({ destination: destinationAccount})
    mockedWithDrawUseCase.mockResolvedValueOnce({ origin: originAccount})
  
    const event: TransferBalanceEventDTO = {
      origin: originAccount.id,
      destination: destinationAccount.id,
      amount: 10,
    }

    expect(await execute(event)).toStrictEqual({ origin: originAccount, destination: destinationAccount })
    expect(mockedDepositUseCase).toBeCalledWith(event)
    expect(mockedWithDrawUseCase).toBeCalledWith(event)
  })
})
