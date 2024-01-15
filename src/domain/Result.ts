import { Mychatmember } from "./Mychatmember";
import Message from "./message.model";

export interface Result {
    update_id: number;
    message?: Message;
    my_chat_member?: Mychatmember;
}
