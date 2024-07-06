import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Mistry Message',
  description: 'Dive into anonymous messaging',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (    
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
