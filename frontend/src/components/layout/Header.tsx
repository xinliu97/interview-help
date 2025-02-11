import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')

  const menuItems = [
    { zh: '主页', en: 'Home', href: '/' },
    { zh: '服务', en: 'Services', href: '/services' },
    { zh: '面试真题', en: 'Cases', href: '/interviews' },
    { zh: '联系我', en: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold">
              Interview Help
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {language === 'zh' ? item.zh : item.en}
              </a>
            ))}
            <Button
              variant="ghost"
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="ml-4"
            >
              {language === 'zh' ? 'EN' : '中文'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {language === 'zh' ? item.zh : item.en}
                </a>
              ))}
              <Button
                variant="ghost"
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="w-full text-left"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
