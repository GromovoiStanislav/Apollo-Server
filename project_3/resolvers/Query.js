import {animals, categories, mainCards} from "../db.js";

export const Query = {
    mainCards: (parent, args) => mainCards,

    animals: (parent, args) => animals,

    animal: (parent, args) => {
        let animal = animals.find(animal => {
            return animal.slug === args.slug
        })
        return animal
    },

    categories: (parent, args) => categories,

    category: (parent, args) => {
        let category = categories.find(category => {
            return category.slug === args.slug
        });
        return category;
    }

}

