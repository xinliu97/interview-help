import { ApiResponse } from './types'

// Get API URL based on environment configuration
const API_URL = (() => {
  const useProdApi = import.meta.env.VITE_USE_PROD_API === 'true'
  const devUrl = import.meta.env.VITE_API_URL
  const prodUrl = import.meta.env.VITE_PROD_API_URL

  if (useProdApi && !prodUrl) {
    console.warn('Production API URL not configured. Using development URL.')
    return devUrl || 'http://localhost:8000'
  }

  if (!devUrl && !useProdApi) {
    console.warn('Development API URL not configured. Using default localhost:8000')
    return 'http://localhost:8000'
  }

  return useProdApi ? prodUrl : devUrl
})()

export interface Interview {
  id: string
  company: string
  position: string
  content_zh: string
  content_en: string
  tags: string[]
  create_time: string
}

export interface Service {
  id: string
  name_zh: string
  name_en: string
  desc_zh: string
  desc_en: string
  price: string
}

export const getInterviews = async (): Promise<Interview[]> => {
  const response = await fetch(`${API_URL}/api/interviews`)
  if (!response.ok) throw new Error('Failed to fetch interviews')
  const data: ApiResponse<Interview[]> = await response.json()
  if (data.error) throw new Error(data.error)
  return data.data || []
}

export const getCompanyInterviews = async (company: string): Promise<Interview[]> => {
  const response = await fetch(`${API_URL}/api/interviews/${encodeURIComponent(company)}`)
  if (!response.ok) throw new Error('Failed to fetch company interviews')
  const data: ApiResponse<Interview[]> = await response.json()
  if (data.error) throw new Error(data.error)
  return data.data || []
}

export const getServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_URL}/api/services`)
  if (!response.ok) throw new Error('Failed to fetch services')
  const data: ApiResponse<Service[]> = await response.json()
  if (data.error) throw new Error(data.error)
  return data.data || []
}

export const createInterview = async (interview: Omit<Interview, 'id' | 'create_time'>): Promise<Interview> => {
  const response = await fetch(`${API_URL}/api/interviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(interview)
  })
  if (!response.ok) throw new Error('Failed to create interview')
  const data: ApiResponse<Interview> = await response.json()
  if (data.error) throw new Error(data.error)
  if (!data.data) throw new Error('No data returned from server')
  return data.data
}
