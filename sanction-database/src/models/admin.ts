import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new User
// this is for input field
interface AdminAttrs {
  id: string;
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
  name: string;
}

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

// adminSchema.pre("save", async function (done) {

//   done();
// });

// This is to add a new function build
adminSchema.statics.build = (attrs: AdminAttrs) => {
  return new Admin({
    _id: attrs.id,
    name: attrs.name
  })
};

const Admin = mongoose.model<AdminDoc, AdminModel>("Admin", adminSchema);

// const buildUser = (attrs: AdminAttrs) => {
//   return new User(attrs);
// };

// export { User, buildUser };

export { Admin };
