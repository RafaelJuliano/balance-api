import { mocked } from 'jest-mock'
import { accountsRepository } from '../../repositories'
import { execute } from '../getBalanceUseCase'
import { NotFoundException } from '@jftecnologia/lambda-utils'


jest.mock('../../repositories')

describe('Get Balance Use Case', () => {
    const mockedGetAccount = mocked(accountsRepository.get)

    it('should return the account balance', async ( ) => {
        const id = '100'
        const account = {
            id,
            balance: 10
        }
        mockedGetAccount.mockResolvedValueOnce(account)

        expect(await execute(id)).toBe(account.balance)
        expect(mockedGetAccount).toBeCalledWith(id)
    })

    it('should return NotFound if account does not exists', async () => {
        const id = '100'
        expect(execute(id)).rejects.toThrowError(NotFoundException)
        expect(mockedGetAccount).toBeCalledWith(id)
      })
})