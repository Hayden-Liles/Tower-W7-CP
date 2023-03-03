import { AppState } from "../AppState"
import { api } from "./AxiosService"



class TicketsService{

    async shredTicket(ticketId){
        await api.delete(`/api/tickets/${ticketId}`)
        const ticketIndex = AppState.tickets.findIndex(e => e.id == ticketId)
        AppState.tickets.slice(ticketIndex, 1)
    }

}

export const ticketsService = new TicketsService()