import Icon from "../../../components/ui/Icon.tsx";
import { SIDEMENU_DRAWER_ID } from "../../../sdk/useUI.ts";

function MenuButton() {
  return (
    <label
      for={SIDEMENU_DRAWER_ID}
      class="btn btn-circle md:btn-sm btn-xs btn-ghost"
      aria-label="open menu"
    >
      <Icon id="Bars3" size={20} strokeWidth={0.01} />
    </label>
  );
}

export default MenuButton;
