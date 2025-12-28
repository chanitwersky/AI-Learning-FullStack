import { Collection } from "mongodb";

import DbConn from "../utils/db-conn.js";
import { Sub_category as SubCategoryModel } from "../models";

export default class SubCategoriesDal {
    private subCategoriesCollection: Collection<SubCategoryModel>;
    constructor(dbConn: DbConn) {
        this.subCategoriesCollection = dbConn.getLearningDB().collection("sub_categories");
    }

    async getSubCategoryId(category: string): Promise<string> {
        const subCategory = await this.subCategoriesCollection.findOne({ name: category });
        if (!subCategory) {
            throw new Error(`Sub-category with name ${category} not found`);
        }
        return subCategory.id;
    }

    async getcategoryId(category: string): Promise<string> {
        const subCategory = await this.subCategoriesCollection.findOne({ name: category });
        if (!subCategory) {
            throw new Error(`Sub-category with name ${category} not found`);
        }
        return subCategory.categoryId;
    }

}
