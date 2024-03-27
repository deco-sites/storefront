import { Footer as FooterComponent } from "./types.ts";
import Image from "apps/website/components/Image.tsx";
import { JSX } from "preact";

interface Props {
  footer?: FooterComponent;
}

function Footer(props: Props): JSX.Element | null {
  const { footer } = props;
  if (!footer || (!footer.image && !footer.text)) return null;

  return (
    <div class="py-8 lg:px-0 px-6">
      <a
        href={footer.url}
        class="flex flex-row gap-1 items-center justify-center text-xs"
        target="_blank"
      >
        {footer.text && <p>{footer.text}</p>}
        {footer.image && (
          <Image
            src={footer.image || ""}
            alt={footer.alt}
            width={footer.width || 50}
            height={footer.height || 20}
          />
        )}
      </a>
    </div>
  );
}

export default Footer;
