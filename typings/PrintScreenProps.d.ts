/**
 * This file was generated from PrintScreen.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";

export type OrientationEnum = "portrait" | "landscape";

export type ImgTypeEnum = "jpeg" | "png";

export interface PrintScreenContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    targetClass: string;
    orientation: OrientationEnum;
    imgType: ImgTypeEnum;
    buttonText: string;
    fileNamePrefix: string;
}

export interface PrintScreenPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    targetClass: string;
    orientation: OrientationEnum;
    imgType: ImgTypeEnum;
    buttonText: string;
    fileNamePrefix: string;
}
