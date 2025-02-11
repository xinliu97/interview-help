import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getServices } from '@/services/api'
import type { Service } from '@/services/api'

const ServiceList = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const data = await getServices()
        setServices(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch services')
        setIsLoading(false)
      }
    }
    
    fetchServices()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading services. Please try again later.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
        >
          {language === 'zh' ? 'EN' : '中文'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>
                {language === 'zh' ? service.name_zh : service.name_en}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-gray-600 flex-1">
                {language === 'zh' ? service.desc_zh : service.desc_en}
              </p>
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium">{service.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ServiceList
