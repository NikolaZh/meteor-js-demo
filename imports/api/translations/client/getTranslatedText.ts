import { callTranslate } from "./callTranslate";

const translationCache = new Map<string, string>();
const translationRequestsInProgress = new Map<string, Promise<string>>();

const getTranslationKey = (sourceText: string, langTo: string): string => {
    return `${langTo}::${sourceText}`;
};

export const getTranslatedText = async (sourceText: string, langTo: string): Promise<string> => {
    const key = getTranslationKey(sourceText, langTo);

    const cachedTranslation = translationCache.get(key);
    if (cachedTranslation) {
        return cachedTranslation;
    }

    const requestInProgress = translationRequestsInProgress.get(key);
    if (requestInProgress) {
        return requestInProgress;
    }

    const request = callTranslate(sourceText, langTo)
        .then((result) => {
            translationCache.set(key, result.translatedText);
            translationRequestsInProgress.delete(key);

            return result.translatedText;
        })
        .catch((error) => {
            translationRequestsInProgress.delete(key);
            throw error;
        });

    translationRequestsInProgress.set(key, request);

    return request;
};