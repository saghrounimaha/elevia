/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
export const onCreateOrders = /* GraphQL */ `
  subscription OnCreateOrders(
    $filter: ModelSubscriptionOrdersFilterInput
    $owner: String
  ) {
    onCreateOrders(filter: $filter, owner: $owner) {
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
export const onUpdateOrders = /* GraphQL */ `
  subscription OnUpdateOrders(
    $filter: ModelSubscriptionOrdersFilterInput
    $owner: String
  ) {
    onUpdateOrders(filter: $filter, owner: $owner) {
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
export const onDeleteOrders = /* GraphQL */ `
  subscription OnDeleteOrders(
    $filter: ModelSubscriptionOrdersFilterInput
    $owner: String
  ) {
    onDeleteOrders(filter: $filter, owner: $owner) {
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
export const onCreateFavorite = /* GraphQL */ `
  subscription OnCreateFavorite(
    $filter: ModelSubscriptionFavoriteFilterInput
    $owner: String
  ) {
    onCreateFavorite(filter: $filter, owner: $owner) {
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
export const onUpdateFavorite = /* GraphQL */ `
  subscription OnUpdateFavorite(
    $filter: ModelSubscriptionFavoriteFilterInput
    $owner: String
  ) {
    onUpdateFavorite(filter: $filter, owner: $owner) {
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
export const onDeleteFavorite = /* GraphQL */ `
  subscription OnDeleteFavorite(
    $filter: ModelSubscriptionFavoriteFilterInput
    $owner: String
  ) {
    onDeleteFavorite(filter: $filter, owner: $owner) {
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
export const onCreateCart = /* GraphQL */ `
  subscription OnCreateCart($filter: ModelSubscriptionCartFilterInput) {
    onCreateCart(filter: $filter) {
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
export const onUpdateCart = /* GraphQL */ `
  subscription OnUpdateCart($filter: ModelSubscriptionCartFilterInput) {
    onUpdateCart(filter: $filter) {
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
export const onDeleteCart = /* GraphQL */ `
  subscription OnDeleteCart($filter: ModelSubscriptionCartFilterInput) {
    onDeleteCart(filter: $filter) {
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
export const onCreateSubscribe = /* GraphQL */ `
  subscription OnCreateSubscribe(
    $filter: ModelSubscriptionSubscribeFilterInput
    $owner: String
  ) {
    onCreateSubscribe(filter: $filter, owner: $owner) {
      id
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateSubscribe = /* GraphQL */ `
  subscription OnUpdateSubscribe(
    $filter: ModelSubscriptionSubscribeFilterInput
    $owner: String
  ) {
    onUpdateSubscribe(filter: $filter, owner: $owner) {
      id
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteSubscribe = /* GraphQL */ `
  subscription OnDeleteSubscribe(
    $filter: ModelSubscriptionSubscribeFilterInput
    $owner: String
  ) {
    onDeleteSubscribe(filter: $filter, owner: $owner) {
      id
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
