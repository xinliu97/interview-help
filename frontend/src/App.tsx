import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import InterviewList from './components/interview/InterviewList'
import ServiceList from './components/service/ServiceList'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="services" element={<ServiceList />} />
              <Route path="interviews" element={<InterviewList />} />
              <Route path="contact" element={
                <div className="max-w-2xl mx-auto space-y-6">
                  <h2 className="text-2xl font-bold">联系我们 / Contact Us</h2>
                  <p>Email: contact@example.com</p>
                  <p>WeChat: interview-help</p>
                </div>
              } />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
