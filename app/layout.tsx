import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImportBsJS from "./components/ImportBsJS";
import Navbar from "./components/Navbar";
import Provider from "./context/Provider";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "АЖК   | ASFALT_NEW",
  description: "АЖК   | ASFALT_NEW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <StoreProvider>
        <Provider>
          <body className="custom-container">
            <ImportBsJS />
            <Navbar />
            {children}
          </body>
        </Provider>
      </StoreProvider>
    </html>
  );
}
