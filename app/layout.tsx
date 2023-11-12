import "/app/globals.css";
import SupabaseListener from "app/components/supabase-listener";
import { CartProvider } from "app/context/store";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Toy Rental",
  description: "Toy Rental",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-custom-blue1">
            <SupabaseListener />
            <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-5">
              {children}
            </main>
            <footer className="py-5">
              <div className="text-center text-sm">
                Copyright © ALL rights reserved | Toy Rental
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
