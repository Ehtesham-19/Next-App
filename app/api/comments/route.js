const JSON_SERVER_URL = 'http://localhost:3001/comments'
const TIMEOUT = 5000

const fetchWithTimeout = (url, timeout = TIMEOUT) => {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ])
}

export async function GET(request) {
  try {
    const response = await fetchWithTimeout(JSON_SERVER_URL)
    
    if (!response.ok) throw new Error('Failed to fetch comments')

    const comments = await response.json()

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to load comments' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate the comment data
    if (!body.name || !body.email || !body.body) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create new comment object
    const newComment = {
      name: body.name,
      email: body.email,
      body: body.body,
      createdAt: new Date().toISOString(),
    }

    // Post to JSON server
    const response = await fetch(JSON_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })

    if (!response.ok) {
      throw new Error('Failed to save comment to JSON server')
    }

    const savedComment = await response.json()

    return new Response(JSON.stringify(savedComment), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
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
