import ProductCard from "./ProductCard";
import "./products.css";
import { useState } from "react";
import Spinner from "./../Spinner/Spinner";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from "@fortawesome/free-solid-svg-icons";


function ProductList({ products, openModalMap, categorySelected, isLoading, cleanFilterProducts }) {
  //const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="section-products">
      <div className="product-list">
   <div className="flex">
        <h2 className="product-list-title">
          Recomendaciones
          {categorySelected !== null ? ` para ${categorySelected.titulo}`: ""}
        </h2>

        {categorySelected !== null ? 
            <div className=" flex tag-cleanFilterProducts" onClick={cleanFilterProducts}>
              <FontAwesomeIcon icon={faX} className="icon-filter-close"/> 
              <small className="small-filter">Limpiar filtro</small>
            </div>    
          : ""  }
</div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="product-container">
            {products.map((item, index) => (
              <ProductCard
                key={index}
                item={item}
                openModalMap={openModalMap}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
