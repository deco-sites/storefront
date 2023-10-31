import type { Flex } from "deco/blocks/section.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  /** @title On Product Found */
  children: Flex;

  /** @title On Product Not Found */
  fallback: Flex;
}

function NotFoundChallenge({ page, children, fallback }: Props) {
  if (page === null) {
    return <fallback.Component {...fallback.props} />;
  }

  return <children.Component {...children.props} />;
}

export default NotFoundChallenge;
