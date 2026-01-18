import "./globals.css";

export const metadata = {
  title: "AI Dev Assistant",
  description: "Developer productivity assistant"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
