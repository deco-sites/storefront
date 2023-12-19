export interface Props {
  title: string;
  description: string;
  cta?: { text: string; href: string };
  image?: { src: string; alt: string };
  imageOnRight?: boolean;
}

export default function Hero(props: Props) {
  const { title, description, cta, image, imageOnRight } = props;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div
        className={image
          ? "hero-content flex-col lg:flex-row"
          : "hero-content text-center"}
      >
        {image && !imageOnRight && (
          <img
            src={image.src}
            className="max-w-sm rounded-lg shadow-2xl"
            alt={image.alt}
          />
        )}
        <div className={image ? "" : "max-w-md"}>
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          {cta && (
            <a href={cta.href}>
              <button className="btn btn-primary">{cta.text}</button>
            </a>
          )}
        </div>
        {image && imageOnRight && (
          <img
            src={image.src}
            className="max-w-sm rounded-lg shadow-2xl"
            alt={image.alt}
          />
        )}
      </div>
    </div>
  );
}
