import { Section } from "deco/blocks/section.ts";
import { LayoutContext, useLayoutContext } from "$store/components/Layout.tsx";

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

function Section({ children }: Props) {
  const { isPreview } = useLayoutContext();

  if (isPreview && typeof children?.Component !== "function") {
    return (
      <div class="bg-primary bg-opacity-5 p-4">
        <Section children={{ Component: Placeholder, props: {} }} />
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

export function Preview(props: Props) {
  return (
    <LayoutContext.Provider value={{ isPreview: true }}>
      <Section {...props} />
    </LayoutContext.Provider>
  );
}

export default Section;
