import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{
    async getAllEvents(){
        const events = await api.get('/api/events')
        AppState.events = events.data.map(e => new Event(e))
    }

    async createEvent(formData){
        let newEvent = await api.post('/api/events', formData)
        newEvent = new Event(newEvent.data)
        AppState.events = [...AppState.events, newEvent]
        AppState.curEvent = newEvent
    }

    async getCurEvent(eventId){
        let curEvent = await api.get(`/api/events/${eventId}`)
        let Comments = await api.get(`/api/events/${eventId}/comments`)
        curEvent = new Event(curEvent.data)
        curEvent.comments = Comments.data
        AppState.curEvent = curEvent
    }

    async editEvent(formData, eventId){
        let curEvent = await api.put(`/api/events/${eventId}`, formData)
        let Comments = await api.get(`/api/events/${eventId}/comments`)
        curEvent = new Event(curEvent.data)
        curEvent.comments = Comments.data
        AppState.curEvent = curEvent
    }

    async cancelEvent(eventId){
        let curEvent = await api.delete(`/api/events/${eventId}`)
        let Comments = await api.get(`/api/events/${eventId}/comments`)
        curEvent = new Event(curEvent.data)
        curEvent.comments = Comments.data
        AppState.curEvent = curEvent
    }
}

export const eventsService = new EventsService()