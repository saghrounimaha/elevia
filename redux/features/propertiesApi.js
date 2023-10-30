
  import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { API, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';



export const propertiesApi = createApi({
    // baseQuery is included since TS throws an error that it's
    // required in createApi.
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql',
      }),
    endpoints: (builder) => ({
      listProperty: builder.query({
        async queryFn() {   
          try {
            const data = await API.graphql({
              query: `
              query ListProducts {
                listProducts{             
                 items {
                  id
                  name
                  price
                  category
                  weight
                  dimension
                  image
                  feature
                  onpromo
                  promo
                  new
                  quantity
                  createdAt
                
                  }
                }
              } `,
              //authMode:  GRAPHQL_AUTH_MODE.AWS_IAM,
            });
            return { data };
          } catch (error) {
            return { error };
          }
        }
      }),

      getDetailProduct: builder.query({
        async queryFn({ IDparam , ...params }) {
          try {
           // const data = await API.graphql(graphqlOperation(getAnnaonace, { id: IDparam }));
           const data = await API.graphql(
            {query: `
           query ListProducts {
            getProduct(id: "${IDparam}") {
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
              feature
              custom
              customtext
              trending
              createdAt
              updatedAt
            }
          } 
          `,
          //authMode:  GRAPHQL_AUTH_MODE.AWS_IAM,
          //authMode: GRAPHQL_AUTH_MODE.AWS_IAM || GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
            return { data };
          } catch (error) {
            
            return { error };
          }
        }
      }),
      listTrending: builder.query({
        async queryFn() {   
          try {
            const data = await API.graphql({
              query: `
              query ListProducts {  
                listProducts (filter:{trending: {eq: true}}) {             
                 items {
                  id
                  name
                  price
                  image
                  onpromo
                  promo
                  new
                  trending
                
                  }
                }
              } `,
              //authMode:  GRAPHQL_AUTH_MODE.AWS_IAM,
            });
            return { data };
          } catch (error) {
            return { error };
          }
        }
      }),
      listFeature: builder.query({
        async queryFn() {   
          try {
            const data = await API.graphql({
              query: `
              query ListProducts {  
                listProducts (filter:{feature: {eq: true}}, limit:2) {             
                 items {
                  id
                  name
                  price
                  image
                  feature
                  description
                  }
                }
              } `,
            });
            return { data };
          } catch (error) {
            return { error };
          }
        }
      }),
      listSale: builder.query({
        async queryFn() {   
          try {
            const data = await API.graphql({
              query: `
              query ListProducts {  
                listProducts (filter:{new: {eq: true},trending: {eq: true}}) {             
                 items {
                  id
                  name
                  price
                  image
                  onpromo
                  promo
                  new
                  trending
                
                  }
                }
              } `,
              // authMode:  AMAZON_COGNITO_USER_POOLS,
            });
            return { data };
          } catch (error) {
            return { error };
          }
        }
      }),
  

      categoryProperty: builder.query({
        async queryFn({ catparams , ...params }) {   
          if (catparams!=""){
          try {
            const data = await API.graphql({
              query: `
              query ListProducts {
              listProducts(filter: {category: {eq:"${catparams}"}}) {
                items {
                  category
                  id
                  name
                  price
                  description
                  dimension   
                  image
                  new
                  onpromo
                  promo
                  quantity
                  trending
                  updatedAt
                  weight
                  feature
                }
              }
              }`,
             // authMode:  GRAPHQL_AUTH_MODE.AWS_IAM,
            });
            return { data };
          } catch (error) {
            return { error };
          }
        }
        }
      }),
  
    })

  });
         
  export const { useListPropertyQuery, useGetDetailProductQuery,useListTrendingQuery,useListFeatureQuery,useListSaleQuery,useCategoryPropertyQuery } = propertiesApi;


