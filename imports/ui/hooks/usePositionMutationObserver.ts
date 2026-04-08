import { RefObject, useEffect } from "react";
import { getTranslatedText } from "../../api/translations/client/getTranslatedText";

const TARGET_LANG = "ru";

const translateCell = async (cell: Element, cellsInProgress: WeakSet<Element>): Promise<void> => {
    if (!(cell instanceof HTMLElement)) {
        return;
    }

    if (cellsInProgress.has(cell)) {
        return;
    }

    const sourceText = cell.dataset.sourceText?.trim() ?? "";
    const translatedFrom = cell.dataset.translatedFrom?.trim() ?? "";

    if (!sourceText) {
        return;
    }

    if (translatedFrom === sourceText) {
        return;
    }

    cellsInProgress.add(cell);

    try {
        const translatedText = await getTranslatedText(sourceText, TARGET_LANG);

        cell.textContent = translatedText;
        cell.dataset.translatedFrom = sourceText;
    } catch (error) {
        console.error("[translate] failed:", error);
    } finally {
        cellsInProgress.delete(cell);
    }
};


type UsePositionMutationObserverParams = {
    containerRef: RefObject<HTMLElement | null>;
    enabled: boolean;
};

export const usePositionMutationObserver = ({
    containerRef,
    enabled,
}: UsePositionMutationObserverParams): void => {
    useEffect(() => {
        const container = containerRef.current;

        if (!enabled || !container) {
            return;
        }

        const cellsInProgress = new WeakSet<Element>();

        container.querySelectorAll(".__t").forEach((cell) => {
            translateCell(cell, cellsInProgress);
        });

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        if (!(node instanceof Element)) {
                            return;
                        }

                        if (node.classList.contains("__t")) {
                            translateCell(node, cellsInProgress);
                        }

                        node.querySelectorAll(".__t").forEach((cell) => {
                            translateCell(cell, cellsInProgress);
                        });
                    });
                }

                if (mutation.type === "characterData") {
                    const parent = mutation.target.parentElement;

                    if (parent?.classList.contains("__t")) {
                        translateCell(parent, cellsInProgress);
                    }
                }
            });
        });

        observer.observe(container, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => {
            observer.disconnect();
        };
    }, [containerRef, enabled]);
}





