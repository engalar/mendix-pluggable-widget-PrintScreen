import { createElement, useCallback } from "react";
import { PrintScreenContainerProps } from "../typings/PrintScreenProps";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const _require = window.require as any;

function msieversion() {
    var ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE ");

    if (msie > 0) { // If Internet Explorer, return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    } else { // If another browser, return 0
        return 0;
    }
}

function Filename2Save(locale: any, filenameprefix: string) {
    var milsecDateNow = Date.now(),
        dateDateNow = new Date(milsecDateNow),
        options = {
            selector: "date",
            datePattern: "yyyy-MM-dd"
        },
        strDate = locale.format(dateDateNow, options),
        // strTime = formatDate(dateDateNow, "hh:mm" );

        strFileName2Save = filenameprefix + " " + strDate + ".pdf";
    return strFileName2Save;
}

export default function (props: PrintScreenContainerProps) {
    const onClick = useCallback(
        async () => {
            const locale = await new Promise<[any, any]>((resolve, _reject) => {
                _require([
                    "dojo/date/locale",
                ], resolve);
            });

            let widgetNode =
                document.querySelector<HTMLElement>("." + props.targetClass);

            let backgroundClr: string | null = '#ffffff';
            if (props.imgType === "png") {
                backgroundClr = null;
            }

            html2canvas(widgetNode!, {
                backgroundColor: backgroundClr
            }).then(function (canvas) {
                document.body.appendChild(canvas);
                let strFileName2Save = Filename2Save(locale, props.fileNamePrefix),
                    doc;

                if (props.orientation === "portrait") {
                    doc = new jsPDF("p", "pt", "letter", true);
                } else {
                    doc = new jsPDF("l", "pt", "letter", true);
                }


                var pageWidth, pageHeight;

                if (props.orientation === "portrait") {
                    pageWidth = 612;
                    pageHeight = 792;
                } else {
                    pageWidth = 792;
                    pageHeight = 612;
                }

                //each page should be this number of pixels tall
                var imgPageHeight = canvas.width * pageHeight / pageWidth;
                var heightLeft = canvas.height;

                var pageCanvas,
                    context,
                    pageImgData,
                    pageCount = 0;

                while (heightLeft >= 0) {

                    if (pageCount !== 0) {
                        doc.addPage();
                    }

                    pageCanvas = document.createElement('canvas');
                    pageCanvas.width = canvas.width;
                    pageCanvas.height = imgPageHeight;
                    context = pageCanvas.getContext('2d')!;

                    if (props.imgType === 'jpeg') {
                        context.fillStyle = '#fff';  /// set white fill style
                        context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
                    }

                    context.drawImage(canvas, 0, canvas.height - heightLeft, canvas.width, imgPageHeight, 0, 0, pageCanvas.width, pageCanvas.height);

                    if (props.imgType === 'png') {
                        pageImgData = pageCanvas.toDataURL('image/png');
                        doc.addImage(pageImgData, 'PNG', 0, 0, pageWidth, pageHeight, pageCount.toString(), 'FAST');
                    } else {
                        pageImgData = pageCanvas.toDataURL('image/jpeg', 1.0);
                        doc.addImage(pageImgData, 'JPEG', 0, 0, pageWidth, pageHeight, pageCount.toString(), 'FAST');
                    }

                    heightLeft -= imgPageHeight;
                    pageCount += 1;
                }

                if (msieversion() > 8 && msieversion() < 11) {
                    doc.save();
                } else {
                    doc.save(strFileName2Save);
                }
            }
            );

        },
        [],
    )

    return (
        <button onClick={onClick}>{props.buttonText}</button>
    );
}