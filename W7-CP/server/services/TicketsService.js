import { dbContext } from "../db/DbContext"
import { eventsService } from '../services/EventsService'
import { BadRequest, UnAuthorized, Unexpected } from "../utils/Errors"


class TicketsService {
    async createTicket(ticketData) {
        const event = await (await eventsService.getEventById(ticketData.eventId))
        await eventsService.checkCapacity(event)

        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile')
        return ticket
    }

    async getCurrentAccountsTickets(accountId) {
        const tickets = dbContext.Tickets.find({accountId}).populate('event', 'name description coverImg location type isCanceled startDate')
        return tickets
    }

    async deleteTicket(ticketId, accountId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if(!ticket){
            throw new BadRequest("Invalid Ticket id")
        }
        if(ticket.accountId.toString() != accountId){
            throw new BadRequest("You are not Authorized to get rid of this Ticket!")
        }
        const ticketsEvent = await eventsService.getEventById(ticket.eventId)
        await eventsService.increaseCapacity(ticketsEvent)
        await ticket.delete()
        return ticket
    }

}

export const ticketsService = new TicketsService()