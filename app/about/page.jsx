export const metadata = {
  title: "About Page",
  description: "This is the about page of our Next.js app.",
};

export default  async function AboutPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <div>Welcome to About Page</div>;
  
}
