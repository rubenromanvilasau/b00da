import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Topbar from '@/components/layout/Topbar';
import { NextUIProvider } from "@nextui-org/react";


const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "DCA Simulator",
    description: "Simulate your DCA strategy",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <NextUIProvider>
                    <Topbar/>
                    {children}
                </NextUIProvider>
            </body>
        </html>
    );
}
