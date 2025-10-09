import "./ui/global.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "./providers"; 


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PetAdopt - Adopción de Mascotas",
  description: "Encuentra a tu nuevo mejor amigo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`flex flex-col min-h-screen bg-white ${poppins.className}`}
      >
        <Providers>
          <Header />
          <main className="page-content flex-grow flex flex-col justify-center max-w-6xl mx-auto p-4">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
