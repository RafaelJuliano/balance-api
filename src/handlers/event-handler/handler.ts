import { APIGatewayProxyEventV2 } from 'aws-lambda'
import {
  httpMidiffy,
  Response,
  validateBody,
  NotFoundException,
} from '@jftecnologia/lambda-utils'
import { execute as depositUseCase } from '../../useCases/depositUseCase'
import { execute as withdrawUseCase } from '../../useCases/withDrawUseCase'
import { execute as transferUseCase } from '../../useCases/transferUseCase'
import { balanceEventSchema } from './schema'
import {
  BalanceEventType,
  DepositBalanceEventDTO,
  TransferBalanceEventDTO,
  WithdrawBalanceEventDTO,
} from '../../dto/BalanceEvent'

const handler = async (event: APIGatewayProxyEventV2) => {
  const body = balanceEventSchema.cast(event.body || {})

  const eventHandlers = {
    [BalanceEventType.DEPOSIT]: depositUseCase,
    [BalanceEventType.WITHDRAW]: withdrawUseCase,
    [BalanceEventType.TRANSFER]: transferUseCase,
  }

  try {
    const response = await eventHandlers[body.type](
      body as DepositBalanceEventDTO & WithdrawBalanceEventDTO & TransferBalanceEventDTO,
    )

    return Response.created(response)
  } catch (error) {
    if (error instanceof NotFoundException) {
      return {
        statusCode: 404,
        body: 0,
      }
    }
    throw error
  }
}

export const main = httpMidiffy(handler).use(validateBody(balanceEventSchema))
