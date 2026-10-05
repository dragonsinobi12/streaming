# Streaming Demo (Next.js)

โปรเจกต์ตัวอย่างต่อยอดจากโปรเจกต์ [`it-nkc/crud`](https://github.com/it-nkc/crud) ตามเนื้อหาของ [`it-nkc/streaming`](https://github.com/it-nkc/streaming)
เพื่อเรียนรู้การตรวจสอบข้อมูลด้วย **Zod** และการจัดการสถานะหน้าเว็บใน Next.js (App Router) ได้แก่ **Loading, Suspense, Skeleton, not-found และ Error**

## เทคโนโลยีที่ใช้

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Prisma 7 + SQLite (`better-sqlite3`)
- Zod 4

## สิ่งที่ต้องมีก่อนติดตั้ง

- [Node.js](https://nodejs.org) เวอร์ชัน 20 ขึ้นไป
- npm (มากับ Node.js)
- Git / GitHub Desktop

## วิธีติดตั้ง

1. โคลนโปรเจกต์ (หรือใช้ GitHub Desktop: *File → Clone repository*)

   ```bash
   git clone https://github.com/<your-username>/streaming.git
   cd streaming
   ```

2. ติดตั้ง dependencies

   ```bash
   npm install
   ```

3. สร้าง Prisma Client

   ```bash
   npx prisma generate
   ```

4. ตรวจสอบไฟล์ `.env` ต้องมีค่าดังนี้ (มีอยู่แล้วในโปรเจกต์)

   ```env
   DATABASE_URL="file:./dev.db"
   ```

   ฐานข้อมูล SQLite ไฟล์ `dev.db` มีตาราง `Student` อยู่แล้ว หากต้องการสร้างใหม่ให้รัน

   ```bash
   npx prisma migrate deploy
   ```

5. รันโปรเจกต์

   ```bash
   npm run dev
   ```

   เปิดเบราว์เซอร์ที่ <http://localhost:3000>

คำสั่งอื่น ๆ: `npm run build` (build), `npm run start` (รันหลัง build), `npm run lint` (ตรวจโค้ด)

## วิธีใช้งานและหน้าต่าง ๆ

| URL | สิ่งที่แสดง |
| --- | --- |
| `/` | หน้าแรก มีลิงก์ไปทุกหน้า |
| `/students` | รายชื่อนักศึกษา เพิ่ม / แก้ไข / ลบ |
| `/students/create` | ฟอร์มเพิ่มนักศึกษา พร้อมตรวจสอบข้อมูลด้วย Zod |
| `/blogs` | รายการบทความ ใช้ Loading, Suspense และ Skeleton |
| `/blogs/1` | รายละเอียดบทความ |
| `/blogs/999` | ไม่พบบทความ แสดงหน้า `not-found` |
| `/skeleton` | ตัวอย่างหน้า Skeleton |

### 1. Zod Validation (`/students/create`)

- Schema อยู่ที่ `app/students/validation.ts`
- ฟอร์มอยู่ที่ `app/students/create/create-student-form.tsx` ใช้ `useActionState` แสดงข้อความ error ใต้ช่อง
- Server Action อยู่ที่ `app/students/create/page.tsx` ลำดับการทำงาน: `FormData → Zod → (ถูกต้อง) Prisma / (ไม่ถูกต้อง) แสดง Error`

ลองทดสอบ: ปล่อยช่องว่างแล้วกดบันทึก, ใส่ Email ผิดรูปแบบ, ใส่ชั้นปีมากกว่า 8, หรือใช้รหัสนักศึกษาซ้ำ

### 2. Loading และ Suspense (`/blogs`)

- `app/blogs/loading.tsx` แสดงข้อความ "กำลังโหลดรายการบทความ..." ทั้งหน้าระหว่างรอ
- `app/ui/blogs.tsx` ดึงข้อมูลจาก `https://api.vercel.app/blog` และมีการหน่วงเวลา 3 วินาที **เพื่อทดสอบเท่านั้น** (ลบบรรทัด `await new Promise(...)` ออกเมื่อใช้งานจริง)
- `app/ui/my-fallback.tsx` ใช้เป็น fallback ของ `<Suspense>` เมื่อต้องการโหลดเฉพาะส่วน

### 3. Skeleton

- `app/skeleton/page.tsx` ตัวอย่างการสร้าง Skeleton
- `app/ui/my-skeleton.tsx` มี `BlogCardSkeleton` และ `BlogListSkeleton` ที่ใช้เป็น fallback ของ `<Suspense>` ใน `app/blogs/page.tsx`

### 4. not-found

- `app/blogs/[id]/page.tsx` เรียก `notFound()` เมื่อไม่พบบทความ
- `app/blogs/not-found.tsx` เป็นหน้าที่แสดงเมื่อเกิดกรณีนี้ (ลองเปิด `/blogs/999`)

### 5. Error และ Global Error

- `app/blogs/error.tsx` จับ error เฉพาะในกลุ่ม `/blogs` (แสดงข้อความ `local error`)
- `app/global-error.tsx` จับ error ระดับ root layout (แสดงข้อความ `global error`)
- วิธีทดสอบ: เพิ่ม `throw new Error("test");` ไว้ในฟังก์ชัน `Blogs` หรือ `BlogPage` แล้วเปิด `/blogs`
  (ปกติ `global-error` จะเห็นผลเต็มรูปแบบเมื่อ build แบบ production)

## โครงสร้างโปรเจกต์

```
app/
├── blogs/
│   ├── [id]/page.tsx          # รายละเอียดบทความ + notFound()
│   ├── error.tsx              # local error
│   ├── loading.tsx            # loading ทั้งหน้า
│   ├── not-found.tsx          # หน้า 404 ของบทความ
│   └── page.tsx               # รายการบทความ + Suspense
├── skeleton/page.tsx
├── students/
│   ├── create/
│   │   ├── create-student-form.tsx
│   │   └── page.tsx           # Server Action + Zod
│   ├── edit/[id]/page.tsx
│   ├── actions.ts
│   ├── delete-button.tsx
│   ├── page.tsx
│   └── validation.ts          # Zod schema
├── ui/
│   ├── blogs.tsx
│   ├── my-fallback.tsx
│   └── my-skeleton.tsx
├── global-error.tsx
├── layout.tsx
└── page.tsx
prisma/                        # schema และ migrations
```
