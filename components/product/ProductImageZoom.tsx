import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSignal } from "@preact/signals";
import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  images: ImageObject[];
  width: number;
  height: number;
}

function ProductImageZoom({ images, width, height }: Props) {
  const id = useId();
  const open = useSignal(false);

  return (
    <>
      <Button
        class="hidden sm:inline-flex btn-ghost"
        onClick={() => open.value = true}
      >
        <Icon id="Zoom" size={24} />
      </Button>
      <div id={id}>
        <Modal
          loading="lazy"
          open={open.value}
          onClose={() => open.value = false}
        >
          <div class="modal-box w-11/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center">
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
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton class="btn btn-circle btn-outline col-start-3 col-end-4 row-start-1 row-span-full">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>

            <SliderJS rootId={id} />
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ProductImageZoom;
