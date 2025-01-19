import Navbar from "@/components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar/>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Welcome to TestAI, Your own AI Test generator!</h1>
        <p className="text-gray-600 mt-4">Automate your API endpoint testing with ease.</p>
      </main>
      
    </div>
  );
}
