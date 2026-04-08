import { Meteor } from "meteor/meteor";
import { ensureDatabase } from "/imports/startup/server/database";
import { Translation } from "/imports/db/entities/Translation";

type TranslateMethodResult = {
    sourceText: string;
    translatedText: string;
    langTo: string;
};

Meteor.methods({
    async "translations.translate"(
        sourceText: string,
        langTo = "ru"
    ): Promise<TranslateMethodResult> {
        if (typeof sourceText !== "string" || !sourceText.trim()) {
            throw new Meteor.Error("validation-error", "sourceText must be a non-empty string");
        }

        if (typeof langTo !== "string" || !langTo.trim()) {
            throw new Meteor.Error("validation-error", "langTo must be a non-empty string");
        }

        await ensureDatabase();

        const normalizedSourceText = sourceText.trim();
        const normalizedLangTo = langTo.trim();

        const row = await Translation.findOneBy({
            sourceText: normalizedSourceText,
            langTo: normalizedLangTo,
        });

        return {
            sourceText: normalizedSourceText,
            translatedText: row?.translatedText ?? normalizedSourceText,
            langTo: normalizedLangTo,
        };
    },
});