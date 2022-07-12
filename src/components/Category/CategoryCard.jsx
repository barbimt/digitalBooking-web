import React from "react";
import "./categories.css"; 
import {useState} from "react";

function CategoryCard({ item, categorySelected, idCategorySelected }) {

  const handleCategorySelected = () => {
    categorySelected(item.id);
  }

  return (
    <div className={idCategorySelected === item.id ? "card-selected category-card" : "category-card"   } onClick={handleCategorySelected}>
      <img
        className="category-card-img"
        src={item.urlImagen}
        alt={item.titulo}
        ></img> 
      <div className="text-card">
        <h3 className="title-category-card">{item.titulo}</h3>
        <p className="cantidad-text">{item.descripcion}</p>
      </div>
    </div>
  );
}

export default CategoryCard;
