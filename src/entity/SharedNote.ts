import { BaseEntity, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./Note";
import { User } from "./User";

@Entity()
export class SharedNote extends BaseEntity {


    @PrimaryColumn()
    targetId: number;
    @ManyToOne(() => User, user => user.notesSharedWithYou)
    @JoinTable({name: 'targetId'})
    target: User;


    @PrimaryColumn()
    senderId: number;
    @ManyToOne(() => User, user => user.notesYouShared)
    @JoinColumn({name:'senderId'})
    sender:User;

    @PrimaryColumn()
    noteId:number;
    @ManyToOne(() => Note, note => note.shares)
    @JoinColumn({name:'noteId'})
    note: number;
}