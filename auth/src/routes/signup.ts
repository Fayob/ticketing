import express, { Request, Response} from 'express'
import { body, validationResult } from 'express-validator'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'

const router = express.Router()

router.post('/api/users/signup', [
  body('email').isEmail().withMessage('email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }
  
  const { email, password } = req.body

  // if (!email || typeof email !== 'string') {
  //   res.status(400).send('Provide a valid email address')
  // }
  
  console.log('Creating User');
  throw new DatabaseConnectionError();
  

  res.send({})
})

export { router as signUpRouter }