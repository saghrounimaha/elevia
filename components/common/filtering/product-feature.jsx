import { selectProducts } from '../../../redux/features/product-slice';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useListFeatureQuery } from '@/redux/features/propertiesApi';
import { useState,useEffect } from "react";

const ProductFeature = () => {
  const [productData, setProductData] = useState();
  const { data, isLoading, isFetching } = useListFeatureQuery();
  useEffect(() => {
     if (!isLoading && !isFetching && data){
      setProductData(data.data.listProducts.items);
      }
    }, [data]);
    console.log(data)
  // const products = useSelector(selectProducts);
  // const featurePrd = products.map(prd => prd.product).flat().filter(item => item.feature_prd).slice(0, 2);

  return <>
    <div className="sidebar__widget">
      <div className="sidebar__widget-title mb-30">
        <h3>Featured Products</h3>
      </div>
      <div className="sidebar__widget-content">
        <div className="features__product">
          <ul>
            {productData && productData.slice(0, 2).map((product, index) => (
              <li key={index} className="mb-20">
                <div className="featires__product-wrapper d-flex">
                  <div className="features__product-thumb mr-15">
                    <Link href={`/product-details/${product.id}`}>

                      <img src={product.image[0]} alt="pro-sm-1" />

                    </Link>
                  </div>
                  <div className="features__product-content">
                    <h5>
                      <Link href={`/product-details/${product.id}`}>
                        {product.name}
                      </Link>
                    </h5>
                    <div className="price">
                      <span>${product.price}</span>
                      {product.price && <span className="price-old">${product.price}</span>}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </>;
};

export default ProductFeature;