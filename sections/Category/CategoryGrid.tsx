import Header from "$store/components/ui/SectionHeader.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "$store/components/ui/Button.tsx";

export interface CategoryGridProps {
  href?: string;
  image?: ImageWidget;
  /** @description Alternative text */
  label?: string;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: CategoryGridProps[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CategoryGrid(props: Props) {
  const id = useId();
  const {
    header = {
      title: "Explore Our Categories",
      description: "Your description",
    },
    list = [
      {
        href: "/category",
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/01c01ba9-ac16-4371-82ca-b93d17545f9c",
        label: "category",
        buttonText: "Explore collection",
      },
      {
        href: "/category",
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/9b80d57d-64b0-4eef-a3cd-fa8daafaae9c",
        label: "category",
        buttonText: "Explore collection",
      },
      {
        href: "/category",
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/ed4c0eb3-96ab-484f-b293-e91d196a5063",
        label: "category",
        buttonText: "Explore collection",
      },
      {
        href: "/category",
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/b9882ff7-3dbc-43e4-9813-5cec23c012cd",
        label: "category",
        buttonText: "Explore collection",
      },
    ],
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "bottom",
        textAlignment: "left",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="max-w-[1440px] mx-auto mt-16"
    >
      <Header
        title={header.title}
        description={header.description || ""}
        alignment={layout.headerAlignment || "center"}
      />

      <div class="grid md:grid-cols-2 grid-cols-1 mt-6">
        {list.map((
          { href, image, label, buttonText },
        ) => (
          <div>
            <a
              href={href}
              class={`relative flex ${
                layout.categoryCard?.textAlignment === "left"
                  ? "justify-start"
                  : "justify-start items-center"
              } ${
                layout.categoryCard?.textPosition === "bottom"
                  ? "flex-col-reverse"
                  : "flex-col"
              }`}
            >
              {image &&
                (
                  <figure>
                    <Image
                      src={image}
                      alt={label}
                      width={720}
                      height={480}
                      loading="lazy"
                    />
                  </figure>
                )}
              <Button
                class="font-light text-base-content bg-base-100 py-4 px-6 absolute m-6"
                aria-label={label}
              >
                {buttonText}
              </Button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
