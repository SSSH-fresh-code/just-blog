import { marked } from "marked";

async function getData() {
  const req = await fetch("http://localhost:3001/post.txt", {
    method: "GET",
    "headers": {
      "Content-type": "plain/text"
    }
  });

  if (!req.ok) return "<p>Bad Request</p>";

  return await req.text();
}

export default async function Page() {
  const data = await getData();
  const contents = await marked.parse(data);

  return (
    <main>
      <h1>NestJS 토큰 기반 인증 구현하기</h1>
      <p dir="rtl">
        <small>
          Javascript, NestJS | {new Date().toLocaleDateString()} | 임대성
        </small>
      </p>
      <article dangerouslySetInnerHTML={{ __html: contents }} />
    </main>
  )
}

