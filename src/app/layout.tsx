import "~/styles/globals.css";

import { Nanum_Gothic_Coding, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";

const inter = Nanum_Gothic_Coding({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400"
});

export const metadata = {
  title: "백엔드 개발자가 만든 개발 블로그",
  description: "남자는 백엔드제 ㅋㅋ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className={`font-sans ${inter.variable}`}>
        <header>
          <h1>백엔드 개발자가 만든 개발 블로그</h1>
          <nav>
            <Link href={"post"}><strong>주제</strong></Link>
            <Link href={"post"}><strong>시리즈</strong></Link>
            <Link href={"post"}><strong>글</strong></Link>
            <Link href={"post"}><strong>여긴 뭐임?</strong></Link>
          </nav>
          <hr />
        </header>
        {children}
      </body>
    </html>
  );
}
