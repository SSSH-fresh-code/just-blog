"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const router = useRouter();
  return (
    <main>
      <h3>▶ 글 목록</h3>
      <section>
        <Link href="/p/1">
          <h1>
            <ins>
              <small>1</small>&nbsp;
              NestJS 토큰 기반 인증 구현하기
            </ins>
          </h1>
          <p>
            <small>
              모든 국민은 법률이 정하는 바에 의하여 납세의 의무를 진다. 모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다. 군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.
            </small>
          </p>
        </Link>
      </section>
    </main>
  );
}
