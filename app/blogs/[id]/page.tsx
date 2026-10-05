import { notFound } from "next/navigation";

interface Blog {
  id: string;
  title: string;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch("https://api.vercel.app/blog");
  const blogs: Blog[] = await res.json();

  const blog = blogs.find((x) => x.id == id);

  if (!blog) {
    notFound();
  }

  return (
    <main style={{ padding: "24px" }}>
      <h1>{blog.title}</h1>
    </main>
  );
}
