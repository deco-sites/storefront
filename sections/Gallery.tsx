import { Section } from "deco/blocks/section.ts";

interface Props {
  children: Section;
}

function Gallery({ children: { Component, props } }: Props) {
  return (
    <>
      <Component {...props} />
    </>
  );
}

// TODO: Fix preview for components who have preview enabled
export function Preview({ children: { Component, props } }: Props) {
  return (
    <>
      <Component {...props} />
    </>
  );
}

export default Gallery;
