import { mocked } from 'jest-mock'
import { BalanceEventType, DepositBalanceEventDTO } from '../../dto/BalanceEvent'
import { execute } from '../depositUseCase'
import { accountsRepository } from '../../repositories'

jest.mock('../../repositories')

describe('Deposit Use Case', () => {
  const mockedGetAccount = mocked(accountsRepository.get)
  const mockedCreateAccount = mocked(accountsRepository.create)
  const mockedUpdateAccount = mocked(accountsRepository.update)

  it('should create a new account', async () => {
    const event: DepositBalanceEventDTO = {
      type: BalanceEventType.DEPOSIT,
      destination: '100',
      amount: 10,
    }

    expect(await execute(event)).toStrictEqual({
      destination: { id: event.destination, balance: event.amount },
    })
    expect(mockedGetAccount).toBeCalledWith(event.destination)
    expect(mockedCreateAccount).toBeCalledWith({
      id: event.destination,
      balance: event.amount,
    })
    expect(mockedUpdateAccount).toBeCalledTimes(0)
  })

  it('should updated an existing account balance', async () => {
    const account = { id: '100', balance: 10 }
    mockedGetAccount.mockResolvedValueOnce(account)
    const event: DepositBalanceEventDTO = {
      type: BalanceEventType.DEPOSIT,
      destination: account.id,
      amount: 10,
    }
    const updatedAccount = { id: account.id, balance: account.balance + event.amount }

    expect(await execute(event)).toStrictEqual({ destination: updatedAccount })
    expect(mockedGetAccount).toBeCalledWith(event.destination)
    expect(mockedCreateAccount).toBeCalledTimes(0)
    expect(mockedUpdateAccount).toBeCalledWith(updatedAccount)
  })
})
