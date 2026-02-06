import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";


export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "700"], 
});




export const metadata: Metadata = {
  title: "Wood",
  description: "We offer an exciting and affordable range of bedroom, living and office furniture, sofa set, dining set, kitchen design, doors, wardrobes, flooring, home décor accessories and more to suit every style & space!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.variable} antialiased`}
      >
           <TooltipProvider>

        <Header />

        {children}
        <Toaster />
        {/* <Footer /> */}
           </TooltipProvider>
      </body>
    </html>
  );
}
