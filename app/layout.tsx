import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/Footer";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Wood",
  description:
    "We offer an exciting and affordable range of bedroom, living and office furniture, sofa set, dining set, kitchen design, doors, wardrobes, flooring, home décor accessories and more to suit every style & space!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.variable} antialiased  min-h-screen flex flex-col`}>
         <TooltipProvider>
          <Header />  
          <main className="flex-1">{children}</main>
        </TooltipProvider>
        <Toaster />
   
      {/* <Footer /> */}
      </body>
    </html>
  );
}
