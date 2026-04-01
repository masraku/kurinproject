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
  description: "Sebuah Surat untuk Kurin 🌸",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${mali.variable} ${nunito.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col scroll-gradient-bg"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 182, 208, 0.6) 0%, rgba(201, 160, 220, 0.4) 50%, rgba(255, 182, 208, 0.6) 100%), url('/assets/foto/background.png') center/cover fixed",
        }}
      >
        {children}
      </body>
    </html>
  );
}
