import type { Props as MenuProps } from "$store/components/header/Lp/LpMenu.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

const Menu = lazy(() => import("$store/components/header/Lp/LpMenu.tsx"));

export interface Props {
  menu: MenuProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
}

const Aside = (
  { onClose, children, logo }: {
    onClose?: () => void;
    children: ComponentChildren;
    logo?: { src: ImageWidget; alt: string };
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[70%]">
    <div class="flex justify-center items-center relative">
      {onClose && (
        <Button class="absolute left-2 top-2" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      )}
      <h1 class="px-4 py-3">
        <Image
          src={logo?.src ?? ""}
          alt={logo?.alt ?? ""}
          width={50}
          height={41}
        />
      </h1>
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, children }: Props) {
  const { displayMenu } = useUI();

  if (!menu) return null;

  return (
    <Drawer 
      open={displayMenu.value}
      onClose={() => {
        displayMenu.value = false;
      }}
      aside={
        <Aside
          logo={menu?.logo}
          onClose={() => {
            displayMenu.value = false;
          }}
        >
          {displayMenu.value && <Menu {...menu} />}
        </Aside>
      }
    >
      {children}
    </Drawer>
  );
}

export default Drawers;
