import { RiskAnalysisApiResponse } from "@api/index";
import Loader from "@components/Loader";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Content, IHighlight, ScaledPosition } from "react-pdf-highlighter";
import {
    AreaHighlight,
    Highlight,
    PdfHighlighter,
    PdfLoader,
    Popup
} from "react-pdf-highlighter";
import "react-pdf-highlighter/dist/style.css";
import RiskSidebar from "./RiskSidebar";

interface Props {
    pdfUrl: string;
    riskyClauses: RiskAnalysisApiResponse[];
}

const getRiskColor = (level: string) => {
    switch (level) {
        case "High":
            return "rgba(255,99,99,0.35)";
        case "Medium":
            return "rgba(255,186,58,0.35)";
        default:
            return "rgba(86,208,116,0.35)";
    }
};

const parseIdFromHash = () =>
    document.location.hash.slice("#highlight-".length);

const resetHash = () => {
    document.location.hash = "";
};

const HighlightPopup = ({
    comment,
}: {
    comment: { text: string; emoji: string };
}) =>
    comment.text ? (
        <div className="Highlight__popup">
            {comment.emoji} {comment.text}
        </div>
    ) : null;

export const ContractViewer = ({ pdfUrl, riskyClauses }: Props) => {
    const [pdfDocument, setPdfDocument] = useState<any>(null);
    const [highlights, setHighlights] = useState<IHighlight[]>([]);
    const scrollViewerTo = useRef((highlight: IHighlight) => { });
    const highlighterRef = useRef<any>(null);

    const scrollToHighlightFromHash = useCallback(() => {
        const highlight = getHighlightById(parseIdFromHash());
        if (highlight) {
            scrollViewerTo.current(highlight);
        }
    }, []);

    const updateHighlight = (
        highlightId: string,
        position: Partial<ScaledPosition>,
        content: Partial<Content>,
    ) => {
        console.log("Updating highlight", highlightId, position, content);
        setHighlights((prevHighlights) =>
            prevHighlights.map((h) => {
                const {
                    id,
                    position: originalPosition,
                    content: originalContent,
                    ...rest
                } = h;
                return id === highlightId
                    ? {
                        id,
                        position: { ...originalPosition, ...position },
                        content: { ...originalContent, ...content },
                        ...rest,
                    }
                    : h;
            }),
        );
    };


    const getHighlightById = (id: string) => {
        return highlights.find((highlight) => highlight.id === id);
    };

    const findHighlightsInPdf = async (pdf: any) => {
        const newHighlights: IHighlight[] = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.0 });
            const textContent = await page.getTextContent();

            for (const risk of riskyClauses) {
                const matchItem = textContent.items.find((it: any) =>
                    it.str.includes(risk.paragraph.trim())
                );
                if (!matchItem) continue;

                // PDF-space coordinates
                const [a, b, c, d, e, f] = matchItem.transform;
                const fontHeight = Math.hypot(b, d);
                const width =
                    matchItem.width ?? matchItem.str.length * (fontHeight * 0.5);
                const rect = viewport.convertToViewportRectangle([
                    e,
                    f,
                    e + width,
                    f + fontHeight,
                ]);
                const [x1, y1, x2, y2] = rect;

                // convert absolute -> scaled (0–1)
                const scaled = {
                    x1: x1 / viewport.width,
                    y1: y1 / viewport.height,
                    x2: x2 / viewport.width,
                    y2: y2 / viewport.height,
                    width: Math.abs(x2 - x1) / viewport.width,
                    height: Math.abs(y2 - y1) / viewport.height,
                };

                newHighlights.push({
                    id: `${pageNum}-${risk.category}`,
                    position: {
                        pageNumber: pageNum,
                        boundingRect: scaled,
                        rects: [],
                    },
                    content: { text: risk.paragraph },
                    comment: { text: risk.reason, emoji: "" },
                });
            }
        }

        setHighlights(newHighlights);
    };

    useEffect(() => {
        if (pdfDocument) findHighlightsInPdf(pdfDocument);
    }, [pdfDocument]);

    return (
        <div className="App" style={{ display: "flex", height: "100vh" }}>
            <div className="border-40 border-[#474747] rounded-[20px] h-full w-full md:w-4/5 relative"
            >
                <PdfLoader url={pdfUrl} beforeLoad={<Loader />}>
                    {(doc) => {
                        if (!pdfDocument) setTimeout(() => setPdfDocument(doc), 0);
                        return (
                            <PdfHighlighter
                                pdfDocument={pdfDocument}
                                enableAreaSelection={(event) => event.altKey}
                                onScrollChange={resetHash}
                                scrollRef={(scrollTo) => {
                                    console.log("Trying to scroll")
                                    scrollViewerTo.current = scrollTo;
                                    scrollToHighlightFromHash();
                                }}
                                onSelectionFinished={() => { }}
                                highlightTransform={(
                                    highlight,
                                    index,
                                    setTip,
                                    hideTip,
                                    viewportToScaled,
                                    screenshot,
                                    isScrolledTo,
                                ) => {
                                    const isTextHighlight = !highlight.content?.image;

                                    const component = isTextHighlight ? (
                                        <Highlight
                                            isScrolledTo={isScrolledTo}
                                            position={highlight.position}
                                            comment={highlight.comment}
                                        />
                                    ) : (
                                        <AreaHighlight
                                            isScrolledTo={isScrolledTo}
                                            highlight={highlight}
                                            onChange={(boundingRect) => {
                                                updateHighlight(
                                                    highlight.id,
                                                    { boundingRect: viewportToScaled(boundingRect) },
                                                    { image: screenshot(boundingRect) },
                                                );
                                            }}
                                        />
                                    );

                                    return (
                                        <Popup
                                            popupContent={<HighlightPopup {...highlight} />}
                                            onMouseOver={(popupContent) =>
                                                setTip(highlight, (highlight) => popupContent)
                                            }
                                            onMouseOut={hideTip}
                                            key={index}
                                        >
                                            {component}
                                        </Popup>
                                    );
                                }}
                                highlights={highlights}
                            />
                        )
                    }}
                </PdfLoader>
            </div>

            <div className="hidden md:block">
                <RiskSidebar
                    highlights={highlights}
                    risks={riskyClauses}
                />
            </div>
        </div>
    );
};
