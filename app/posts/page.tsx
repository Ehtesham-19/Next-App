import Author from "./authors";

type Posts = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
export default async function Posts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?limit=10&select=id,title,body",
  );
  const data = await response.json();
  return (
    <main>
      <h1>Posts List</h1>
      <ul>
        {data.map((item: Posts) => (
          <li key={item.id} className="mb-4">
            <div className="bg-blue-300">
              <p className="font-bold">{item.title}</p> - {item.body}
              <p>
                <Author userId={item.userId} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
