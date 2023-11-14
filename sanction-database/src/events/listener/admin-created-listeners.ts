import { AdminCreatedEvent, Listener, Subjects, QueueGroupName } from "sanction-common";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../nats-wrapper";
import { Admin } from "../../models/admin";

export class AdminCreatedListener extends Listener<AdminCreatedEvent> {
    subject: Subjects.AdminCreated = Subjects.AdminCreated

    queueGroupName = QueueGroupName.AdminService

    async onMessage(data: AdminCreatedEvent['data'], msg: Message) {
        const adminCheck = await Admin.findById(data.id)

        if (adminCheck) {
            throw new Error("Admin existed")
        }

        const admin = Admin.build({ name: data.name, id: data.id })
        await admin.save()

        msg.ack()
    }
}