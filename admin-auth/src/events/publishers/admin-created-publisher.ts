import { AdminCreatedEvent, Publisher, Subjects } from "sanction-common";

export class AdminCreatedPublish extends Publisher<AdminCreatedEvent> {
    subject: Subjects.AdminCreated = Subjects.AdminCreated
}