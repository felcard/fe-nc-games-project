import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../tools/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);
  return (
    <div className="categories--categories-flex">
      {categories.map((category) => {
        return (
          <Link key={category.slug} to={`/categories/${category.slug}`}>
            <div className="categories--category">{category.slug}</div>
          </Link>
        );
      })}
    </div>
  );
}
