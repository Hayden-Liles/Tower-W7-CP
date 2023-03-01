import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService";
import BaseController from "../utils/BaseController";


export class EventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
        .get('', this.getAllEvents)
        .get('/:eventId', this.getEventById)
        .get('/:eventId/tickets', this.getAccountsConnectedToEvent)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createEvent)
        .put('/:eventId', this.editEvent)
        .delete('/:eventId', this.cancelEvent)
    }
    async getAllEvents(req, res, next) {
        try {
            const events = await eventsService.getAllEvents()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const eventData = req.body
            const event = await eventsService.createEvent(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const eventData = req.body
            const event = await eventsService.editEvent(eventId, userId, eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, userId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getAccountsConnectedToEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const accountsConnected = await eventsService.getAccountsConnectedToEvent(eventId)
            return res.send(accountsConnected)
        } catch (error) {
            next(error)
        }
    }
}
