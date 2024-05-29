import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  title?: string;
  posts?: Post[];
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
}

export interface Post {
  href?: string;
  image: ImageWidget;
  alt?: string;
  label?: string;
  description?: string;
  author?: string;
  date?: string;
}

function BlogPosts({
  title = "BlogPosts",
  layout = {
    numberOfSliders: {
      mobile: 1,
      desktop: 3,
    },
    headerAlignment: "center",
    headerfontSize: "Normal",
    showArrows: false,
  } as Props["layout"],
  posts = [
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label: "Title Post",
      description: "Description",
      author: "Author",
      date: "Date",
    },
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label: "Title Post",
      description: "Description",
      author: "Author",
      date: "Date",
    },
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label: "Title Post",
      description: "Description",
      author: "Author",
      date: "Date",
    },
  ],
}: Props) {
  const id = useId();

  if (!posts || posts.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  const Card = ({ post }: { post: Post }) => (
    <a href={post.href} class="block px-3">
      <article class="flex flex-col">
        <figure class="w-full">
          <Image
            class="w-full object-cover"
            src={post.image}
            alt={post.alt}
            width={442}
            height={266}
          />
          <figcaption class="text-2xl mt-4 font-light">{post.label}</figcaption>
        </figure>
        <div class="flex flex-col gap-1">
          <p class="text-base font-light pb-14 pt-2">{post.description}</p>
          <div class="flex items-center justify-between">
            <p class="font-light text-xs">
              {post.author}
            </p>
            <p class="font-light text-xs">{post.date}</p>
          </div>
        </div>
      </article>
    </a>
  );

  return (
    <div class="w-full container py-8 flex flex-col gap-6 pb-16">
      <div class="px-9">
        <Header
          title={title || "BlogPosts"}
          fontSize={layout?.headerfontSize || "Normal"}
          alignment={layout?.headerAlignment || "center"}
        />
      </div>
      <div
        id={id}
        class={`grid ${
          layout?.showArrows ? "grid-cols-[48px_1fr_48px]" : ""
        } px-6 container`}
      >
        <Slider class="carousel carousel-center sm:carousel-end row-start-2 row-end-5">
          {posts?.map((post, index) => (
            <Slider.Item
              index={index}
              class={`carousel-item  ${
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3]
              } ${slideMobile[layout?.numberOfSliders?.mobile ?? 1]}`}
            >
              <Card post={post} />
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <>
            <div class="relative block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronLeft" strokeWidth={3} class="w-5" />
              </Slider.PrevButton>
            </div>
            <div class="relative block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}
        <Slider.JS rootId={id} />
      </div>
    </div>
  );
}

export default BlogPosts;
