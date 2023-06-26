import gql from 'graphql-tag';

const recipeSchema = gql`

  type Recipe {
    id: ID
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
  }
  
  input RecipeInput {
    name: String!
    description: String!
  }

  # union SingleRecipeResult = Recipe | NotExistsError

  type Query {
    recipe(id: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
  }

  type RecipeSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(id: ID!): RecipeSuccess
    editRecipe(id: ID!, recipeInput: RecipeInput): RecipeSuccess
    incrementThumbsUp(id: ID!): RecipeSuccess
    incrementThumbsDown(id: ID!): RecipeSuccess
  }
`;

export default recipeSchema;
