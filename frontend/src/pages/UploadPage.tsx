import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InterviewForm from '../components/interview/InterviewForm'
import { createInterview } from '../services/api'
import SEOHead from '../components/seo/SEOHead'
import type { Interview } from '../services/api'

const UploadPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (interview: Omit<Interview, 'id' | 'create_time'>) => {
    try {
      await createInterview(interview)
      navigate('/interviews')
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请重试')
    }
  }

  return (
    <>
      <SEOHead
        title="分享面试经验 | Share Interview Experience"
        description="分享你的面试经验，帮助其他求职者。Share your interview experience to help other job seekers."
        keywords={["面试经验", "面试真题", "技术面试", "面试准备", "interview experience", "technical interview", "interview preparation"]}
      />
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 text-red-600 bg-red-50 rounded">
            {error}
          </div>
        )}
        <InterviewForm onSubmit={handleSubmit} />
      </div>
    </>
  )
}

export default UploadPage
