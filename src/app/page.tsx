import PostPage from "./p/page";

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <main>
      <PostPage searchParams={searchParams} title="최근 올라온 글" />
    </main>
  );
}
