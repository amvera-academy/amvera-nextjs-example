import "./styles.css";

export const metadata = { title: "Next.js на Amvera" };

export default function RootLayout({ children }) {
  return <html lang="ru"><body>{children}</body></html>;
}
