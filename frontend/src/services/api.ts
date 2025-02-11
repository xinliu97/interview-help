const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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
  return response.json()
}

export const getCompanyInterviews = async (company: string): Promise<Interview[]> => {
  const response = await fetch(`${API_URL}/api/interviews/${encodeURIComponent(company)}`)
  if (!response.ok) throw new Error('Failed to fetch company interviews')
  return response.json()
}

export const getServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_URL}/api/services`)
  if (!response.ok) throw new Error('Failed to fetch services')
  return response.json()
}
