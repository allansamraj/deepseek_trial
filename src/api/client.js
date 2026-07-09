const BASE_URL = '/api'

class ApiClient {
  constructor() {
    this.baseUrl = BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Request failed' }))
        throw new Error(error.detail || `HTTP ${response.status}`)
      }

      return response
    } catch (error) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Make sure the backend is running.')
      }
      throw error
    }
  }

  async get(endpoint) {
    const response = await this.request(endpoint, { method: 'GET' })
    return response.json()
  }

  async post(endpoint, data) {
    const response = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response
  }

  async postJson(endpoint, data) {
    const response = await this.post(endpoint, data)
    return response.json()
  }

  async upload(endpoint, formData) {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Upload failed' }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async delete(endpoint) {
    const response = await this.request(endpoint, { method: 'DELETE' })
    return response.json()
  }

  streamPost(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient
