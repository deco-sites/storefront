import { JSX } from "preact";
import calculateNodeHeight from "./calculateNodeHeight.ts";
import getSizingData, { SizingData } from "./getSizingData.ts";
import { useLayoutEffect, useRef } from "preact/hooks";
import {
  useComposedRef,
  useFontsLoadedListener,
  useWindowResizeListener,
} from "./hooks.ts";
import { noop } from "./utils.ts";
import { forwardRef } from "preact/compat";

type TextareaProps = JSX.HTMLAttributes<HTMLTextAreaElement>;

type Style =
  & Omit<
    NonNullable<TextareaProps["style"]>,
    "maxHeight" | "minHeight"
  >
  & {
    height?: number;
  };

export type TextareaHeightChangeMeta = {
  rowHeight: number;
};
export interface TextareaAutosizeProps extends Omit<TextareaProps, "style"> {
  maxRows?: number;
  minRows?: number;
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  cacheMeasurements?: boolean;
  style?: Style;
}

const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({
    cacheMeasurements,
    maxRows,
    minRows,
    onChange = noop,
    onHeightChange = noop,
    ...props
  }, userRef) => {
    if (props.style) {
      if ("maxHeight" in props.style) {
        throw new Error(
          "Using `style.maxHeight` for <TextareaAutosize/> is not supported. Please use `maxRows`.",
        );
      }
      if ("minHeight" in props.style) {
        throw new Error(
          "Using `style.minHeight` for <TextareaAutosize/> is not supported. Please use `minRows`.",
        );
      }
    }
    const isControlled = props.value !== undefined;
    const libRef = useRef<HTMLTextAreaElement | null>(null);
    const ref = useComposedRef(libRef, userRef);
    const heightRef = useRef(0);
    const measurementsCacheRef = useRef<SizingData>();

    const resizeTextarea = () => {
      const node = libRef.current!;
      const nodeSizingData = cacheMeasurements && measurementsCacheRef.current
        ? measurementsCacheRef.current
        : getSizingData(node);

      if (!nodeSizingData) {
        return;
      }

      measurementsCacheRef.current = nodeSizingData;

      const [height, rowHeight] = calculateNodeHeight(
        nodeSizingData,
        node.value || node.placeholder || "x",
        minRows,
        maxRows,
      );

      if (heightRef.current !== height) {
        heightRef.current = height;
        node.style.setProperty("height", `${height}px`, "important");
        onHeightChange(height, { rowHeight });
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        resizeTextarea();
      }
      onChange(event);
    };

    useLayoutEffect(resizeTextarea);
    useWindowResizeListener(resizeTextarea);
    useFontsLoadedListener(resizeTextarea);
    return <textarea {...props} onChange={handleChange} ref={ref} />;
  },
);

export default TextareaAutosize;
