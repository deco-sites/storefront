import { Section } from "deco/blocks/section.ts";
import { useId } from "$store/sdk/useId.ts";

const animationClasses = {
  "fade-in": "animate-fade-in",
  "fade-in-bottom": "animate-fade-in-bottom",
  "slide-left": "animate-slide-left",
  "slide-right": "animate-slide-right",
  "zoom-in": "animate-zoom-in",
};

interface Children {
  label?: string;
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

function Animation(
  { children, animationType = "fade-in", duration = "0.3" }: Props,
) {
  const { section } = children;

  const { Component, props } = section;
  const id = useId();

  const animationClass = animationClasses[animationType];

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
        async={true}
        dangerouslySetInnerHTML={{
          __html: `
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("${animationClass}");
                            entry.target.classList.remove("opacity-0");
                            observer.disconnect();
                        }
                    });
                }, { threshold: 0.50 });
            
                var element = document.getElementById('${id}');
                observer.observe(element);
            `,
        }}
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
