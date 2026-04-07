import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity("positions")
export class Position extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: "varchar", length: 64, unique: true })
    code!: string;

    @Column({ name: "title_en", type: "varchar", length: 255, unique: true })
    titleEn!: string;

    @OneToMany(() => Customer, (customer) => customer.position)
    customers!: Customer[];
}