'use client'

import React, { useState, useEffect, useMemo, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLoading } from '@/app/context/LoadingContext'

const BlogCard = memo(({ blog }) => (
  <Link href={`/blog/${blog.id}`}>
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
      <Image
        src={blog.image || `https://picsum.photos/400/250?random=${blog.id}`}
        alt={blog.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.body}</p>
        <div className="text-sm text-gray-500">
          {blog.user_id && <span>By User: {blog.user_id?.substring(0, 8)}</span>}
        </div>
      </div>
    </div>
  </Link>
))
BlogCard.displayName = 'BlogCard'

function Blogs() {
  const { startLoading, stopLoading } = useLoading()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const blogsPerPage = 20

  // Debounce search - reduces API/filter calls significantly
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Fetch blogs once on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        startLoading()
        const response = await fetch('/api/blogs', {
          next: { revalidate: 3600 }
        })
        if (!response.ok) throw new Error('Failed to fetch blogs')
        const data = await response.json()
        setBlogs(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
        stopLoading()
      }
    }

    fetchBlogs()
  }, [startLoading, stopLoading])

  // Memoized filtering prevents recalculation on every render
  const filteredBlogs = useMemo(() => {
    if (!debouncedSearch) return blogs
    return blogs.filter((blog) => {
      const searchLower = debouncedSearch.toLowerCase()
      return (
        blog.title.toLowerCase().includes(searchLower) ||
        blog.body.toLowerCase().includes(searchLower) ||
        blog.summary?.toLowerCase().includes(searchLower)
      )
    })
  }, [blogs, debouncedSearch])

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
          .loader-spinner { animation: spin 3s linear infinite; }
          .loader-dot { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        `}</style>
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-20 blur-lg"></div>
              <div className="absolute inset-0 loader-spinner">
                <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-indigo-600 border-r-blue-500"></div>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Loading Blogs</h2>
          <p className="text-gray-600 mb-6">Please wait while we fetch amazing blogs for you...</p>
          <div className="flex justify-center gap-1">
            <div className="loader-dot w-2 h-2 bg-indigo-600 rounded-full" style={{ animationDelay: '0s' }}></div>
            <div className="loader-dot w-2 h-2 bg-blue-600 rounded-full" style={{ animationDelay: '0.3s' }}></div>
            <div className="loader-dot w-2 h-2 bg-indigo-600 rounded-full" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>

  return (
    <div className="p-8 w-full bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 transition text-lg"
          />
          <svg
            className="absolute right-4 top-3.5 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* No Results Message */}
      {filteredBlogs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-xl">No blogs found matching your search</p>
        </div>
      )}

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredBlogs.length > 0 && (
        <div className="mt-12 flex justify-center items-center gap-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            title="Previous page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-gray-700 font-semibold text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            title="Next page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default Blogs
