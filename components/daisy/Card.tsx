import Image from "apps/website/components/Image.tsx";

export interface Props {
  image?: { src: string; alt: string };
  title: string;
  subtitle: string;
  callToAction?: {
    title: string;
    href: string;
  };
  imageOnBottom?: boolean;
  glass?: boolean;
  imageOnSide?: boolean;
}

export default function Card(props: Props) {
  const {
    image,
    title,
    subtitle,
    callToAction,
    imageOnBottom,
    glass,
    imageOnSide,
  } = props;
  return (
    <div
      className={`card ${
        imageOnSide ? "card-side" : "w-96"
      } bg-base-100 shadow-xl`}
    >
      {(!imageOnBottom || imageOnSide) && <CardImage image={image} />}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{subtitle}</p>
        {callToAction && (
          <div className="card-actions justify-end">
            <a href={callToAction.href}>
              <button className="btn btn-primary">{callToAction.title}</button>
            </a>
          </div>
        )}
      </div>
      {(imageOnBottom && !imageOnSide) && <CardImage image={image} />}
    </div>
  );
}

function CardImage({ image }: { image?: { src: string; alt: string } }) {
  return (
    <>
      {image && (
        <figure>
          <Image src={image?.src} alt={image?.alt} width={385} height={226} />
        </figure>
      )}
    </>
  );
}
