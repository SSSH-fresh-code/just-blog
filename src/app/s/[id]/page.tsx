import { SeriseItem, TopicItem } from "@sssh-fresh-code/types-sssh";
import { ErrorPage } from "../../../components/Common/ErrorPage";
import Link from "next/link";

async function series(id: string) {
  const req = await fetch(`http://localhost:3000/series/${id}`, {
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
  const id = params["id"];

  if (!id || typeof id !== "string") return <ErrorPage />;

  let data: SeriseItem;

  try {
    data = await series(id);
  } catch (e) {
    return <ErrorPage />
  }

  return (
    <main style={{ padding: "2em" }}>
      <h1>{data.name.replaceAll("_", " ")}</h1>
      <ul>
        <li>주제 : <Link href={`/t/${data.topic.name}`}>{data.topic.name}</Link></li>
        <br />
        <li><Link href={`/p?series=${id}`} title="클릭하면 해당 시리즈로 쓰여진 게시글 목록으로 이동합니다." >해당 시리즈로 쓰여진 <b>게시글</b> 개수 : <b>{data.postsCnt}</b> 개</Link></li>
      </ul>
    </main>
  )
}