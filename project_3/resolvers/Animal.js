import {categories} from "../db.js";

export const Animal = {
    category: (parent, args) => {
        return categories.find(category => {
            return category.id === parent.category
        })
    }
}
