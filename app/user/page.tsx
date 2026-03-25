"use client";

import { useState, useEffect } from "react";
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};
export default function User() {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (user.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <main>
      <h1>User List</h1>
      <ul>
        {user.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> ({item.username}) - {item.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
