import { useScript } from "deco/hooks/useScript.ts";
import { Section } from "deco/blocks/section.ts";
import { useId } from "../../sdk/useId.ts";

interface Children {
  section: Section;
}

interface Props {
  animationType?:
    | "fade-in"
    | "fade-in-bottom"
    | "slide-left"
    | "slide-right"
    | "zoom-in";
  /**
   * @default 0.3
   */
  duration?: string;
  children: Children;
}

const snippet = (id: string) => {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("${animationClass}");
        entry.target.classList.remove("opacity-0");
        observer.disconnect();
      }
    });
  }, { threshold: 0.50 });

  const element = document.getElementById(id);
  element && observer.observe(element);
};

function Animation(
  { children, animationType = "fade-in", duration = "0.3" }: Props,
) {
  const { section } = children;

  const { Component, props } = section;
  const id = useId();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{ __html: animationByType[animationType] }}
      >
      </style>
      <div
        id={id}
        class="opacity-0"
        style={{ animationDuration: duration + "s" }}
      >
        <Component {...props} />
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(snippet, id) }}
      />
    </>
  );
}

export default Animation;

const animationByType = {
  "fade-in": `    
        @keyframes fade-in {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }   
        .animate-fade-in {
            animation: fade-in 1s ease-out;
        }
    `,
  "fade-in-bottom": `
        @keyframes fade-in-bottom {
            from {
                opacity: 0;
                -webkit-transform: translateY(50px);
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                -webkit-transform: translateY(0);
                transform: translateY(0);
            }
        }
        
        .animate-fade-in-bottom {
            animation: fade-in-bottom 1s ease-out;
        }
    `,
  "slide-left": `
        @keyframes slide-left {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }

        .animate-slide-left {
            animation: slide-left 1s ease-out;
        }
    `,
  "slide-right": `
        @keyframes slide-right {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(0);
            }
        }

        .animate-slide-right {
            animation: slide-right 1s ease-out;
        }
    `,
  "zoom-in": `
        @keyframes zoom-in {
            from {
                transform: scale(0);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        .animate-zoom-in {
            animation: zoom-in 1s ease-out;
        }
    `,
};

export function Preview() {
  const id = useId();

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{ __html: animationByType["slide-left"] }}
      >
      </style>
      <div
        id={id}
        class="flex justify-center items-center"
        style={{ animationDuration: "2s" }}
      >
        <h1 class="text-9xl text-base-content font-semibold my-8">Animation</h1>
      </div>
    </div>
  );
}
