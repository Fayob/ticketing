import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
  res.send('SignOut successfully')
})

export { router as signOutRouter}