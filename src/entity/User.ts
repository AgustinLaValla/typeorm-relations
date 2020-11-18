import { IsNotEmpty, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Note } from './Note';
import { SharedNote } from "./SharedNote";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    @IsNotEmpty()
    @IsString()
    username: string;

    @OneToMany(() => Note, note => note.owner)
    notes: Note[];

    @OneToMany(() => SharedNote, sharedNote => sharedNote.target)
    notesSharedWithYou: Note[];

    @OneToMany(() => SharedNote, sharedNote => sharedNote.sender)
    notesYouShared: Note[];
}
