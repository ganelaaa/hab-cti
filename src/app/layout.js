import "./globals.css";
import Navbar from "@/components/navbar.js";
import Footer from "@/components/footer.js";
import ScrollToTop from "@/components/scrollToTop.js";

export const metadata = {
  title: "US HAB-CTI",
  description: "Harmful Algal Bloom Control Technologies Incubator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>

      <body id="top" className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}