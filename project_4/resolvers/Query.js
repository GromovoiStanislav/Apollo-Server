import {categories, products, reviews} from "../db.js";

export const Query = {
  hello: (parent, args) => "World",

  products: (parent, { filter }) => {
    let filteredProducts = products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= avgRating;
        });
      }
    }
    return filteredProducts;
  },

  product: (parent, { id }) => {
    return products.find((product) => product.id === id);
  },

  categories: (parent, args) => categories,

  category: (parent, { id }) => {
    return categories.find((category) => category.id === id);
  },

};
