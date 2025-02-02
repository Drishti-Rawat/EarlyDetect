import type { Metadata } from "next";
import "./globals.css";
import {Poppins} from 'next/font/google'
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CursorBeam from "@/components/shared/CursorBeam";


const poppins = Poppins({ subsets: ['latin'],weight:['400','500','600','700'],variable:'--font-poppins' })

export const metadata: Metadata = {
  title: "Cancer Detection AI",
  description: "cancerdetectionai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={`${poppins.variable}   antialiased`}
      >
        <Header/>
        <CursorBeam />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
