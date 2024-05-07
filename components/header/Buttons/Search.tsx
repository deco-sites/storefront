import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { SEARCHBAR_DRAWER_ID, useUI } from "../../../sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost hidden sm:flex"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
      </Button>
      <label
        for={SEARCHBAR_DRAWER_ID}
        class="btn btn-circle btn-sm btn-ghost sm:hidden"
        aria-label="search icon button"
      >
        <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
      </label>
    </>
  );
}
