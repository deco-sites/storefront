export interface Props {
  images: Image[];
  buttons?: boolean;
  gap?: boolean;
  nextPrev?: boolean;
}

interface Image {
  src: string;
  alt: string;
}

export default function Carousel(props: Props) {
  const { images, buttons, gap, nextPrev } = props;

  const getNext = (currentId: number) => {
    if (currentId + 1 >= images.length) {
      return "#item-0";
    } else {
      return `item-${currentId + 1}`;
    }
  };

  const getPrev = (currentId: number) => {
    if (currentId === 0) {
      return `item-${images.length - 1}`;
    } else {
      return `item-${currentId - 1}`;
    }
  };

  return (
    <>
      <div
        className={`carousel rounded-box carousel-center ${gap ? "gap-2" : ""}`}
      >
        {images.map((img, id) => {
          return (
            <div className="carousel-item" id={`item-${id}`}>
              <img src={img.src} alt={img.alt} />
              {nextPrev && (
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={getPrev(id)} className="btn btn-circle">
                    ❮
                  </a>
                  <a href={getNext(id)} className="btn btn-circle">
                    ❯
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {buttons && (
        <div className="flex justify-center w-full py-2 gap-2">
          {images.map((img, idx) => {
            return (
              <a href={`#item-${idx}`} className="btn btn-xs">
                {idx}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
