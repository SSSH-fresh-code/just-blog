import { Page, PostListItem } from "@sssh-fresh-code/types-sssh";
import { Posts } from "../../components/Posts/Posts";

async function getPosts(params: { [key: string]: string | string[] | undefined }) {
  const page = params["page"] ? `page=${params["page"]}` : 'page=1';
  const topic = params["topic"] ? `where__topicName=${params["topic"]}` : '';
  const series = params["series"] ? `where__seriesId=${params["series"]}` : '';

  const querys = [page, topic, series].filter(q => q !== '');

  const req = await fetch(`${process.env.API_URL}/posts?${querys.join('&')}`, {
    method: "GET",
  });

  if (!req.ok) throw new Error("서버에서 에러가 발생했습니다.");

  return await req.json();
}

export default async function PostPage({
  searchParams,
  title = "▶ 글 목록"
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  },
  title?: string
}) {
  const { data, info } = await getPosts(searchParams) as Page<PostListItem>;

  const links = [];

  if (searchParams["series"] && typeof searchParams["series"] === "string") {
    links.push({ key: "series", value: searchParams["series"] })
    title = `▶ 해당 시리즈의 글 목록`
  } else if (searchParams["topic"] && typeof searchParams["topic"] === "string") {
    links.push({ key: "topic", value: searchParams["topic"] })
    title = `▶ ${searchParams["topic"]} 주제의 글 목록`
  };

  return (
    <main>
      <h3>{title}</h3>
      <Posts posts={data} info={info} links={links} />
    </main>
  );
}

