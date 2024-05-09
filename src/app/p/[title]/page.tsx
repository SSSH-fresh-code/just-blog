import Link from "next/link";
import { PostItem } from "@sssh-fresh-code/types-sssh";
import { marked } from "marked";

async function getPost(title: string) {
  const req = await fetch(`http://localhost:3000/posts/${title}`, {
    method: "GET",
  });

  if (!req.ok) throw new Error("서버에서 에러가 발생했습니다.");

  return await req.json();
}

export default async function Page({
  params,
}: {
  params: {
    [key: string]: string | string[] | undefined
  },
}) {

  const title = params["title"];

  if (!title || typeof title !== "string") return (
    <div>
      <h1>무언가 오류가 생겼어요...해당 현상이 계속 된다면 제보해주세요.</h1>
      <p>제보 이메일 : limcdevblog@gmail.com</p>
    </div>
  )
  const data = await getPost(title) as PostItem;

  const contents = await marked.parse(data.contents);

  const { topic, series, author } = data;

  return (
    <main style={{ padding: "2em" }}>
      <center><h1>{data.title.replaceAll("_", " ")}</h1></center>
      <div dir="rtl">
        <small>주제 :</small> <Link href={`/t/${topic.name}`}>{topic.name}</Link>
        {series && <> | <small>시리즈 :</small> <Link href={`/s/${series.id}`}>{series.name}</Link></>}
        &nbsp;| {new Date().toLocaleDateString()}
        &nbsp;| {author.userName}
      </div>
      <article dangerouslySetInnerHTML={{ __html: contents }} />
    </main>
  )
}

