import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{
    async getAllEvents(){
        const events = await api.get('/api/events')
        logger.log(events.data)
    }
}

export const eventsService = new EventsService()