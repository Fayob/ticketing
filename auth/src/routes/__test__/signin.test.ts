import request from 'supertest'
import { app } from '../../app'

it('fails when email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'rest@rest.com',
      password: 'password'
    })
    .expect(404)
  
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'rest@rest.com',
      password: 'password'
    })
    .expect(404)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'qwertyui'
    })
    .expect(404)
})

it('returns 200 when the signin details is correct', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  // const response = await request(app)
  //   .post('/api/users/signin')
  //   .send({
  //     email: 'test@test.com',
  //     password: 'password'
  //   })
  //   .expect(200)

  // expect(response.get('Set-Cookie')).toBeDefined()
})