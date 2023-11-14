import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new User
// this is for input field
interface UNSanctionAttrs {
    type: string; // Individual or Corporate
    databaseId: string;
    firstName?: string;
    secondName?: string;
    thirdName?: string;
    unListType?: string;
    unReferenceNumber?: string;
    listedOn?: Date;
    gender?: string;
    originalName: string;
    description?: string; // COMMENTS1
    title?: [string];
    designation?: [string];
    nationality?: [string];
    listType?: string;
    lastUpdated?: [Date];
    aliasName?: [{
        quality?: string;
        aliasName?: string;
    }];
    address?: {
        country?: string;
        street?: string;
        city?: string;
        stateProvince?: string;
        zipCode?: string;
        note?: string;
    }
    dateOfBirth?: {
        typeOfDate?: string;
        year?: string;
        fromYear?: string;
        toYear?: string;
        date?: Date;
        note?: string;
    }
    placeOfBirth?: {
        city?: string;
        stateProvince?: string;
        country?: string;
    }
    document?: [{
        typeOfDocument?: string;
        typeOfDocument2?: string;
        number?: string;
        issuingCountry?: string;
        dateOfIssue?: Date;
        cityOfIssue?: string;
        countryOfIssue?: string;
        note?: string;
    }]
    unVersion: string;
    unDataId: string;
}

// An interface that describes the properties
// that a User Model has
// this is to define the new function build
interface UNSanctionModel extends mongoose.Model<UNSanctionDoc> {
    build(attrs: UNSanctionAttrs): UNSanctionDoc;
}

// An interface that describes the properties
// that a User Document has
// this is for the output or access the data
interface UNSanctionDoc extends mongoose.Document {
    type: string; // Individual or Corporate
    databaseId: string;
    firstName?: string;
    secondName?: string;
    thirdName?: string;
    unListType?: string;
    unReferenceNumber?: string;
    listedOn?: Date;
    gender?: string;
    originalName: string;
    description?: string; // COMMENTS1
    title?: [string];
    designation?: [string];
    nationality?: [string];
    listType?: string;
    lastUpdated?: [Date];
    aliasName?: [{
        quality?: string;
        aliasName?: string;
    }];
    address?: {
        country?: string;
        street?: string;
        city?: string;
        stateProvince?: string;
        zipCode?: string;
        note?: string;
    }
    dateOfBirth?: {
        typeOfDate?: string;
        year?: string;
        fromYear?: string;
        toYear?: string;
        date?: Date;
        note?: string;
    }
    placeOfBirth?: {
        city?: string;
        stateProvince?: string;
        country?: string;
    }
    document?: [{
        typeOfDocument?: string;
        typeOfDocument2?: string;
        number?: string;
        issuingCountry?: string;
        dateOfIssue?: Date;
        cityOfIssue?: string;
        countryOfIssue?: string;
        note?: string;
    }]
    unVersion: string;
    unDataId: string;
}

const unSanctionSchema = new mongoose.Schema(
    {
        type: {
            type: String
        },
        databaseId: {
            type: String
        },
        firstName: {
            type: String
        },
        secondName: {
            type: String
        },
        thirdName: {
            type: String
        },
        unListType: {
            type: String
        },
        unReferenceNumber: {
            type: String
        },
        listedOn: {
            type: Date
        },
        gender: {
            type: String
        },
        originalName: {
            type: String
        },
        description: {
            type: String
        },
        title: {
            type: [String]
        },
        designation: {
            type: [String]
        },
        nationality: {
            type: [String]
        },
        listType: {
            type: String
        },
        lastUpdated: {
            type: [Date]
        },
        aliasName: [{
            quality: {
                type: String
            },
            aliasName: {
                type: String
            },
        }],
        address: [{
            country: {
                type: String
            },
            street: {
                type: String
            },
            city: {
                type: String
            },
            stateProvince: {
                type: String
            },
            zipCode: {
                type: String
            },
            note: {
                type: String
            },
        }],
        dateOfBirth: [{
            typeOfDate: {
                type: String
            },
            year: {
                type: String
            },
            fromYear: {
                type: String
            },
            toYear: {
                type: String
            },
            date: {
                type: Date
            },
            note: {
                type: String
            },
        }],
        placeOfBirth: [{
            city: {
                type: String
            },
            stateProvince: {
                type: String
            },
            country: {
                type: String
            }
        }],
        document: [{
            typeOfDocument: {
                type: String
            },
            typeOfDocument2: {
                type: String
            },
            number: {
                type: String
            },
            issuingCountry: {
                type: String
            },
            dateOfIssue: {
                type: Date
            },
            cityOfIssue: {
                type: String
            },
            countryOfIssue: {
                type: String
            },
            note: {
                type: String
            },
        }],
        unVersion: {
            type: String
        },
        unDataId: {
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

// unSanctionSchema.pre("save", async function (done) {

//   done();
// });

// This is to add a new function build
unSanctionSchema.statics.build = (attrs: UNSanctionAttrs) => {
    return new UNSanction(attrs);
};

const UNSanction = mongoose.model<UNSanctionDoc, UNSanctionModel>("UNSanction", unSanctionSchema);

// const buildUser = (attrs: UNSanctionAttrs) => {
//   return new User(attrs);
// };

// export { User, buildUser };

export { UNSanction };
