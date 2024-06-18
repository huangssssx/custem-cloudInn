import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RantModal from "./components/modals/RantModal";
import SearchModal from "./components/modals/SearchModal"
import ToastProvider from "./providers/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";


const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aribnb",
  description: "Aribnb clone",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToastProvider></ToastProvider>
          <LoginModal></LoginModal>
          <RegisterModal></RegisterModal>
          <RantModal></RantModal>
          <Navbar currentUser={currentUser}></Navbar>
          <SearchModal></SearchModal>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
