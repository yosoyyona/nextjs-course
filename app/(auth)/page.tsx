import Link from "next/link";
import "@/lib/db";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl">Carrot Market</h1>
        <h2>Welcome to Carrot Market!</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-acount" className="primary-btn py-2.5 text-lg">Sign in</Link>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <Link href="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
