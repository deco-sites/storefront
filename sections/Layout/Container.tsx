import { Section } from "deco/blocks/section.ts";
import { context } from "deco/mod.ts";

interface Props {
  children?: Section;
}

function Placeholder() {
  return (
    <div class="rounded h-48 grid place-content-center w-full bg-base-100 text-base-300 text-sm">
      Content
    </div>
  );
}

function Container({ children }: Props) {
  if (!context.isDeploy && typeof children?.Component !== "function") {
    return (
      <div class="bg-primary bg-opacity-5 p-4">
        <Container children={{ Component: Placeholder, props: {} }} />
      </div>
    );
  }

  if (!children) {
    return null;
  }

  return (
    <div class="container">
      <children.Component {...children.props} />
    </div>
  );
}

export default Container;
