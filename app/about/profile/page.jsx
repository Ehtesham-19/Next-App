

// import React, { useState, useEffect, memo, useCallback } from "react";
// import { toast } from "react-toastify";
// import { useLoading } from "@/app/context/LoadingContext";

// const CommentCard = memo(({ comment }) => (
//   <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
//     <div className="flex items-start justify-between mb-3">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900">{comment.name}</h3>
//         <p className="text-sm text-gray-500">{comment.email}</p>
//       </div>
//       <span className="text-xs text-gray-400">
//         {comment.createdAt
//           ? new Date(comment.createdAt).toLocaleDateString()
//           : "Just now"}
//       </span>
//     </div>
//     <p className="text-gray-700 leading-relaxed">{comment.body}</p>
//   </div>
// ))
// CommentCard.displayName = 'CommentCard'

// export default function ProfilePage() {
//   const { startLoading, stopLoading } = useLoading();
//   const [comments, setComments] = useState([]);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     body: "",
//   });

//   // Fetch comments once on mount
//   useEffect(() => {
//     const fetchComments = async () => {
//       startLoading();
//       try {
//         const response = await fetch("/api/comments", {
//           next: { revalidate: 60 }
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch comments");
//         }
//         const data = await response.json();
//         setComments(Array.isArray(data) ? data : []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         stopLoading();
//       }
//     };

//     fetchComments();
//   }, [startLoading, stopLoading]);

//   // Memoized input handler
//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }, []);

//   // Optimized form submission
//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();

//     if (
//       !formData.name.trim() ||
//       !formData.email.trim() ||
//       !formData.body.trim()
//     ) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     startLoading();
//     try {
//       const response = await fetch("/api/comments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit comment");
//       }

//       const newComment = await response.json();
//       setComments([newComment, ...comments]);
//       setFormData({ name: "", email: "", body: "" });
//       toast.success("Comment added successfully!");
//     } catch (err) {
//       toast.error("Error adding comment: " + err.message);
//     } finally {
//       stopLoading();
//     }
//   }, [formData, comments, startLoading, stopLoading])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-4xl mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-3">
//             Welcome to Your Profile
//           </h1>
//           <p className="text-gray-600 text-lg">
//             View and manage comments from the community
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             Leave a Comment
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 transition"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 transition"
//                 required
//               />
//             </div>
//             <textarea
//               name="body"
//               placeholder="Write your comment..."
//               value={formData.body}
//               onChange={handleInputChange}
//               rows="4"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 transition resize-none"
//               required
//             ></textarea>
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition"
//             >
//               Post Comment
//             </button>
//           </form>
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             Comments ({comments.length})
//           </h2>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
//               Error: {error}
//             </div>
//           )}

//           {comments.length === 0 && (
//             <div className="bg-gray-100 rounded-xl p-8 text-center">
//               <p className="text-gray-600 text-lg">
//                 No comments yet. Be the first to comment!
//               </p>
//             </div>
//           )}

//           <div className="space-y-4">
//             {comments.map((comment) => (
//               <CommentCard key={comment.id} comment={comment} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

