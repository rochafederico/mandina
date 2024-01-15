import { Chat } from "./Chat";
import { Entity } from "./Entity";
import { From } from "./From";
import { Newchatparticipant } from "./Newchatparticipant";

export default class Message {
    message_id: number;
    from: From;
    chat: Chat;
    date: number;
    text?: string;
    entities?: Entity[];
    new_chat_participant?: Newchatparticipant;
    new_chat_member?: Newchatparticipant;
    new_chat_members?: Newchatparticipant[];
}
