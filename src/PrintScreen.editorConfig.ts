import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "./piw-utils-internal";
import { PrintScreenPreviewProps } from "../typings/PrintScreenProps";

export function getProperties(
    values: PrintScreenPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    console.log(values);
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: PrintScreenPreviewProps): StructurePreviewProps | null {
    console.log(values);
    return null;
}
