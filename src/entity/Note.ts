import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SharedNote } from "./SharedNote";
import { User } from "./User";

@Entity()
export class Note extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    @IsNotEmpty()
    @IsString()
    text: string;

    @Column()
    ownerId: number;
    @ManyToOne(() => User, user => user.notes)
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @OneToMany(() => SharedNote, sharedNote => sharedNote.note)
    shares: SharedNote[];
}