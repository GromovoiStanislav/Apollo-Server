import {categories, reviews} from "../db.js";

export const Product = {
    category: ({categoryId}, args) => {
        return categories.find(category => category.id === categoryId);
    },
    reviews: ({id}, args) => {
        return reviews.filter(review => review.productId === id);
    },
};
