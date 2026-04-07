# JSON Server Setup for Comments

This project uses JSON Server to persist comment data permanently to a `db.json` file.

## ✅ Installation

JSON Server has been installed globally. You can verify with:
```bash
json-server --version
```

## 🚀 Starting JSON Server

### Option 1: Using the Batch File (Windows)
```bash
start-json-server.bat
```

### Option 2: Using the Shell Script (Mac/Linux)
```bash
bash start-json-server.sh
```

### Option 3: Manual Command
```bash
json-server --watch db.json --port 3001
```

## 📝 Database Structure

The `db.json` file contains:
```json
{
  "comments": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "body": "Great blog post!",
      "createdAt": "2026-04-01T10:00:00.000Z"
    }
  ]
}
```

## 🔌 API Routes

Once JSON Server is running, your Next.js app will communicate with it:

### GET - Fetch all comments
```
GET http://localhost:3001/comments
```

### POST - Create a new comment
```
POST http://localhost:3001/comments
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your@email.com",
  "body": "Your comment text"
}
```

## 🔄 Workflow

1. **Start JSON Server:**
   ```bash
   start-json-server.bat
   ```
   (This terminal should keep running)

2. **In another terminal, start Next.js:**
   ```bash
   npm run dev
   ```

3. **Visit the profile page:**
   ```
   http://localhost:3000/about/profile
   ```

4. **Add and view comments** - All data persists in `db.json`

## 📁 File Structure
```
next-app/
├── db.json                    # Persistent JSON database
├── start-json-server.bat      # Windows starter script
├── start-json-server.sh       # Unix starter script
└── app/
    ├── api/
    │   └── comments/
    │       └── route.js       # API endpoints for comments
    └── about/
        └── profile/
            └── page.jsx       # Profile page with comments
```

## 💡 Important Notes

- **Two servers needed:** Keep JSON Server running on port 3001 while Next.js runs on port 3000
- **Data persistence:** All comments are automatically saved to `db.json`
- **Auto-generated IDs:** JSON Server automatically assigns IDs to new comments
- **CORS:** Make sure both servers are allowed to communicate (should work by default locally)

## 🛠️ Troubleshooting

### Port already in use
Change the port in the command:
```bash
json-server --watch db.json --port 3002
```
Then update `JSON_SERVER_URL` in `app/api/comments/route.js`

### JSON Server won't start
Make sure json-server is installed globally:
```bash
npm install -g json-server
```

### Comments not persisting
Check that `db.json` exists and JSON Server is running on port 3001

## 🎉 Done!

Your comments are now permanently stored in `db.json` and will persist between application restarts!
