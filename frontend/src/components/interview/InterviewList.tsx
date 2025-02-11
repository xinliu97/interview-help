import { useState } from 'react'
import { Search } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getInterviews, getCompanyInterviews } from '@/services/api'
import SEOHead from '@/components/seo/SEOHead'

const InterviewList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')

  const { data: interviews = [], isLoading, error } = useQuery({
    queryKey: ['interviews', searchQuery],
    queryFn: () => searchQuery ? getCompanyInterviews(searchQuery) : getInterviews(),
  })

  const seoTitle = searchQuery
    ? `${searchQuery} 面试经验 | 面试流程 | Interview Experience`
    : '公司面试经验分享 | 技术面试真题 | Interview Experiences'

  const seoDescription = searchQuery
    ? `${searchQuery}技术面试经验分享，包括面试流程、考察重点、真实案例分析。助你了解${searchQuery}的面试过程，提高面试通过率。`
    : '分享各大科技公司技术面试经验，包括面试流程、考察重点、真实案例分析。涵盖Google、Amazon、Microsoft等公司的面试真题。'

  const seoKeywords = [
    searchQuery && `${searchQuery} 面试`,
    searchQuery && `${searchQuery} 面经`,
    searchQuery && `${searchQuery} 面试流程`,
    '技术面试',
    '面试经验',
    '面试真题',
    'interview experience',
    'technical interview',
  ].filter(Boolean) as string[]

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        language={language}
      />
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={language === 'zh' ? '搜索公司' : 'Search company'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          >
            {language === 'zh' ? 'EN' : '中文'}
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            Error loading interviews. Please try again later.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <article key={interview.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{interview.company}</span>
                      <span className="text-sm font-normal text-gray-500">
                        {interview.position}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {language === 'zh' ? interview.content_zh : interview.content_en}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {interview.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default InterviewList
