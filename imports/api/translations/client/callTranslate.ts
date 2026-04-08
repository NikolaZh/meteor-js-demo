import { Meteor } from "meteor/meteor";

export type TranslateMethodResult = {
    sourceText: string;
    translatedText: string;
    langTo: string;
};

export const callTranslate = (
    sourceText: string,
    langTo = "ru"
): Promise<TranslateMethodResult> => {
    return new Promise((resolve, reject) => {
        Meteor.call(
            "translations.translate",
            sourceText,
            langTo,
            (error: Meteor.Error | undefined, result: TranslateMethodResult) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );
    });
};