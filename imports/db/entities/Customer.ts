import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Position } from "./Position";

@Entity("customers")
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ name: "full_name", type: "varchar", length: 255 })
    fullName!: string;

    @Column({ name: "position_id", type: "int", unsigned: true })
    positionId!: number;

    @ManyToOne(() => Position, (position) => position.customers, {
        nullable: false,
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "position_id" })
    position!: Position;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt!: Date;
}