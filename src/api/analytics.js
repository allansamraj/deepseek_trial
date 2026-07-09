import { apiClient } from './client'

export async function getDashboardStats() {
  return apiClient.get('/analytics/dashboard')
}

export async function getHealthStatus() {
  return apiClient.get('/health')
}

export async function getAiStatus() {
  return apiClient.get('/status')
}

export default { getDashboardStats, getHealthStatus, getAiStatus }
