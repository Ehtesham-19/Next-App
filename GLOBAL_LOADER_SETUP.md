# Global Loader System

A global loader that displays across your entire Next.js application during async operations.

## 📁 Files Created

```
app/
├── context/
│   └── LoadingContext.tsx      # Loading state context and hook
├── components/
│   └── GlobalLoader.tsx         # Global loader component
└── providers.tsx                # Updated with LoadingProvider
```

## 🚀 How To Use

### 1. Import the hook in any client component:

```tsx
'use client'

import { useLoading } from '@/app/context/LoadingContext'

export default function MyComponent() {
  const { isLoading, startLoading, stopLoading } = useLoading()

  const handleFetch = async () => {
    startLoading()
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      // Do something with data
    } finally {
      stopLoading()
    }
  }

  return (
    <button onClick={handleFetch}>
      Fetch Data
    </button>
  )
}
```

### 2. Use with API calls:

```tsx
'use client'

import { useLoading } from '@/app/context/LoadingContext'

export default function BlogList() {
  const { startLoading, stopLoading } = useLoading()

  const fetchBlogs = async () => {
    startLoading()
    try {
      const response = await fetch('/api/blogs')
      const blogs = await response.json()
      // Update state with blogs
    } catch (error) {
      console.error('Error:', error)
    } finally {
      stopLoading()
    }
  }

  return (
    <button onClick={fetchBlogs}>
      Load Blogs
    </button>
  )
}
```

### 3. Use with form submissions:

```tsx
'use client'

import { useLoading } from '@/app/context/LoadingContext'
import { useState } from 'react'

export default function CommentForm() {
  const { startLoading, stopLoading } = useLoading()
  const [formData, setFormData] = useState({ name: '', email: '', body: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    startLoading()
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setFormData({ name: '', email: '', body: '' })
      }
    } finally {
      stopLoading()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit">Submit</button>
    </form>
  )
}
```

## 🎨 Loader Features

- **Full-screen overlay** with semi-transparent backdrop
- **Animated spinner** with pulsing dots
- **Smooth animations** for loading state
- **Responsive design** works on all screen sizes
- **Non-intrusive** only shows when loading is active
- **Context-based** global state management

## 🔧 Loader Styling

The loader can be customized by editing [app/components/GlobalLoader.tsx](app/components/GlobalLoader.tsx):

```tsx
// Change colors
border-t-indigo-600 → border-t-red-600  // Change spinner color
bg-gradient-to-r from-indigo-500 to-blue-500  // Change gradient

// Change text
"Loading" → "Please wait..."  // Change loading text

// Change backdrop opacity
bg-black/40 → bg-black/70  // Make darker or lighter
```

## 📝 Hook API

```tsx
const { isLoading, startLoading, stopLoading } = useLoading()

// isLoading: boolean - current loading state
// startLoading: () => void - show the loader
// stopLoading: () => void - hide the loader
```

## ⚠️ Important Notes

- Must use in `'use client'` components
- Hook must be used within LoadingProvider (automatically set up in providers.tsx)
- Always call `stopLoading()` in a finally block to ensure it's called
- Works globally - only one loader shown at a time

## 🎯 Examples in Your App

### Profile Page with Comments
```tsx
// Already using the loader in app/about/profile/page.jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  startLoading()
  try {
    // Submit form
  } finally {
    stopLoading()
  }
}
```

### Blog Fetch
```tsx
// Add to blogs.jsx
useEffect(() => {
  const fetchBlogs = async () => {
    startLoading()
    try {
      // Fetch blogs
    } finally {
      stopLoading()
    }
  }
  fetchBlogs()
}, [])
```

## 🎉 Done!

Your app now has a global loader that shows during all async operations!
