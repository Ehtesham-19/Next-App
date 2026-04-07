/**
 * GLOBAL LOADER - USAGE EXAMPLES
 * 
 * This file shows how to use the global loader in different scenarios
 */

// ============================================
// EXAMPLE 1: Basic Data Fetching
// ============================================
'use client'
// import { useLoading } from '@/app/context/LoadingContext'
import { useEffect } from 'react'

export function FetchExample() {
  const { startLoading, stopLoading } = useLoading()

  useEffect(() => {
    const fetchData = async () => {
      startLoading()
      try {
        const response = await fetch('/api/data')
        const data = await response.json()
        console.log('Data:', data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        stopLoading()
      }
    }

    fetchData()
  }, [startLoading, stopLoading])

  return <div>Data loaded...</div>
}

// ============================================
// EXAMPLE 2: Form Submission
// ============================================
'use client'
// import { useLoading } from '@/app/context/LoadingContext'
import { useState } from 'react'

export function FormSubmitExample() {
  const { startLoading, stopLoading } = useLoading()
  const [formData, setFormData] = useState({})

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    startLoading()
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      stopLoading()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  )
}

// ============================================
// EXAMPLE 3: Button Click Action
// ============================================
'use client'
// import { useLoading } from '@/app/context/LoadingContext'

export function ButtonActionExample() {
  const { startLoading, stopLoading } = useLoading()

  const handleClick = async () => {
    startLoading()
    try {
      // Simulate some async operation
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Action completed')
    } finally {
      stopLoading()
    }
  }

  return <button onClick={handleClick}>Click Me</button>
}

// ============================================
// EXAMPLE 4: Multiple Async Operations
// ============================================
'use client'
// import { useLoading } from '@/app/context/LoadingContext'

export function MultipleAsyncExample() {
  const { startLoading, stopLoading } = useLoading()

  const handleMultipleOperations = async () => {
    startLoading()
    try {
      const response1 = await fetch('/api/data1')
      const data1 = await response1.json()

      const response2 = await fetch('/api/data2')
      const data2 = await response2.json()

      console.log('All data loaded:', { data1, data2 })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      stopLoading()
    }
  }

  return <button onClick={handleMultipleOperations}>Load Multiple</button>
}

// ============================================
// EXAMPLE 5: With Error Handling and Toast
// ============================================
'use client'
import { useLoading } from '@/app/context/LoadingContext'
import { toast } from 'react-toastify'

export function WithToastExample() {
  const { startLoading, stopLoading } = useLoading()

  const handleAction = async () => {
    startLoading()
    try {
      const response = await fetch('/api/action')
      if (!response.ok) throw new Error('Request failed')

      const result = await response.json()
      toast.success('Action completed successfully!')
      return result
    } catch (error) {
      toast.error('Error: ' + error.message)
      throw error
    } finally {
      stopLoading()
    }
  }

  return <button onClick={handleAction}>Perform Action</button>
}

// ============================================
// BEST PRACTICES
// ============================================
/*
1. Always use try-finally to ensure stopLoading is called:
   startLoading()
   try {
     // your async code
   } finally {
     stopLoading() // ALWAYS called
   }

2. Put startLoading before async operations:
   startLoading()
   const response = await fetch(...)

3. Use with toast for better UX:
   try {
     // operation
   } catch (error) {
     toast.error(error.message)
   }

4. Works in any 'use client' component:
   'use client' // REQUIRED for useLoading hook

5. Global state means only one loader shown at a time

6. See GLOBAL_LOADER_SETUP.md for more details
*/
