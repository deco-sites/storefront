import { useContext } from "preact/hooks";
import { createContext } from "preact";

export const LayoutContext = createContext({ isPreview: false });

export const useLayoutContext = () => useContext(LayoutContext);
