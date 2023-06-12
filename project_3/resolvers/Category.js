import {animals} from "../db.js";

export const Category = {
    animals: (parent, args) => {
        return animals.filter(animal => {
            return animal.category === parent.id
        })
    }
}
