'use client'
import { useAppStore } from '../modules/shared/store/app.store'

// const endpoint = 'https://api.duocnv.top'
const endpoint = `http://localhost:3001`

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH'
type Options = object
type Payload = string
type Body = {
  options?: Options
  headers?: HeadersInit
  credentials?: boolean
}

export const client = {
  // Generic method for handling different HTTP requests
  request: async (method: Method, payload: Payload, body: Body) => {
    const token = useAppStore.getState().accessToken
    const res = await fetch(`${endpoint}/${payload}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...body?.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: method === 'GET' ? undefined : JSON.stringify(body?.options),
      credentials: body?.credentials ? 'include' : 'same-origin',
    })

    if (!res.ok) {
       client.handleError(res)
       throw new Error("Failed to fetch")
    }

    return await res.json()
  },

  // Helper function for error handling
  handleError: async (res: Response) => {
    if (res.status === 401) {
      useAppStore.setState({ accessToken: "" })
      return res.status
    }
    return res
  },

  // Specific method for GET requests
  get: (payload: Payload, body?: Body) => client.request('GET', payload, body),

  // Specific method for POST requests
  post: (payload: Payload, body?: Body) =>
    client.request('POST', payload, body),

  // Specific method for PUT requests
  put: (payload: Payload, body?: Body) => client.request('PUT', payload, body),
}
