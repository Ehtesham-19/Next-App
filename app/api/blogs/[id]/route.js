export async function GET(request, { params }) {
  try {
    // Handle params which might be a Promise
    const resolvedParams = await Promise.resolve(params)
    const { id } = resolvedParams
    
    console.log('🔍 API: Fetching blog with ID:', id)
    
    const response = await fetch('https://jsonfakery.com/blogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch blogs from external API' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    const blogsArray = Array.isArray(data) ? data : data.blogs || data.data || []
    
    console.log('📋 Total blogs fetched:', blogsArray.length)
    console.log('🔎 Searching for blog ID:', id)
    console.log('📝 First 3 blog IDs:', blogsArray.slice(0, 3).map(b => b.id))
    
    // Find blog by ID (UUID)
    const blog = blogsArray.find((b) => String(b.id) === String(id))
    
    if (!blog) {
      console.log('❌ Blog not found with ID:', id)
      return new Response(
        JSON.stringify({ error: 'Blog not found', searchId: id }), 
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('✅ Blog found:', blog.title)
    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
