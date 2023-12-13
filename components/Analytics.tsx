import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
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

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends AnalyticsEvent>({ event, id }: {
  event: E;
  id: string;
}) => (
  <Script>
    <script
      type="module"
      src={scriptAsDataURI(
        (id: string, event: AnalyticsEvent) => {
          const elem = document.getElementById(id);

          console.log(document.readyState);

          if (!elem) {
            return console.warn(
              `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
            );
          }

          elem.addEventListener("click", () => {
            window.DECO.events.dispatch(event);
          });
        },
        id,
        event,
      )}
    />
  </Script>
);

export const SendEventOnView = <E extends AnalyticsEvent>(
  { event, id }: { event: E; id: string },
) => (
  <script
    type="module"
    src={scriptAsDataURI(
      (id: string, event: E) => {
        const elem = document.getElementById(id);

        if (!elem) {
          return console.warn(
            `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
          );
        }

        const observer = new IntersectionObserver((items) => {
          for (const item of items) {
            if (!item.isIntersecting) continue;

            window.DECO.events.dispatch(event);
            observer.unobserve(elem);
          }
        });

        observer.observe(elem);
      },
      id,
      event,
    )}
  />
);
