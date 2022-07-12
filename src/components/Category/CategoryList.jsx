import CategoryCard from "./CategoryCard";
import "./categories.css";
import MyLoader from "./SkeletonCategory";

function CategoryList({ categories, categorySelected, idCategorySelected }) {
  return (
    <div className="category-list">
      <h2 className="category-list-title">Buscar por tipo de alojamiento</h2>
      <div
        className={
          window.innerWidth < 992
            ? " sm:grid-cols-1 md:grid-cols-2  categories-container-mobile categories-container grid grid-cols-2"
            : "grid grid-cols-4 category-container "
        }
      >
        {categories !== null ? (
          categories.map((category) => (
            <CategoryCard
              idCategorySelected={idCategorySelected}
              categorySelected={categorySelected}
              key={category.id}
              item={category}
            />
          ))
        ) : (
          <MyLoader />
        )}
      </div>
    </div>
  );
}

export default CategoryList;
