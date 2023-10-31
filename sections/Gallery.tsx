import { Section } from "deco/blocks/section.ts";
import { LayoutContext } from "$store/components/Layout.tsx";

interface Props {
  children: Section;
}

function Section({ children: { Component, props } }: Props) {
  return (
    <>
      <Component {...props} />
    </>
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
