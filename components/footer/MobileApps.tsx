export default function MobileApps(
  { content }: { content: { apple?: string; android?: string } },
) {
  return (
    <>
      {(content?.apple || content?.android) && (
        <div class="flex gap-2 lg:flex-wrap">
          {content?.apple && (
            <a
              href={content?.apple}
              target="_blank"
              aria-label={`Download on the App Store at link ${content?.apple}`}
            >
              <img
                loading="lazy"
                width="135"
                height="40"
                src="/image/app-apple.png"
                alt="Download on the App Store"
              />
            </a>
          )}
          {content?.android && (
            <a
              href={content?.android}
              target="_blank"
              aria-label={`Get it on Google Play at link ${content?.android}`}
            >
              <img
                loading="lazy"
                width="135"
                height="40"
                src="/image/app-android.png"
                alt="Get it on Google Play"
              />
            </a>
          )}
        </div>
      )}
    </>
  );
}
