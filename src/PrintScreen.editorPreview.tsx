import { parseStyle } from "./piw-utils-internal";
import { createElement } from "react";
import { PrintScreenPreviewProps } from "../typings/PrintScreenProps";

declare function require(name: string): string;

export function preview(props: PrintScreenPreviewProps) {
    return <div style={parseStyle(props.style)}></div>;
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
