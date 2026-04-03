export async function GET(request) {
  try {
    // Sample comments data
    const comments = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        body: "Great blog post!",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        body: "Very informative, thanks for sharing.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        body: "Loved this content!",
        createdAt: new Date().toISOString(),
      },
    ];

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the comment data
    if (!body.name || !body.email || !body.body) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create new comment
    const newComment = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      body: body.body,
      createdAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(newComment), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
