import { useEffect } from "react";
import { getCategories } from "../tools/api";
export default function Categories() {
  useEffect(() => {
    getCategories().then((res) => {
      console.log(res);
    });
  });
  return <div></div>;
}
