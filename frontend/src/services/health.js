// frontend/src/services/topics.js
import api from './api'

export const checkHealth = async () => {
  const response = await api.get('/health') // Reenvía a /api/health por baseURL
  return response.data
}
