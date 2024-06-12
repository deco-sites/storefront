import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  id?: string;
  width: number;
  height: number;
  images: ImageObject[];
}

function ProductImageZoom({ images, width, height, id = useId() }: Props) {
  const container = `${id}-container`;

  return (
    <Modal id={id}>
      <div
        id={container}
        class="modal-box w-11/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center"
      >
        <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
          {images.map((image, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full h-full justify-center items-center"
            >
              <Image
                style={{ aspectRatio: `${width} / ${height}` }}
                src={image.url!}
                alt={image.alternateName}
                width={width}
                height={height}
                class="h-full w-auto"
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton class="btn btn-circle btn-outline col-start-1 col-end-2 row-start-1 row-span-full">
          <Icon id="chevron-right" class="rotate-180" />
        </Slider.PrevButton>

        <Slider.NextButton class="btn btn-circle btn-outline col-start-3 col-end-4 row-start-1 row-span-full">
          <Icon id="chevron-right" />
        </Slider.NextButton>
      </div>
      <Slider.JS rootId={container} />
    </Modal>
  );
}

export default ProductImageZoom;
