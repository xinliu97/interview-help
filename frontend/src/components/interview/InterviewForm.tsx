import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import type { Interview } from '../../services/api'

interface InterviewFormProps {
  onSubmit: (interview: Omit<Interview, 'id' | 'create_time'>) => Promise<void>
}

const InterviewForm = ({ onSubmit }: InterviewFormProps) => {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [contentZH, setContentZH] = useState('')
  const [contentEN, setContentEN] = useState('')
  const [tags, setTags] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({
        company,
        position,
        content_zh: contentZH,
        content_en: contentEN,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      })
      
      // Reset form
      setCompany('')
      setPosition('')
      setContentZH('')
      setContentEN('')
      setTags('')
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>分享面试经验 / Share Interview Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="company">公司 / Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="position">职位 / Position</Label>
            <Input
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="content-zh">面试经验（中文）</Label>
            <Textarea
              id="content-zh"
              value={contentZH}
              onChange={(e) => setContentZH(e.target.value)}
              required
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="content-en">Interview Experience (English)</Label>
            <Textarea
              id="content-en"
              value={contentEN}
              onChange={(e) => setContentEN(e.target.value)}
              required
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="tags">标签 / Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="algorithms, system design, behavioral"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '提交中...' : '提交 / Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default InterviewForm
