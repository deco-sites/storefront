import { signal } from "@preact/signals";

const currentPage = signal(1);
const loading = signal(false);

export const useShowMore = () => {
  return {
    currentPage,
    loading,
  };
};
