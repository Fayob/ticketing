import express, { Request, Response} from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError, validateRequest } from '@fayobtickets/common'

import { User } from '../models/user'

const router = express.Router()

router.post('/api/users/signup', [
  body('email').isEmail().withMessage('email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
], validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body

  // if (!email || typeof email !== 'string') {
  //   res.status(400).send('Provide a valid email address')
  // }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new BadRequestError('Email already exists')
  }
  const user = User.build({ email, password })
  await user.save();

  // Generate JWT
  const userJWT = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_KEY!)

  // Store it on session object
  req.session = {
    jwt: userJWT
  }

  res.status(201).json(user);
})

export { router as signUpRouter }