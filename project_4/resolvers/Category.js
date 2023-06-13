import {products} from "../db.js";

export const Category = {
    products: ({id: categoryId}, {filter}) => {
        const categoryProducts = products.filter(
            product => product.categoryId === categoryId
        );
        let filteredCategoryProducts = categoryProducts;
        console.log(
            filter
        )
        if (filter) {
            if (filter.onSale === true) {
                filteredCategoryProducts = filteredCategoryProducts.filter(
                    product => {
                        return product.onSale;
                    }
                );
            }
        }

        return filteredCategoryProducts;
    },
};
