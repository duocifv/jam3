'use client'
import { useAppStore } from '../store/app.store'

//const endpoint = 'https://api.duocnv.top'
const endpoint = 'https://api.duocnv.top'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH'
type Options = object
type Payload = string
type Body = {
  options?: Options
  headers?: HeadersInit
}

export const client = {
  // Generic method for handling different HTTP requests
  request: async (method: Method, payload: Payload, body: Body) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...body?.headers, // Add custom headers if passed
    }

    const res = await fetch(`${endpoint}/${payload}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method === 'GET' ? undefined : JSON.stringify(body?.options),
    })

    if (!res.ok) {
      //await client.handleError(res);
      throw new Error('Failed to fetch 401')
    }

    return await res.json()
  },

  // Helper function for error handling
  handleError: async (res: Response) => {
    if (res.status === 401) {
      window.location.href = '/auth/login'
      useAppStore.setState({ user: null, loggedIn: false })
      return
    }

    const errorData = await res.json()
    throw new Error(errorData.message || `API error with status: ${res.status}`)
  },

  // Specific method for GET requests
  get: (payload: Payload, body?: Body) => client.request('GET', payload, body),

  // Specific method for POST requests
  post: (payload: Payload, body?: Body) => client.request('POST', payload, body),

  // Specific method for PUT requests
  put: (payload: Payload, body?: Body) => client.request('PUT', payload, body),
}
