export default async function Author({ userId }: { userId: number }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const user = await response.json();

  return (
    <main>
      <div>
        <strong>Written By:</strong>
        <h4>{user.name}</h4>
      </div>
    </main>
  );
}
