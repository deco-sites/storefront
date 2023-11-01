import { Section } from "deco/blocks/section.ts";

interface Props {
  children?: Section;
}

function Container({ children }: Props) {
  if (!children) return null;

  return (
    <div class="container">
      <children.Component {...children.props} />
    </div>
  );
}

export function Preview(props: Props) {
  if (props.children) {
    return <Container {...props} />;
  }

  return (
    <div class="bg-primary bg-opacity-5 p-4">
      <Container
        {...props}
        children={{
          Component: () => (
            <div class="rounded h-48 grid place-content-center w-full bg-base-100 text-base-300 text-sm">
              Content
            </div>
          ),
          props: {},
        }}
      />
    </div>
  );
}

export default Container;
