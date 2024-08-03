import "../app/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link
          className="rounded-full"
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/4212/4212474.png"
        />
      </head>
      <body suppressHydrationWarning={true} className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
