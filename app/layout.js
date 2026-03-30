import { Mali, Nunito } from "next/font/google";
import "./globals.css";

const mali = Mali({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mali",
});

const nunito = Nunito({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "For You 🌸",
  description: "Sebuah ucapan manis untuk idol kesayangan",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${mali.variable} ${nunito.variable} h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col"
        style={{
          background: "linear-gradient(rgba(255, 182, 208, 0.5), rgba(255, 182, 208, 0.5)), url('/assets/foto/background.png') center/cover fixed"
        }}
      >
        {children}
      </body>
    </html>
  );
}
