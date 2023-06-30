import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field
} from "type-graphql";
import {Product} from "../entity/Product.js";


@InputType()
class ProductInput {
    @Field()
    name!: string;

    @Field(() => Int)
    quantity!: number;
}


@InputType()
class ProductUpdateInput {
    @Field(() => String, {nullable: true})
    name?: string;

    @Field(() => Int, {nullable: true})
    quantity?: number;
}


@Resolver(Product)
export class ProductResolver {

    @Mutation(() => Product)
    async createProduct(
        // @Arg("name") name: string,
        // @Arg("quantity", () => Int) quantity: number
        @Arg("variables", () => ProductInput) variables: ProductInput
    ) {
        const newProduct = Product.create();
        newProduct.name = variables.name
        newProduct.quantity = variables.quantity
        return newProduct.save();
    }


    @Mutation(() => Boolean)
    async deleteProduct(@Arg("id", () => Int) id: number) {
        const res = await Product.delete(id);
        return !!res.affected;
    }


    @Mutation(() => Boolean)
    async updateProduct(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => ProductUpdateInput) fields: ProductUpdateInput
    ) {
        const res = await Product.update({id}, fields);
        return !!res.affected;
    }


    @Query(() => [Product])
    products() {
        return Product.find({
            order: {
                id: "ASC"
            }
        });
    }


    @Query(() => Product, {nullable: true})
    product(@Arg("id", () => Int) id: number) {
        return Product.findOneBy({id});
    }
}