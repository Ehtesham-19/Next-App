"use client";

import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLoading } from "@/app/context/LoadingContext";

const Loader = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
    <style>{`
      @keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}
      @keyframes pulse {0%, 100% { opacity: 1; } 50% { opacity: 0.5; }}
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
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Loading Blog</h2>
      <p className="text-gray-600 mb-6">Please wait while we fetch the blog details...</p>
      <div className="flex justify-center gap-1">
        <div className="loader-dot w-2 h-2 bg-indigo-600 rounded-full" style={{ animationDelay: "0s" }}></div>
        <div className="loader-dot w-2 h-2 bg-blue-600 rounded-full" style={{ animationDelay: "0.3s" }}></div>
        <div className="loader-dot w-2 h-2 bg-indigo-600 rounded-full" style={{ animationDelay: "0.6s" }}></div>
      </div>
    </div>
  </div>
));
Loader.displayName = 'Loader';

export default function BlogDetail() {
  const params = useParams();
  const blogId = params.id;
  const { startLoading, stopLoading } = useLoading();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      startLoading();
      try {
        if (!blogId) return;

        const response = await fetch(`/api/blogs/${blogId}`, {
          next: { revalidate: 3600 }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId, startLoading, stopLoading]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-2xl p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-red-100 rounded-full p-6">
                <svg
                  className="w-16 h-16 text-red-500 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 4v2M8.228 4.228L6.464 2.464m5.304 0l1.764 1.764m5.304 0l1.764-1.764m-18.368 5.304L2.464 6.464m0 5.304l-1.764 1.764m0 5.304l1.764 1.764m5.304 0L4.228 19.772m10.608 0l-1.764 1.764"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{t.oops}</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href="/blog"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              {t.backToBlog}
            </Link>
          </div>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-xl">Blog not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-8 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blogs
        </Link>

        <div className="mb-8">
          <picture>
            <img
              src={
                blog.image || `https://picsum.photos/800/400?random=${blog.id}`
              }
              alt={blog.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </picture>
        </div>

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 text-sm">
            {blog.user_id && (
              <>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  By User: {blog.user_id?.substring(0, 8)}
                </span>
                <span>•</span>
              </>
            )}
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.5 2a1.5 1.5 0 00-1.5 1.5v13a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-13a1.5 1.5 0 00-1.5-1.5H5.5zm0 2a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v13a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V4z"
                  clipRule="evenodd"
                />
              </svg>
              Blog #{blog.id}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded mb-8"></div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
            <p className="text-xl mb-6">{blog.body}</p>

            <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
              <p className="text-gray-700 italic">
                This blog post provides comprehensive information about the
                topic. Feel free to explore other blogs and discover more
                interesting content on our platform.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                Blog Post
              </span>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Informative
              </span>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 flex gap-4">
            <Link
              href="/blog"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition text-center"
            >
              Read More Blogs
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 px-6 rounded-lg transition"
            >
              Go Back
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
