import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getCurrentAccountsTickets)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getCurrentAccountsTickets(req, res, next) {
    try {
        const accountId = req.userInfo.id
        const accountsTickets = await ticketsService.getCurrentAccountsTickets(accountId)
        return res.send(accountsTickets)
    } catch (error) {
        next(error)
    }
}
}
