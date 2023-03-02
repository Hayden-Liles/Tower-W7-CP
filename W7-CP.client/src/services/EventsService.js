import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{
    async getAllEvents(){
        const events = await api.get('/api/events')
        AppState.events = events.data.map(e => new Event(e))
    }
}

export const eventsService = new EventsService()