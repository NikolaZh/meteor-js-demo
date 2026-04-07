import { Meteor } from "meteor/meteor";
import { AppDataSource } from "../../db/data-source";
import { seedDatabase } from "./seed";

let initPromise: Promise<void> | null = null;

async function initDatabaseInternal(): Promise<void> {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("[db] TypeORM connected");
    }

    await seedDatabase();
}

export function ensureDatabase(): Promise<void> {
    if (!initPromise) {
        initPromise = initDatabaseInternal().catch((error) => {
            initPromise = null;
            throw error;
        });
    }

    return initPromise;
}

Meteor.startup(async () => {
    await ensureDatabase();
});