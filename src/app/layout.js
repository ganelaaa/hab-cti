import "./globals.css";
import Navbar from "@/components/navbar.js";
import Footer from "@/components/footer.js";

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
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
