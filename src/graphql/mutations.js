/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      name
      price
      category
      description
      weight
      dimension
      image
      onpromo
      promo
      new
      quantity
      custom
      customtext
      trending
      feature
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      name
      price
      category
      description
      weight
      dimension
      image
      onpromo
      promo
      new
      quantity
      custom
      customtext
      trending
      feature
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      name
      price
      category
      description
      weight
      dimension
      image
      onpromo
      promo
      new
      quantity
      custom
      customtext
      trending
      feature
      createdAt
      updatedAt
    }
  }
`;
export const createOrders = /* GraphQL */ `
  mutation CreateOrders(
    $input: CreateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    createOrders(input: $input, condition: $condition) {
      id
      idproduct
      quantity
      promo
      status
      telephone
      address
      State
      FirstName
      LastName
      total
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateOrders = /* GraphQL */ `
  mutation UpdateOrders(
    $input: UpdateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    updateOrders(input: $input, condition: $condition) {
      id
      idproduct
      quantity
      promo
      status
      telephone
      address
      State
      FirstName
      LastName
      total
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteOrders = /* GraphQL */ `
  mutation DeleteOrders(
    $input: DeleteOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    deleteOrders(input: $input, condition: $condition) {
      id
      idproduct
      quantity
      promo
      status
      telephone
      address
      State
      FirstName
      LastName
      total
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createFavorite = /* GraphQL */ `
  mutation CreateFavorite(
    $input: CreateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    createFavorite(input: $input, condition: $condition) {
      name
      price
      image
      idproduct
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateFavorite = /* GraphQL */ `
  mutation UpdateFavorite(
    $input: UpdateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    updateFavorite(input: $input, condition: $condition) {
      name
      price
      image
      idproduct
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFavorite = /* GraphQL */ `
  mutation DeleteFavorite(
    $input: DeleteFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    deleteFavorite(input: $input, condition: $condition) {
      name
      price
      image
      idproduct
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCart = /* GraphQL */ `
  mutation CreateCart(
    $input: CreateCartInput!
    $condition: ModelCartConditionInput
  ) {
    createCart(input: $input, condition: $condition) {
      id
      products {
        id
        name
        price
        category
        description
        weight
        dimension
        image
        onpromo
        promo
        new
        quantity
        custom
        customtext
        trending
        feature
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCart = /* GraphQL */ `
  mutation UpdateCart(
    $input: UpdateCartInput!
    $condition: ModelCartConditionInput
  ) {
    updateCart(input: $input, condition: $condition) {
      id
      products {
        id
        name
        price
        category
        description
        weight
        dimension
        image
        onpromo
        promo
        new
        quantity
        custom
        customtext
        trending
        feature
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCart = /* GraphQL */ `
  mutation DeleteCart(
    $input: DeleteCartInput!
    $condition: ModelCartConditionInput
  ) {
    deleteCart(input: $input, condition: $condition) {
      id
      products {
        id
        name
        price
        category
        description
        weight
        dimension
        image
        onpromo
        promo
        new
        quantity
        custom
        customtext
        trending
        feature
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSubscribe = /* GraphQL */ `
  mutation CreateSubscribe(
    $input: CreateSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    createSubscribe(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateSubscribe = /* GraphQL */ `
  mutation UpdateSubscribe(
    $input: UpdateSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    updateSubscribe(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteSubscribe = /* GraphQL */ `
  mutation DeleteSubscribe(
    $input: DeleteSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    deleteSubscribe(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
