import type { Section } from "deco/blocks/section.ts";
import type { VNode } from "../../constants.tsx";

interface Props {
  sections: Section[] | null;
}

function Sections({ sections }: Props): VNode[] | null {
  if (sections === null) {
    return null;
  }

  return sections.map(({ Component, props, id }) => <Component key={id} {...props} />);
}

export default Sections;
