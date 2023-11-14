import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new User
// this is for input field
interface SanctionDatabaseAttrs {
    name: string;
    price: number;
    currency: string;
    minimumQuantity: number;
    url?: string;
}

// An interface that describes the properties
// that a User Model has
// this is to define the new function build
interface SanctionDatabaseModel extends mongoose.Model<SanctionDatabaseDoc> {
    build(attrs: SanctionDatabaseAttrs): SanctionDatabaseDoc;
}

// An interface that describes the properties
// that a User Document has
// this is for the output or access the data
interface SanctionDatabaseDoc extends mongoose.Document {
    name: string;
    price: number;
    currency: string;
    minimumQuantity: number;
}

const sanctionDatabaseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        minimumQuantity: {
            type: Number,
            required: true,
        },
        url: {
            type: String
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

// sanctionDatabaseSchema.pre("save", async function (done) {

//   done();
// });

// This is to add a new function build
sanctionDatabaseSchema.statics.build = (attrs: SanctionDatabaseAttrs) => {
    return new SanctionDatabase(attrs);
};

const SanctionDatabase = mongoose.model<SanctionDatabaseDoc, SanctionDatabaseModel>("SanctionDatabase", sanctionDatabaseSchema);

// const buildUser = (attrs: SanctionDatabaseAttrs) => {
//   return new User(attrs);
// };

// export { User, buildUser };

export { SanctionDatabase };
