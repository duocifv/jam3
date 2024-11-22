"use client"
import { useAppStore } from "../store/app.store"

const endpoint = 'https://api.duocnv.top'
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH'
type Options = object
type Payload = string


export const apiClient = async (
  method: Method,
  payload: Payload,
  options: Options = {}
) => {
  const res = await fetch(`${endpoint}/${payload}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method === 'GET' ? undefined : JSON.stringify(options),
    credentials: 'include',
  })

  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/auth/login'
      useAppStore.setState({ user: null, loggedIn: false })
      return
    }
    const errorData = await res.json()
    throw new Error(errorData.message || 'API error with status: ' + res.status)
  }
  const data = await res.json()
  return data
}

