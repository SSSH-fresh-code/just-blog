import Link from "next/link";
import { Page, TopicListItem } from "@sssh-fresh-code/types-sssh";
import Pagination from "~/components/Paging/Pagination";

async function getTopics(params: { [key: string]: string | string[] | undefined }) {
  const page = params["page"] || "1";

  const req = await fetch(`${process.env.API_URL}/topics?page=${page}`, {
    method: "GET",
  });

  if (!req.ok) throw new Error("서버에서 에러가 발생했습니다.");

  return await req.json();
}

export default async function TopicsPage({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {
  const { data, info } = await getTopics(searchParams) as Page<TopicListItem>;

  return (
    <main>
      <h3>▶ 주제 목록</h3>
      {
        data.map(t => (
          <section key={t.id} style={{ display: "flex", margin: "1rem 0" }} >
            <small style={{ paddingTop: "0.5rem" }}>{t.id}</small>&nbsp;&nbsp;&nbsp;
            <div style={{ color: "darkgray" }}>
              <Link href={`/t/${t.name}`}>
                <h2 style={{ margin: "0" }}>
                  {t.name.replaceAll("_", " ")}
                </h2>
              </Link>
            </div>
          </section>
        ))
      }
      <Pagination info={info} />
    </main>
  );
}
