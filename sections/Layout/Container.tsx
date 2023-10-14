import { Section } from "deco/blocks/section.ts";

interface Props {
  children: Section;
}

function Container({ children }: Props) {
  return (
    <div class="container">
      <children.Component {...children.props} />
    </div>
  );
}

export default Container;
