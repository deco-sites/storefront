import { AvailableIcons } from "../static/adminIcons.ts";
import { allowCorsFor, type FnContext } from "@deco/deco";
const icons = Object.keys(AvailableIcons).map((iconName) => ({
  component: AvailableIcons[iconName as keyof typeof AvailableIcons],
  label: iconName,
}));
// Used to load all available icons that will be used for IconSelect widgets.
export default function IconsLoader(
  _props: unknown,
  req: Request,
  ctx: FnContext,
) {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });
  // Mapping icons to { value, label, icon }
  const iconsMap = icons.map((icon) => ({
    icon: icon.component,
    label: icon.label,
    value: icon.label,
  }));
  return iconsMap;
}
