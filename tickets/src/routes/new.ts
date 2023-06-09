import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requestAuth, validateRequest } from '@fayobtickets/common'
import { Ticket } from '../model/tickets'

const router = express.Router()

router.post('/api/tickets', requestAuth, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero')
], validateRequest, async (req:Request, res:Response) => {
  const { title, price } = req.body

  const ticket = Ticket.build({
    title, price, userId: req.currentUser!.id
  })
  await ticket.save()
  
  res.status(200).send(ticket)
})

export { router as createTicketRouter }