import React from 'react';
import useGlobalContext from '../../../hooks/use-context';


const categoryData = [
  {title:'cuisine'},
  {title:'couverts'},
  {title:"bols"},
  {title:"beurriers"},
  {title:"plateaux"},
  {title:"divers"},
]
const ProductCategories = () => {


 


  const {handleCategoryChange,categoryActive} = useGlobalContext();

  return (
    // <>
    //   <div className="sidebar__widget mb-55">
    //     <div className="sidebar__widget-title mb-25">
    //       <h3>Product Categories</h3>
    //     </div>
    //     <div className="sidebar__widget-content">
    //       <div className="categories">
    //         <div className='categories__list'>
    //           <ul>
    //             {categoryData.map((category,index) => (
    //               <li className={categoryActive === category.title ? 'active' : ''} 
    //               onClick={()=> handleCategoryChange(category.title)} key={index}>
    //                 {category.title}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
     <>
      <div className="sidebar__widget mb-55">
        <div className="sidebar__widget-title mb-25">
          <h3>Product Categories</h3>
        </div>
        <div className="sidebar__widget-content">
          <div className="categories">
            <div className='categories__list'>
              <ul>
              <li > <a href='/cuisine'>cuisine</a></li>
              <li > <a href='/couverts'>couverts</a></li>
              <li > <a href='/bols'>bols</a></li>
              <li > <a href='/beurriers'>beurriers</a></li>
              <li > <a href='/divers'>divers</a></li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategories;


