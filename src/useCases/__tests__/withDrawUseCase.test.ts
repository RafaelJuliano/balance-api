import { mocked } from 'jest-mock'
import { NotFoundException } from '@jftecnologia/lambda-utils'
import { BalanceEventType, WithdrawBalanceEventDTO } from '../../dto/BalanceEvent'
import { execute } from '../withDrawUseCase'
import { accountsRepository } from '../../repositories'

jest.mock('../../repositories')

describe('Withdraw Use Case', () => {
  const mockedGetAccount = mocked(accountsRepository.get)
  const mockedUpdateAccount = mocked(accountsRepository.update)


  it('should withdraw from an existing account', async () => {
    const account = { id: '100', balance: 20 }
    mockedGetAccount.mockResolvedValueOnce(account)
    const event: WithdrawBalanceEventDTO = {
      type: BalanceEventType.WITHDRAW,
      origin: account.id,
      amount: 10,
    }
    const updatedAccount = { id: account.id, balance: account.balance - event.amount }

    expect(await execute(event)).toStrictEqual({ origin: updatedAccount })
    expect(mockedGetAccount).toBeCalledWith(event.origin)
    expect(mockedUpdateAccount).toBeCalledWith(updatedAccount)
  })

  it('should return NotFound if account does not exists', async () => {
    const account = { id: '100', balance: 20 }
    const event: WithdrawBalanceEventDTO = {
      type: BalanceEventType.WITHDRAW,
      origin: account.id,
      amount: 10,
    }

    expect(execute(event)).rejects.toThrowError(NotFoundException)
    expect(mockedGetAccount).toBeCalledWith(event.origin)
    expect(mockedUpdateAccount).toBeCalledTimes(0)
  })
})
