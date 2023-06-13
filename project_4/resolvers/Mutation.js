import {randomUUID} from "node:crypto"
import {categories, products, reviews} from "../db.js";

export const Mutation = {

    addCategory: (parent, {input}) => {
        const {name} = input;
        const newCategory = {
            id: randomUUID(),
            name,
        };
        categories.push(newCategory);
        return newCategory;
    },

    addProduct: (parent, {input}) => {
        const {name, image, price, onSale, quantity, categoryId} = input;
        const newProduct = {
            id: randomUUID(),
            name,
            image,
            price,
            onSale,
            quantity,
            categoryId,
        };
        products.push(newProduct);
        return newProduct;
    },

    addReview: (parent, {input}) => {
        const {date, title, comment, rating, productId} = input;
        const newReview = {
            id: randomUUID(),
            date,
            title,
            comment,
            rating,
            productId,
        };
        reviews.push(newReview);
        return newReview;
    },

    deleteCategory: (parent, {id}) => {
        categories = categories.filter((category) => category.id !== id);
        products = products.map((product) => {
            if (product.categoryId === id)
                return {
                    ...product,
                    categoryId: null,
                };
            else return product;
        });
        return true;
    },

    deleteProduct: (parent, {id}) => {
        products = products.filter((product) => product.id !== id);
        reviews = reviews.filter((review) => review.productId !== id);
        return true;
    },

    deleteReview: (parent, {id}) => {
        reviews = reviews.filter((review) => review.id !== id);
        return true;
    },

    updateCategory: (parent, {id, input}) => {
        const index = categories.findIndex((category) => category.id === id);
        if (index === -1) return null;
        categories[index] = {
            ...categories[index],
            ...input,
        };
        return categories[index];
    },

    updateProduct: (parent, {id, input}) => {
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) return null;
        products[index] = {
            ...products[index],
            ...input,
        };
        return products[index];
    },

    updateReview: (parent, {id, input}) => {
        const index = reviews.findIndex((review) => review.id === id);
        reviews[index] = {
            ...reviews[index],
            ...input,
        };
        return reviews[index];
    },

};
