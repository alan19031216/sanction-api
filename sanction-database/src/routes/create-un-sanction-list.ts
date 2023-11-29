import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import fs from 'fs';
import convert from 'xml-js';
import { body } from "express-validator";
import { validateRequest, BadRequestError, requireAuth, NotAuthorizedError, NotFoundError } from "sanction-common";

import { Admin } from "../models/admin";
import { SanctionDatabase } from "../models/sanction-database";
import { UNSanctionAttrs } from "../models/un-sanction";
import { extractAliasName, extractDate, extractText } from "../utils/extractValue";

const router = express.Router();


router.post(
    "/api/sanction-list/create/un",
    requireAuth,
    [
        body('sanctionDatabaseId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('SanctionDatabaseId must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { sanctionDatabaseId } = req.body
        const admin = await Admin.findById(req.token!.id)
        if (!admin) {
            throw new NotAuthorizedError()
        }

        const sanctionDatabase = await SanctionDatabase.findById(sanctionDatabaseId)
        if (!sanctionDatabase) {
            throw new NotFoundError("Sanction database not found")
        }

        fs.readFile(`${__dirname}/xm.xml`, 'utf8', (err, data) => {
            if (err) {
                // Handle the error
                throw err;
            }

            // Log the contents of the file
            const xml = convert.xml2json(data, { compact: true });
            const xmlToJson = JSON.parse(xml)

            // for()
            let individualArrayJson = []
            for (const individual of xmlToJson.INDIVIDUALS.INDIVIDUAL) {
                console.log(individual)

                let sanction: UNSanctionAttrs = {
                    type: "Individual",
                    databaseId: sanctionDatabaseId
                }

                if (individual['DATAID'] != null && individual['DATAID'] != undefined) {
                    if (individual['DATAID']['_text'] != null && individual['DATAID']['_text'] != undefined) {
                        sanction.unDataId = individual['DATAID']['_text']
                    }
                }

                if (individual['VERSIONNUM'] != null && individual['VERSIONNUM'] != undefined) {
                    if (individual['VERSIONNUM']['_text'] != null && individual['VERSIONNUM']['_text'] != undefined) {
                        sanction.unVersion = individual['VERSIONNUM']['_text']
                    }
                }

                if (individual['FIRST_NAME'] != null && individual['FIRST_NAME'] != undefined) {
                    if (individual['FIRST_NAME']['_text'] != null && individual['FIRST_NAME']['_text'] != undefined) {
                        sanction.firstName = individual['FIRST_NAME']['_text']
                    }
                }

                if (individual['SECOND_NAME'] != null && individual['SECOND_NAME'] != undefined) {
                    if (individual['SECOND_NAME']['_text'] != null && individual['SECOND_NAME']['_text'] != undefined) {
                        sanction.secondName = individual['SECOND_NAME']['_text']
                    }
                }

                if (individual['THIRD_NAME'] != null && individual['THIRD_NAME'] != undefined) {
                    if (individual['THIRD_NAME']['_text'] != null && individual['THIRD_NAME']['_text'] != undefined) {
                        sanction.thirdName = individual['THIRD_NAME']['_text']
                    }
                }

                if (individual['FOURTH_NAME'] != null && individual['FOURTH_NAME'] != undefined) {
                    if (individual['FOURTH_NAME']['_text'] != null && individual['FOURTH_NAME']['_text'] != undefined) {
                        sanction.fourthName = individual['FOURTH_NAME']['_text']
                    }
                }

                if (individual['UN_LIST_TYPE'] != null && individual['UN_LIST_TYPE'] != undefined) {
                    if (individual['UN_LIST_TYPE']['_text'] != null && individual['UN_LIST_TYPE']['_text'] != undefined) {
                        sanction.unListType = individual['UN_LIST_TYPE']['_text']
                    }
                }

                if (individual['REFERENCE_NUMBER'] != null && individual['REFERENCE_NUMBER'] != undefined) {
                    if (individual['REFERENCE_NUMBER']['_text'] != null && individual['REFERENCE_NUMBER']['_text'] != undefined) {
                        sanction.unReferenceNumber = individual['REFERENCE_NUMBER']['_text']
                    }
                }

                if (individual['LISTED_ON'] != null && individual['LISTED_ON'] != undefined) {
                    if (individual['LISTED_ON']['_text'] != null && individual['LISTED_ON']['_text'] != undefined) {
                        sanction.listedOn = new Date(individual['LISTED_ON']['_text'])
                    }
                }

                if (individual['NAME_ORIGINAL_SCRIPT'] != null && individual['NAME_ORIGINAL_SCRIPT'] != undefined) {
                    if (individual['NAME_ORIGINAL_SCRIPT']['_text'] != null && individual['NAME_ORIGINAL_SCRIPT']['_text'] != undefined) {
                        sanction.originalName = individual['NAME_ORIGINAL_SCRIPT']['_text']
                    }
                }

                if (individual['COMMENTS1'] != null && individual['COMMENTS1'] != undefined) {
                    if (individual['COMMENTS1']['_text'] != null && individual['COMMENTS1']['_text'] != undefined) {
                        sanction.description = individual['COMMENTS1']['_text']
                    }
                }

                if (individual['TITLE'] != null && individual['TITLE'] != undefined) {
                    if (individual['TITLE']['VALUE'] != null && individual['TITLE']['VALUE'] != undefined) {
                        sanction.title = extractText(individual['TITLE']['VALUE']);
                    }
                }

                if (individual['DESIGNATION'] != null && individual['DESIGNATION'] != undefined) {
                    if (individual['DESIGNATION']['VALUE'] != null && individual['DESIGNATION']['VALUE'] != undefined) {
                        sanction.designation = extractText(individual['DESIGNATION']['VALUE']);
                    }
                }

                if (individual['NATIONALITY'] != null && individual['NATIONALITY'] != undefined) {
                    if (individual['NATIONALITY']['VALUE'] != null && individual['NATIONALITY']['VALUE'] != undefined) {
                        sanction.nationality = extractText(individual['NATIONALITY']['VALUE']);
                    }
                }

                if (individual['LIST_TYPE'] != null && individual['LIST_TYPE'] != undefined) {
                    if (individual['LIST_TYPE']['VALUE'] != null && individual['LIST_TYPE']['VALUE'] != undefined) {
                        if (individual['LIST_TYPE']['VALUE']['_text'] != null && individual['LIST_TYPE']['VALUE']['_text'] != undefined) {
                            sanction.listType = individual['LIST_TYPE']['VALUE']['_text'];
                        }
                    }
                }

                if (individual['LAST_DAY_UPDATED'] != null && individual['LAST_DAY_UPDATED'] != undefined) {
                    if (individual['LAST_DAY_UPDATED']['VALUE'] != null && individual['LAST_DAY_UPDATED']['VALUE'] != undefined) {
                        sanction.lastUpdated = extractDate(individual['LAST_DAY_UPDATED']['VALUE']);
                    }
                }

                if (individual['INDIVIDUAL_ALIAS'] != null && individual['INDIVIDUAL_ALIAS'] != undefined) {
                    sanction.aliasName = extractAliasName(individual['INDIVIDUAL_ALIAS']);
                }

                individualArrayJson.push(sanction)
            }

            res.json(individualArrayJson)
        });
    }
);

export { router as createSanctionListRouter };