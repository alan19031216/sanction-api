import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are required to create a new User
// this is for input field
interface AdminAttrs {
  email: string;
  password: string;
  salt: string;
  name: string;
}

// An interface that describes the properties
// that a User Model has
// this is to define the new function build
interface AdminModel extends mongoose.Model<AdminDoc> {
  build(attrs: AdminAttrs): AdminDoc;
}

// An interface that describes the properties
// that a User Document has
// this is for the output or access the data
interface AdminDoc extends mongoose.Document {
  email: string;
  password: string;
  salt: string;
  name: string;
}

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    name: {
      type: String,
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

adminSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

// This is to add a new function build
adminSchema.statics.build = (attrs: AdminAttrs) => {
  return new Admin(attrs);
};

const Admin = mongoose.model<AdminDoc, AdminModel>("Admin", adminSchema);

// const buildUser = (attrs: AdminAttrs) => {
//   return new User(attrs);
// };

// export { User, buildUser };

export { Admin };
