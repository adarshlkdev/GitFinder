"use client"
import type { Metadata } from "next";
import { Inter  , Space_Mono , Outfit} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()



const inter = Space_Mono({
  subsets: ["latin"],
  weight: ["400" , "700"]
});

 const metadata: Metadata = {
  title: "GitFinder",
  description: "Explore Github users and repositories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
          </ThemeProvider>
        </body>
    </html>
  );
}
