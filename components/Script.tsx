import { useContext } from "preact/hooks";
import { ComponentChildren, createContext } from "preact";

export const SCRIPT_CONTEXT = createContext<ComponentChildren[]>([]);
export interface ScriptProps {
  children: ComponentChildren;
}

export const Script = ({ children }: ScriptProps) => {
  let context: ComponentChildren[];
  try {
    context = useContext(SCRIPT_CONTEXT);
  } catch (err) {
    throw new Error(
      "<Head> component is not supported in the browser, or during suspense renders.",
      { cause: err },
    );
  }

  context.push(children);
  return null;
};

export const RenderScripts = () => {
  const scripts = useContext(SCRIPT_CONTEXT);

  return (
    <>
      {/* @ts-expect-error template exists https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template */}
      <template id="scripts">{scripts}</template>
      <script
        dangerouslySetInnerHTML={{
          __html: `(${() => {
            addEventListener("load", () => {
              const template = document
                .getElementById(
                  "scripts",
                ) as HTMLTemplateElement | null;
              console.log(template?.content);
              template?.content
                ? document.body.append(...template.content.childNodes)
                : undefined;
            });
          }})()`,
        }}
      >
      </script>
    </>
  );
};
