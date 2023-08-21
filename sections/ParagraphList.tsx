import type { HTML } from "deco-sites/std/components/HTMLRenderer.tsx";

/** @title {{{title}}} */
export interface Paragraph {
    title: string;
    text: HTML;
}

export interface Props {
    title?: string;
    items?: Array<Paragraph>;
}

export default function ParagraphList({
    title = "Main Features",
    items = [
        {
            title: "Easy to use page builder",
            text: "Design high-converting shopping experiences with a powerful, visual builder. Your business team with the autonomy to modify components without writing a single line of code.",
        }, {
            title: "Create A/B tests in 5 secs",
            text: "No complicated set-up here, simply select a page or section you want to test ideas on, and get testing! Try experimenting with different headlines, sales copy, or product descriptions and quickly learn which idea converts the best.",
        }, {
            title: "Craft unique experiences",
            text: "Conversion-driven storefronts that are optimized for each audience, increasing engagement and conversion rates.",
        }, {
            title: "Analyze your data",
            text: "Integrated real-time analytics to identify the greatest opportunities to boost conversions.",
        }
    ]
}: Props) {
    return (
        <div class="lg:container mx-8 md:mx-16 lg:mx-auto mb-8 lg:mb-20 pt-8 lg:border-t flex flex-col lg:flex-row gap-10 text-xl md:text-base">
            <h2 class="flex-none lg:w-56 font-bold pb-2 border-b lg:border-none">{title}</h2>
            <div class="flex-auto flex flex-col gap-8">
                {
                    items.map(item => {
                        return (
                            <div class="flex flex-col md:flex-row md:pb-8 lg:border-b gap-2 md:gap-4 lg:gap-16">
                                <h3 class="flex-none font-bold md:w-2/5 lg:w-52">{item.title}</h3>
                                <div class="flex-auto" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                <div class="hidden xl:block flex-none w-40"></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}