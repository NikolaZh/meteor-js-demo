import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("translations")
export class Translation extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ name: "source_text", type: "varchar", length: 255 })
    sourceText!: string;

    @Column({ name: "lang_to", type: "varchar", length: 10, default: "ru" })
    langTo!: string;

    @Column({ name: "translated_text", type: "varchar", length: 255 })
    translatedText!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt!: Date;
}