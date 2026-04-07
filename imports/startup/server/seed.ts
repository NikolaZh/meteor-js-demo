import { AppDataSource } from "../../db/data-source";
import { Customer } from "../../db/entities/Customer";
import { Position } from "../../db/entities/Position";
import { Translation } from "../../db/entities/Translation";

export async function seedDatabase(): Promise<void> {
    const positionRepo = AppDataSource.getRepository(Position);
    const customerRepo = AppDataSource.getRepository(Customer);
    const translationRepo = AppDataSource.getRepository(Translation);

    const positionsCount = await positionRepo.count();
    if (positionsCount > 0) {
        return;
    }

    const officer = positionRepo.create({ code: "officer", titleEn: "officer" });
    const manager = positionRepo.create({ code: "manager", titleEn: "manager" });
    const operator = positionRepo.create({ code: "operator", titleEn: "operator" });

    await positionRepo.save([officer, manager, operator]);

    await customerRepo.save([
        customerRepo.create({
            fullName: "Dino Fabrello",
            positionId: officer.id,
        }),
        customerRepo.create({
            fullName: "Walter Marangoni",
            positionId: manager.id,
        }),
        customerRepo.create({
            fullName: "Angelo Ottogialli",
            positionId: operator.id,
        }),
    ]);

    await translationRepo.save([
        translationRepo.create({
            sourceText: "officer",
            langTo: "ru",
            translatedText: "офицер",
        }),
        translationRepo.create({
            sourceText: "manager",
            langTo: "ru",
            translatedText: "менеджер",
        }),
        translationRepo.create({
            sourceText: "operator",
            langTo: "ru",
            translatedText: "оператор",
        }),
    ]);

    console.log("[db] seed completed");
}