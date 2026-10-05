import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-gray-900">Streaming Demo</h1>
      <p className="mt-2 text-gray-600">
        ตัวอย่าง Zod Validation, Loading, Suspense, Skeleton, not-found และ Error
        ใน Next.js
      </p>

      <ul className="mt-6 list-disc space-y-2 pl-6 text-blue-700 underline">
        <li><Link href="/students">/students - จัดการนักศึกษา (CRUD + Zod)</Link></li>
        <li><Link href="/students/create">/students/create - ฟอร์มเพิ่มนักศึกษา</Link></li>
        <li><Link href="/blogs">/blogs - Loading / Suspense / Skeleton</Link></li>
        <li><Link href="/blogs/999">/blogs/999 - not-found</Link></li>
        <li><Link href="/skeleton">/skeleton - ตัวอย่าง Skeleton</Link></li>
      </ul>
    </main>
  );
}
