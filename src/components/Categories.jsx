import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../tools/api";

export default function Categories({ setSort, setOrder }) {
  const [categories, setCategories] = useState([]);
  const [position, setPosition] = useState("flex-end");
  const [backColor, setBackColor] = useState([
    "rgb(185, 117, 71)",
    "rgb(185, 117, 71)",
    "rgb(185, 117, 71)",
    "rgb(185, 117, 71)",
  ]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const handleToggle = () => {
    setPosition((currPos) => {
      return currPos === "flex-start" ? "flex-end" : "flex-start";
    });
    if (position === "flex-start") {
      setOrder("DESC");
    } else {
      setOrder("ASC");
    }
  };
  const handleSort = (sort, num) => {
    setBackColor((currCol) => {
      let clone = currCol.map((col, ind) =>
        ind === num ? "rgb(236, 213, 81)" : "rgb(185, 117, 71)"
      );
      return clone;
    });
    setSort(sort);
  };

  return (
    <section>
      <div className="categories--checkbox-cont">
        SORT BY&nbsp;&nbsp;
        <div id="sorters">
          <div
            style={{ background: `${backColor[0]}` }}
            onClick={() => handleSort("designer", 0)}
            className="cat--sorter"
          >
            Designer
          </div>
          <div
            style={{ background: `${backColor[1]}` }}
            onClick={() => handleSort("owner", 1)}
            className="cat--sorter"
          >
            Owner
          </div>
          <div
            style={{ background: `${backColor[2]}` }}
            onClick={() => handleSort("created_at", 2)}
            className="cat--sorter"
          >
            Date
          </div>
          <div
            style={{ background: `${backColor[3]}` }}
            onClick={() => handleSort("votes", 3)}
            className="cat--sorter"
          >
            Votes
          </div>
        </div>
        ASC
        <div id="checkbox" style={{ justifyContent: `${position}` }}>
          <div id="toggle" onClick={handleToggle} />
        </div>
        DESC
      </div>
      <div>
        <h4 id="categories--main-h4">Categories</h4> <br />
        <section className="categories--categories-flex">
          {categories.map((category) => {
            return (
              <Link key={category.slug} to={`/categories/${category.slug}`}>
                <div className="categories--category">{category.slug}</div>
              </Link>
            );
          })}
        </section>
      </div>
    </section>
  );
}
