import { RiskAnalysisApiResponse, RiskWithId } from "@api/index";
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
        <div className="bg-red-100 p-2 rounded">
            {comment.emoji} {comment.text}
        </div>
    ) : null;

export const ContractViewer = ({ pdfUrl, riskyClauses }: Props) => {
    const [pdfDocument, setPdfDocument] = useState<any>(null);
    const [highlights, setHighlights] = useState<IHighlight[]>([]);
    const [riskWithIds, setRiskWithIds] = useState<RiskWithId[]>([]);
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

    const buildHighlight = (
        pageNum: number,
        page: any,
        matchItem: any,
        risk: RiskAnalysisApiResponse
    ): IHighlight => {
        const viewport = page.getViewport({ scale: 1.33 }); // match viewer scale

        // PDF font metrics
        const [a, b, c, d, e, f] = matchItem.transform;
        const textHeight = Math.hypot(b, d);
        const textWidth =
            matchItem.width ?? matchItem.str.length * (textHeight * 0.5);

        // PDF-space -> viewport-space (pixels, top-left origin)
        const rect = viewport.convertToViewportRectangle([
            e,
            f,
            e + textWidth,
            f + textHeight,
        ]);
        const [x1, y1, x2, y2] = rect;
        const vx1 = Math.min(x1, x2);
        const vy1 = Math.min(y1, y2);
        const vx2 = Math.max(x1, x2);
        const vy2 = Math.max(y1, y2);

        const randomSeed = Math.floor(Math.random() * 1000000);
        const highlightId = `${pageNum}-${risk.category.toLowerCase().replace(/\s+/g, '-')}-${randomSeed}`;
        setRiskWithIds((prev) => [...prev, { ...risk, id: highlightId }]);
        return {
            id: highlightId,
            position: {
                pageNumber: pageNum,
                boundingRect: {
                    x1: vx1,
                    y1: vy1,
                    x2: vx2,
                    y2: vy2,
                    width: viewport.width,
                    height: viewport.height,
                    pageNumber: pageNum,
                },
                rects: [
                    {
                        x1: vx1,
                        y1: vy1,
                        x2: vx2,
                        y2: vy2,
                        width: viewport.width,
                        height: viewport.height,
                        pageNumber: pageNum,
                    },
                ],
            },
            content: { text: risk.paragraph },
            comment: { text: risk.reason, emoji: "" },
        };
    };

    const findHighlightsInPdf = async (pdf: any) => {
        const newHighlights: IHighlight[] = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            for (const risk of riskyClauses) {
                // Get the first 5 words of the paragraph to search for
                const sanitizedRiskParagraph = risk.paragraph.replace("Risk Clause: ", ' ').trim().split(" ").slice(0, 5).join(" ");
                const matchItem = textContent.items.find((it: any) =>
                    it.str.includes(sanitizedRiskParagraph)
                );
                if (matchItem) newHighlights.push(buildHighlight(pageNum, page, matchItem, risk));
            }
        }
        console.log("Found highlights:", newHighlights);
        setHighlights(newHighlights);
    };

    useEffect(() => {
        window.addEventListener("hashchange", scrollToHighlightFromHash, false);
        return () => {
            window.removeEventListener(
                "hashchange",
                scrollToHighlightFromHash,
                false,
            );
        };
    }, [scrollToHighlightFromHash]);

    useEffect(() => {
        if (pdfDocument) findHighlightsInPdf(pdfDocument);
    }, [pdfDocument]);

    return (
        <div className="App" style={{ display: "flex", height: "75vh" }}>
            <div className="border-10 md:border-40 border-[#474747] rounded-[20px] h-full w-full md:w-4/5 relative"
            >
                <PdfLoader url={pdfUrl} beforeLoad={<Loader />}>
                    {(doc) => {
                        if (!pdfDocument) setTimeout(() => setPdfDocument(doc), 100);
                        return (
                            <PdfHighlighter
                                key={highlights.length}
                                pdfDocument={pdfDocument}
                                ref={highlighterRef}
                                enableAreaSelection={(event) => event.altKey}
                                onScrollChange={resetHash}
                                scrollRef={(scrollTo) => {
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

            <div className="hidden md:block overflow-y-auto pr-5">
                <RiskSidebar
                    highlights={highlights}
                    risks={riskWithIds}
                />
            </div>
        </div>
    );
};
