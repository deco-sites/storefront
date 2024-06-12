import Icon from "../../components/ui/Icon.tsx";

export default function BackToTop({ content }: { content?: string }) {
  return (
    <>
      {content && (
        <div class="w-full flex items-center justify-center">
          <a href="#top" class="btn no-animation">
            {content} <Icon id="chevron-right" class="-rotate-90" />
          </a>
        </div>
      )}
    </>
  );
}
