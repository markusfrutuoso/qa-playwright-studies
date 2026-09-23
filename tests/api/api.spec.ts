import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  test('Simple API Test - Assert Response Status', async ({ request }) => {
    const response = await request.get('/users/3')

    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()
  })

  test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get('/users/999999')

    expect(response.status()).toBe(404)
  })

  test('GET Request - Get User Detail', async ({ request }) => {
    const response = await request.get('/users/1')
    const responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(1)
    expect(responseBody.firstName).toBe('Emily')
    expect(responseBody.lastName).toBe('Johnson')
    expect(responseBody.email).toBeTruthy()
  })

  test('POST Request - Create New User', async ({ request }) => {
    const response = await request.post('/users/add', {
      data: {
        firstName: 'Markus',
        lastName: 'Frutuoso',
        age: 25,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(201)
    expect(responseBody.id).toBeTruthy()
    expect(responseBody.firstName).toBe('Markus')
    expect(responseBody.lastName).toBe('Frutuoso')
  })

  test('POST Request - Login', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(responseBody.accessToken).toBeTruthy()
    expect(responseBody.refreshToken).toBeTruthy()
  })

  test('POST Request - Login Fail', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: {
        username: 'emilys',
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody.message).toBeTruthy()
  })

  test('PUT Request - Update User', async ({ request }) => {
    const response = await request.put('/users/2', {
      data: {
        firstName: 'New Name',
        age: 30,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(2)
    expect(responseBody.firstName).toBe('New Name')
    expect(responseBody.age).toBe(30)
  })

  test('DELETE Request - Delete User', async ({ request }) => {
    const response = await request.delete('/users/2')
    const responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(2)
    expect(responseBody.isDeleted).toBe(true)
    expect(responseBody.deletedOn).toBeTruthy()
  })
})
