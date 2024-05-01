import Link from "next/link";
import { PageInfoProps } from "./Pagination";

export function PageMoveBtn({ current, lastPage }: PageInfoProps) {
  return (
    <center>
      <div>
        {current !== 1 && <Link href={`page=${current - 1}`} >◀ </Link>}
        <span>
          {current} / {lastPage}
        </span>
        {current !== lastPage && <Link href={`page=${current + 1}`} > ▶</Link>}
      </div>
      <form>
        <input
          name="page"
          min={current}
          max={lastPage}
          placeholder={`${current}`}
          type="number" />
        <button type="submit">
          이동
        </button>
      </form>
    </center>
  );
}
