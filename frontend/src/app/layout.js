import "../app/globals.css";
import Header from "../components/header";

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
      <body suppressHydrationWarning={true}>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
