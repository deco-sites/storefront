import Icon from "../../ui/Icon.tsx";

interface Props {
  currentPage: number;
  nextPageUrl?: string;
  prevPageUrl?: string;
}

function Pagination({
  currentPage,
  nextPageUrl,
  prevPageUrl,
}: Props) {
  return (
    <div class="join">
      {prevPageUrl && (
        <a
          rel="prev"
          aria-label="previous page link"
          href={prevPageUrl}
          disabled={!prevPageUrl}
          class="btn btn-ghost join-item"
        >
          <Icon id="chevron-right" class="rotate-180" />
        </a>
      )}
      <span class="btn btn-ghost join-item">
        Page {currentPage}
      </span>
      {nextPageUrl && (
        <a
          rel="next"
          aria-label="next page link"
          href={nextPageUrl ?? "#"}
          disabled={!nextPageUrl}
          class="btn btn-ghost join-item"
        >
          <Icon id="chevron-right" />
        </a>
      )}
    </div>
  );
}

export default Pagination;
