import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Center,
  Default,
  Left,
  Lettercase,
  Lowercase,
  Right,
  Uppercase,
} from "../static/adminIcons.ts";
import { allowCorsFor, type FnContext } from "@deco/deco";
const icons = [
  { component: Left, label: "Left", prop: "alignment" },
  { component: Center, label: "Center", prop: "alignment" },
  { component: Right, label: "Right", prop: "alignment" },
  { component: AlignLeft, label: "Left", prop: "textAlignment" },
  { component: AlignCenter, label: "Center", prop: "textAlignment" },
  { component: AlignRight, label: "Right", prop: "textAlignment" },
  { component: Default, label: "Default", prop: "case" },
  { component: Lowercase, label: "Lowercase", prop: "case" },
  { component: Lettercase, label: "Titlecase", prop: "case" },
  { component: Uppercase, label: "Uppercase", prop: "case" },
  { component: "S", label: "Small", prop: "fontSize" },
  { component: "M", label: "Normal", prop: "fontSize" },
  { component: "L", label: "Large", prop: "fontSize" },
];
// Used to load icons that will be used for ButtonGroup widgets.
// The file adminIcons.ts contains all available icons in a string format, and this loader maps them to the format expected by the button-group widget.
export default function IconsLoader(
  _props: unknown,
  req: Request,
  ctx: FnContext,
) {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });
  // Mapping icons to { value, label }
  const iconsMap = icons.map((icon) => ({
    value: icon.component,
    label: icon.label,
    prop: icon.prop,
  }));
  return iconsMap;
}
