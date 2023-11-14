import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are required to create a new User
// this is for input field
interface SubscriptionAttrs {
    apiKey: string;
    database: [{
        name: string;
        remainingBalance: number;
        maxUsage: number;
    }]
    createdDate: Date
    expiryDate: Date
}

// An interface that describes the properties
// that a User Model has
// this is to define the new function build
interface SubscriptionModel extends mongoose.Model<SubscriptionDoc> {
    build(attrs: SubscriptionAttrs): SubscriptionDoc;
}

// An interface that describes the properties
// that a User Document has
// this is for the output or access the data
interface SubscriptionDoc extends mongoose.Document {
    email: string;
    database: [{
        name: string;
        remainingBalance: number;
        maxUsage: number;
    }]
    createdDate: Date
    expiryDate: Date
}

const subscriptionSchema = new mongoose.Schema(
    {
        apiKey: {
            type: String,
            required: true,
        },
        database: [{
            name: {
                type: String
            },
            remainingBalance: {
                type: Number
            },
            maxUsage: {
                type: Number
            }
        }],
        createdDate: {
            type: Date,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.salt;
                delete ret.__v;
            },
        },
    }
);

// This is to add a new function build
subscriptionSchema.statics.build = (attrs: SubscriptionAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<SubscriptionDoc, SubscriptionModel>("Subscription", subscriptionSchema);

// const buildUser = (attrs: SubscriptionAttrs) => {
//   return new User(attrs);
// };

// export { User, buildUser };

export { User };
