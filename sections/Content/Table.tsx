/** @title {{{text}}} */
export interface Item {
  text: string;
}

/** @title {{{title}}} */
export interface SimpleText {
  title: string;
  /** @format textarea */
  items: Array<Item>;
}

export interface Props {
  title?: string;
  /** @format textarea */
  items?: Array<SimpleText>;
}

export default function SimpleTextList({
  title = "All features",
  items = [
    {
      title: "Compose and manage pages",
      items: [
        { text: "Page templates" },
        { text: "Ready-to-use sections" },
        { text: "Ready-to-use integrations" },
        { text: "Reusable blocks" },
        { text: "CMS" },
        { text: "AI assistant" },
        { text: "Themes" },
        { text: "Style editing" },
        { text: "Edge ingrastructure" },
      ],
    },
    {
      title: "Build a tailor made experience",
      items: [
        { text: "deco.cx dev tools" },
        { text: "Extensible sections" },
        { text: "Extensible integrations" },
        { text: "Extensible anything" },
      ],
    },
    {
      title: "Empower your digital experiences",
      items: [
        { text: "Page variantes for segments" },
        { text: "Campaigns" },
        { text: "Custom segments" },
        { text: "A/B tests" },
      ],
    },
    {
      title: "Learn and evolve from the results",
      items: [
        { text: "Track site's metrics" },
        { text: "Track blocks' performance" },
        { text: "Custom segments" },
        { text: "Integrate with analytics" },
      ],
    },
  ],
}: Props) {
  return (
    <div class="lg:container mx-8 md:mx-16 lg:mx-auto mb-8 lg:mb-20 pt-8 lg:border-t flex flex-col lg:flex-row gap-10 text-xl md:text-base">
      <h2 class="flex-none lg:w-56 font-bold pb-2 border-b lg:border-none">
        {title}
      </h2>
      <div class="flex-auto flex flex-col gap-8">
        {items.map((item) => {
          return (
            <div class="flex flex-col md:flex-row md:pb-8 lg:border-b gap-2 md:gap-4 lg:gap-16">
              <h3 class="flex-none font-bold md:w-2/5 lg:w-52">{item.title}</h3>
              <div
                class="flex-auto grid grid-cols-1 gap-x-10"
                style={{
                  gridTemplateColumns:
                    `repeat(${item.items.length}, minmax(0, 1fr))`,
                }}
              >
                {item.items.map((item) => {
                  return (
                    <div>
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
