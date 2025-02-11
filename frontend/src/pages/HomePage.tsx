import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SEOHead from '@/components/seo/SEOHead'

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="面试辅导 | 技术面试经验分享 | Interview Help"
        description="专业团队提供面试辅导、技术支持和求职建议。分享FAANG等知名公司面试经验，助你成功通过技术面试。"
        keywords={[
          '面试辅导',
          '技术面试',
          '面试经验',
          '面试流程',
          'interview coaching',
          'technical interview',
          'interview experience',
        ]}
      />
      
      <div className="space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Interview Help
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            专业团队为你提供面试辅导、技术支持和求职建议
            <br />
            Professional team providing interview coaching, technical support, and career advice
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <a href="/services">
                查看服务 / Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 py-12">
          <article className="text-center space-y-2">
            <h3 className="text-lg font-semibold">面试辅导 / Interview Coaching</h3>
            <p className="text-gray-600">一对一面试辅导，提升面试技巧</p>
          </article>
          <article className="text-center space-y-2">
            <h3 className="text-lg font-semibold">技术支持 / Technical Support</h3>
            <p className="text-gray-600">解答技术难题，指导项目开发</p>
          </article>
          <article className="text-center space-y-2">
            <h3 className="text-lg font-semibold">求职建议 / Career Advice</h3>
            <p className="text-gray-600">职业规划指导，简历优化建议</p>
          </article>
        </section>
      </div>
    </>
  )
}

export default HomePage
