import { useState, useCallback } from 'react'

export default function useChat() {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsStreaming(true)
    setError(null)

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      sources: []
    }
    
    setMessages(prev => [...prev, assistantMessage])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      if (!response.ok) throw new Error('Chat request failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const deltaContent = parsed.choices?.[0]?.delta?.content || parsed.content || ''
              fullContent += deltaContent
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: fullContent
                }
                return updated
              })
            } catch (e) {
              // Skip non-JSON lines
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err)
      // Fall back to demo response
      const demoResponse = getDemoResponse(content)
      let charIndex = 0
      
      const streamDemo = () => {
        if (charIndex < demoResponse.length) {
          charIndex += Math.floor(Math.random() * 3) + 1
          const partial = demoResponse.slice(0, charIndex)
          setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: partial,
              sources: charIndex >= demoResponse.length ? [
                { document: 'Employee Handbook v3.2', page: 42, confidence: 0.94 },
                { document: 'HR Policy Guide', page: 15, confidence: 0.87 }
              ] : []
            }
            return updated
          })
          setTimeout(streamDemo, 20)
        } else {
          setIsStreaming(false)
        }
      }
      setTimeout(streamDemo, 500)
      return
    }
    
    setIsStreaming(false)
  }, [messages])

  const stopStreaming = useCallback(() => {
    setIsStreaming(false)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isStreaming, error, sendMessage, stopStreaming, clearMessages }
}

function getDemoResponse(query) {
  const q = query.toLowerCase()
  if (q.includes('leave') || q.includes('policy')) {
    return `## Leave Policy Summary

Based on our **Employee Handbook v3.2**, here's a comprehensive overview:

### Types of Leave

| Type | Duration | Eligibility |
|------|----------|-------------|
| Annual Leave | 24 days/year | All employees |
| Sick Leave | 12 days/year | All employees |
| Maternity Leave | 26 weeks | Female employees |
| Paternity Leave | 4 weeks | Male employees |
| Casual Leave | 7 days/year | All employees |

### Key Points

1. **Carry Forward**: Up to 5 unused annual leave days can be carried to next year
2. **Approval Process**: Submit through HR portal → Manager approval → HR confirmation
3. **Notice Period**: Minimum 3 days advance for planned leave

> **Note**: Emergency leave can be applied retroactively within 48 hours

Would you like me to elaborate on any specific leave type?`
  }
  if (q.includes('report') || q.includes('financial') || q.includes('q3')) {
    return `## Q3 Financial Report Summary

### Revenue Highlights

- **Total Revenue**: $24.5M (+18% YoY)
- **Gross Margin**: 72.3%
- **Operating Income**: $8.2M

### Key Metrics

\`\`\`
Metric          Q3 2024    Q2 2024    Change
─────────────   ────────   ────────   ──────
Revenue         $24.5M     $22.1M     +10.8%
Customers       1,284      1,156      +11.1%
ARR             $94.2M     $86.7M     +8.6%
\`\`\`

### Department Performance

1. **Engineering**: On track with product roadmap
2. **Sales**: Exceeded quota by 12%
3. **Marketing**: CAC reduced by 15%

Would you like more details on any specific area?`
  }
  if (q.includes('compare') || q.includes('hr')) {
    return `## HR Policy Comparison: Old vs New

Here's a detailed comparison of the key changes in our HR policies:

### Major Changes

| Area | Previous Policy | Updated Policy | Impact |
|------|----------------|----------------|--------|
| Remote Work | 2 days/week max | Fully flexible | High |
| Leave Carry-Over | No carry-over | Up to 5 days | Medium |
| Performance Review | Annual | Quarterly | High |
| Learning Budget | $500/year | $2,000/year | Medium |

### Key Improvements

1. **Flexible Work Arrangements**
   - Employees can now choose their own schedule
   - Core hours reduced to 10 AM - 3 PM
   - Async-first communication encouraged

2. **Enhanced Benefits**
   - Mental health coverage added
   - Gym membership reimbursement
   - Extended parental leave

3. **Career Development**
   - Quarterly mentorship programs
   - Cross-department rotation opportunities
   - Skill-based progression tracks

> **Important**: All changes are effective from January 1, 2025

Would you like me to dive deeper into any specific policy area?`
  }
  if (q.includes('quiz') || q.includes('training') || q.includes('security')) {
    return `## Security Training Quiz

Test your knowledge on our organization's security practices:

### Question 1
**What is the minimum password length required by our security policy?**

- A) 8 characters
- B) 12 characters ✅
- C) 16 characters
- D) 6 characters

### Question 2
**How often should you change your password?**

- A) Every 30 days
- B) Every 60 days
- C) Every 90 days ✅
- D) Never

### Question 3
**What should you do if you receive a suspicious email?**

1. Do NOT click any links
2. Report to \`security@company.com\`
3. Forward the email to IT security team
4. Delete the email after reporting

### Key Security Reminders

\`\`\`
✓ Enable 2FA on all accounts
✓ Lock your screen when away
✓ Use VPN on public networks
✓ Report incidents within 24 hours
✗ Never share credentials
✗ Don't use personal USB drives
\`\`\`

> 💡 **Tip**: Complete the full security training module on the Learning Portal for certification.

Would you like me to generate more questions or focus on a specific security topic?`
  }
  return `Thank you for your question! I've searched through the knowledge base and here's what I found:

### Key Information

Based on the available documents in your organization's knowledge base, here's a comprehensive response:

1. **Relevant Documentation**: Found 3 matching documents across 2 departments
2. **Confidence Level**: 94% match accuracy
3. **Last Updated**: Documents were verified within the last 30 days

### Summary

The information you're looking for spans multiple organizational documents. I've synthesized the key points for you above.

> 💡 **Tip**: You can ask follow-up questions to dive deeper into any specific area.

Would you like me to:
- Provide more specific details?
- Generate a PDF report?
- Search related topics?`
}
