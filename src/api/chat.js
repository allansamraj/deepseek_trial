import { apiClient } from './client'

export async function streamChat(message, history = []) {
  return apiClient.streamPost('/chat', { message, history })
}

export default { streamChat }
