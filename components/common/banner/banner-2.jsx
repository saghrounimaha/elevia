import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/features/product-slice";
import FeatureProduct from "../product/feature-product";
import { useListFeatureQuery } from "@/redux/features/propertiesApi";
import { useState,useEffect } from "react";
const BannerTwo = ({df,h4}) => {
  const [productData, setProductData] = useState();
  const { data, isLoading, isFetching } = useListFeatureQuery();
  useEffect(() => {
     if (!isLoading && !isFetching && data){
      setProductData(data.data.listProducts.items);
      }
    }, [data]);


  return (
    <>
      <div className="banner__area-2 pb-60">
        <div className={`container-fluid ${df ? '' : 'p-0'}`}>
          <div className="row g-0">
            {productData &&productData.map((product, index) => (
              <FeatureProduct key={index} index={index} product={product} h4={h4} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerTwo;