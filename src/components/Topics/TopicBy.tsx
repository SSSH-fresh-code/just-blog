"use client";

import { Page, PostListItem } from "@sssh-fresh-code/types-sssh";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Posts } from "../Posts/Posts";

interface TopicByProps {
  name: string;
}

export default function TopicBy({ name }: TopicByProps) {
  const searchParams = useSearchParams()

  const [page, setPage] = useState<string>(searchParams.get("page") || "1")
  const [mode, setMode] = useState<0 | 1 | 2>(0);
  const [postPage, setPostPage] = useState<Page<PostListItem>>();

  useEffect(() => {
    if (mode === 2) {
      setPage(searchParams.get("page") || "1");
      fetch(`http://localhost:3000/posts?take=1&where__topicName=${name}&page=${page}`)
        .then(res => res.json())
        .then((data: Page<PostListItem>) => setPostPage(data))
        .catch(e => console.error(e));
    }
  }, [mode, page])

  return (
    <>
      <h3>▶ 해당 주제로 쓰인</h3>
      {page}
      <button onClick={() => setMode(1)}>시리즈 보기</button>&nbsp;&nbsp;&nbsp;
      <button onClick={() => setMode(2)}>게시글 보기</button>

      {
        mode === 2 && postPage && (
          <Posts posts={postPage.data} info={postPage.info} />
        )
      }
    </>
  )
}