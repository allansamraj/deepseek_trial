import { apiClient } from './client'

export async function listDocuments() {
  return apiClient.get('/documents')
}

export async function getDocument(id) {
  return apiClient.get(`/documents/${id}`)
}

export async function uploadDocument(file) {
  const formData = new FormData()
  formData.append('file', file)
  return apiClient.upload('/documents/upload', formData)
}

export async function deleteDocument(id) {
  return apiClient.delete(`/documents/${id}`)
}

export default { listDocuments, getDocument, uploadDocument, deleteDocument }
