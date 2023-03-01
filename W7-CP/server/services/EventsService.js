import e from "express"
import { dbContext } from "../db/DbContext"
import { BadRequest, UnAuthorized } from "../utils/Errors"


class EventsService{
    async getAllEvents() {
        const events = await dbContext.Events.find()
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId)
        if(!event){
            throw new BadRequest("Invalid Event id")
        }
        return event
    }

    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        return event
    }

    async editEvent(eventId, userId, eventData) {
        let event = await this.getEventById(eventId)
        if(event.creatorId != userId){
            throw new BadRequest("You are not able to edit this event")
        }
        if(event.isCanceled){
            throw new BadRequest("You are no longer able to edit this event")
        }

        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        event.coverImg = eventData.coverImg || event.coverImg
        event.location = eventData.location || event.location
        event.capacity = eventData.capacity || event.capacity
        event.type = eventData.type || event.type
        event.startDate = eventData.startDate || event.startDate

        await event.save()
        return event
    }

    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)

        if(event.creatorId != userId){
            throw new BadRequest("You are not able to edit this event")
        }

        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }

    async checkCapacity(event) {
        if(event.capacity <= 0){
            throw new BadRequest("Unable to get a ticket due to MAX CAPACITY")
        }
        event.capacity -= 1
        await event.save()
        return event
    }

    async increaseCapacity(event) {
        event.capacity += 1
        await event.save()
        return event
    }

    async getAccountsConnectedToEvent(eventId) {
        const event = await dbContext.Tickets.find({eventId})  
        .populate('profile')
        if(!event){
            throw new BadRequest('Invalid event id')
        } 
        return event
    }

}

export const eventsService = new EventsService()