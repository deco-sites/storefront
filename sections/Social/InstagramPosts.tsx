import Image from "apps/website/components/Image.tsx";
import Section, { type Props as SectionHeaderProps, } from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { type SectionProps } from "@deco/deco";
import { type LoadingFallbackProps } from "@deco/deco";
export interface Data {
    id: string;
    permalink: string;
    media_type: string;
    media_url: string;
}
export interface Props extends SectionHeaderProps {
    /**
     * @description Get it in Facebook app. Expires every 90 days.
     */
    facebookToken: string;
    /**
     * @title Number of posts
     */
    nposts: number;
}
const FIELDS = "media_url,media_type,permalink";
const fetchPosts = async (token: string): Promise<Data[]> => {
    try {
        const response = await fetch(`https://graph.instagram.com/me/media?access_token=${token}&fields=${FIELDS}`);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        const json = await response.json() as {
            data: Data[];
        };
        return json.data;
    }
    catch (error) {
        console.error("Instagram API returned the following error:", error);
        return [
            {
                id: "placeholderInsta",
                permalink: "#",
                media_type: "IMAGE",
                media_url: "https://instagram.fssz12-1.fna.fbcdn.net/v/t39.30808-6/448303338_17946815738811617_8627590492190753324_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fssz12-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=0hgWwQSVXWoQ7kNvgHTTe_b&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzM4OTc1MTE2MzU5ODI3NjEyMQ%3D%3D.2-ccb7-5&oh=00_AYBoM5AbNhOTtdCFcbcmqOEIkF4lC2EGH33vnI_7VKRPXA&oe=667624C1&_nc_sid=cf751b",
            },
            {
                id: "placeholderInsta",
                permalink: "#",
                media_type: "IMAGE",
                media_url: "https://instagram.fssz12-1.fna.fbcdn.net/v/t39.30808-6/444470593_17944916675811617_2966115177721160533_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDExNTIuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fssz12-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=RMg3-8nrag0Q7kNvgFgvV_p&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzM3ODc3NjMzNjI4NDM1ODE5NQ%3D%3D.2-ccb7-5&oh=00_AYC_oc0Sa1Eh_bTpaJZxWftQ3yiYmf8n1H7cbsGjBkhhIw&oe=66742AF7&_nc_sid=cf751b",
            },
            {
                id: "placeholderInsta",
                permalink: "",
                media_type: "IMAGE",
                media_url: "https://instagram.fssz12-1.fna.fbcdn.net/v/t39.30808-6/441497292_17943172355811617_8109128954771263459_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDk4eDEwOTguc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fssz12-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=WqsUNdtOX5EQ7kNvgFns-_p&edm=AFg4Q8wAAAAA&ccb=7-5&ig_cache_key=MzM2Nzk4OTkyMTY3ODM4ODc2MA%3D%3D.2-ccb7-5&oh=00_AYCZubDrz_s3R9n30heRJ_xOzerTgNT5Hlv1ut7oGVg6rw&oe=66760991&_nc_sid=cf751b",
            },
        ];
    }
};
export async function loader({ facebookToken, nposts, ...rest }: Props, _req: Request) {
    const posts = await fetchPosts(facebookToken);
    return {
        ...rest,
        posts: posts.slice(0, nposts ?? 12),
    };
}
function InstagramPosts({ title, posts = [
    {
        id: "placeholderInsta",
        permalink: "#",
        media_type: "IMAGE",
        media_url: "https://instagram.fssz12-1.fna.fbcdn.net/v/t39.30808-6/448303338_17946815738811617_8627590492190753324_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fssz12-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=0hgWwQSVXWoQ7kNvgHTTe_b&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzM4OTc1MTE2MzU5ODI3NjEyMQ%3D%3D.2-ccb7-5&oh=00_AYBoM5AbNhOTtdCFcbcmqOEIkF4lC2EGH33vnI_7VKRPXA&oe=667624C1&_nc_sid=cf751b",
    },
    {
        id: "placeholderInsta",
        permalink: "#",
        media_type: "IMAGE",
        media_url: "https://instagram.fssz12-1.fna.fbcdn.net/v/t39.30808-6/444470593_17944916675811617_2966115177721160533_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDExNTIuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fssz12-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=RMg3-8nrag0Q7kNvgFgvV_p&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzM3ODc3NjMzNjI4NDM1ODE5NQ%3D%3D.2-ccb7-5&oh=00_AYC_oc0Sa1Eh_bTpaJZxWftQ3yiYmf8n1H7cbsGjBkhhIw&oe=66742AF7&_nc_sid=cf751b",
    },
    {
        id: "placeholderInsta",
        permalink: "#",
        media_type: "IMAGE",
        media_url: "https://instagram.fssz12-1.fna.fbcdn.net/v/t39.30808-6/441497292_17943172355811617_8109128954771263459_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDk4eDEwOTguc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fssz12-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=WqsUNdtOX5EQ7kNvgFns-_p&edm=AFg4Q8wAAAAA&ccb=7-5&ig_cache_key=MzM2Nzk4OTkyMTY3ODM4ODc2MA%3D%3D.2-ccb7-5&oh=00_AYCZubDrz_s3R9n30heRJ_xOzerTgNT5Hlv1ut7oGVg6rw&oe=66760991&_nc_sid=cf751b",
    },
], }: SectionProps<typeof loader>) {
    return (<Section.Container>
      <Section.Header title={title}/>

      <Slider class="carousel carousel-center sm:carousel-end gap-5 sm:gap-10 w-full">
        {posts.map((item, index) => (<Slider.Item index={index} class={clx("carousel-item", "first:pl-5 first:sm:pl-0", "last:pr-5 last:sm:pr-0")}>
            <a href={item.permalink} target="_blank">
              {item.media_type === "IMAGE"
                ? (<Image loading="lazy" class="max-w-full max-h-full object-cover" style={{ aspectRatio: "1 / 1" }} src={item.media_url ?? ""} width={350} height={350}/>)
                : (<video controls class="max-w-full max-h-full object-cover">
                    <source src={item.media_url}></source>
                  </video>)}
            </a>
          </Slider.Item>))}
      </Slider>
    </Section.Container>);
}
export const LoadingFallback = ({ title }: LoadingFallbackProps<Props>) => (<Section.Container>
    <Section.Header title={title}/>
    <Section.Placeholder height="635px"/>
  </Section.Container>);
export default InstagramPosts;
