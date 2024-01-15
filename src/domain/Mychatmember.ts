import { Chat } from "./Chat";
import { From } from "./From";
import { Oldchatmember } from "./Oldchatmember";

export interface Mychatmember {
    chat: Chat;
    from: From;
    date: number;
    old_chat_member: Oldchatmember;
    new_chat_member: Oldchatmember;
}
