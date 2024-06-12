export { default, loader } from "../../components/search/SearchResult.tsx";

export function LoadingFallback() {
  return (
    <div
      style={{ height: "100vh" }}
      class="flex justify-center items-center [view-transition-name:fallback]"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
