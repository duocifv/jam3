const endpoint = 'http://localhost:3001'
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH'

export const apiClient = async (
  method: Method,
  payload: Payload,
  options: Options = {}
) => {
  try {
    const res = await fetch(`${endpoint}/${payload}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'GET' ? undefined : JSON.stringify(options),
      credentials: 'include',
    })

    if (!res.ok) {
      const result: TError = {
        error: {
          status: res.status,
          message: res.statusText,
        },
      }
      return result
    }
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}

type Options = object
type Payload = string
type TError = {
  error: {
    status: number
    message: string
  }
}
