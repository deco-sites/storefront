export const relative = (link?: string | undefined) => {
  const linkUrl = link ? new URL(link, "http://localhost") : undefined;
  const linkPath = linkUrl ? `${linkUrl.pathname}${linkUrl.search}` : undefined;
  return linkPath;
};

export const useUrlRebased = (overrides: string, base: string) => {
  const temp = new URL(overrides, base);
  const final = new URL(base);

  final.pathname = temp.pathname;

  for (const [key, value] of temp.searchParams.entries()) {
    final.searchParams.set(key, value);
  }

  return final.href;
};
