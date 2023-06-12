import {randomUUID} from "node:crypto"
import {animals} from "../db.js";

export const Mutation = {
    addAnimal: (parent, args) => {
        const {image, title, rating, price, description, slug, stock, onSale, category} = args
        let newAnimal = {
            id: randomUUID(),
            image,
            title,
            rating,
            price,
            description,
            slug,
            stock,
            onSale,
            category,
        }
        animals.push(newAnimal)
        return newAnimal
    },

    removeAnimal: (parent, {id}) => {
        let index = animals.findIndex(animal => {
            return animal.id === id
        });
        animals.splice(index, 1);
        return true
    }
}


