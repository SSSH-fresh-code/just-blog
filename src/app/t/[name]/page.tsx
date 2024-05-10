import { TopicItem } from "@sssh-fresh-code/types-sssh";
import { ErrorPage } from "../../../components/Common/ErrorPage";
import Link from "next/link";

async function getTopics(name: string) {
  const req = await fetch(`${process.env.API_URL}/topics/${name}`, {
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

  const name = params["name"];

  if (!name || typeof name !== "string") return <ErrorPage />;

  let data: TopicItem;

  try {
    data = await getTopics(name) as TopicItem;
  } catch (e) {
    return <ErrorPage />
  }

  return (
    <main style={{ padding: "2em" }}>
      <h1>{data.name.replaceAll("_", " ")}</h1>
      <ul>
        <li><Link href={`/s?topic=${name}`} title="클릭하면 해당 주제로 쓰여진 시리즈 목록으로 이동합니다." >해당 주제로 쓰여진 <b>시리즈</b> 개수 : <b>{data.seriesCnt}</b> 개</Link></li>
        <br />
        <li><Link href={`/p?topic=${name}`} title="클릭하면 해당 주제로 쓰여진 게시글 목록으로 이동합니다." >해당 주제로 쓰여진 <b>게시글</b> 개수 : <b>{data.postsCnt}</b> 개</Link></li>
      </ul>
    </main>
  )
}