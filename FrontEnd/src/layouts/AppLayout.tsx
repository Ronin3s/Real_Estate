
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar"; // عدّل المسار حسب مكان Navbar

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white dark:bg-[#111] text-gray-900 dark:text-white">
            <Navbar />
            <main className="mx-auto">{children}</main>
        </div>
    );
}
