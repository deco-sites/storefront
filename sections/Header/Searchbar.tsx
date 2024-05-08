import { Suggestion } from "apps/commerce/types.ts";
import { Resolved, SectionProps } from "deco/mod.ts";
import type { AppContext } from "../../apps/site.ts";
import { Aside } from "../../components/header/Drawers.tsx";
import { headerHeight } from "../../components/header/constants.ts";
import type { SearchbarProps } from "../../components/search/Searchbar.tsx";
import {
  NAME,
  Searchbar,
  Suggestions,
} from "../../components/search/Searchbar.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Modal from "../../components/ui/Modal.tsx";
import { SEARCHBAR_DRAWER_ID, SEARCHBAR_POPUP_ID } from "../../sdk/useUI.ts";

export interface Props extends SearchbarProps {
  loader: Resolved<Suggestion | null>;
}

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const form = await req.formData();
  const query = `${form.get(NAME ?? "q")}`;

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;

  return { ...props, device: ctx.device, suggestion };
};

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  if (req.method === "POST") {
    return action(props, req, ctx);
  }

  return { ...props, device: ctx.device, suggestion: null };
};

export default function Section(props: SectionProps<typeof loader>) {
  const { device, suggestion } = props;

  // In case we are rendering the section partially
  if (suggestion) {
    return <Suggestions suggestion={suggestion} />;
  }

  // Drawer on mobile, modal on desktop
  if (device === "desktop") {
    return (
      <Modal id={SEARCHBAR_POPUP_ID}>
        <div
          class="absolute top-0 bg-base-100 container"
          style={{ marginTop: headerHeight }}
        >
          <Searchbar {...props} />
        </div>
      </Modal>
    );
  }

  return (
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
          <div class="w-screen">
            <Searchbar {...props} />
          </div>
        </Aside>
      }
    />
  );
}
