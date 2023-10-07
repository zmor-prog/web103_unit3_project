import express from 'express'
// Import data from DB
import rollerskateController from '../controllers/rollerskateController.js'

const EventRouter= express.Router()
EventRouter.get('/', rollerskateController.getEvents)
EventRouter.get('/:eventID',rollerskateController.getEventsById)
console.log('Router exported')
export default EventRouter