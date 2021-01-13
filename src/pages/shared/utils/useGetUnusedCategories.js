import { useContext } from 'react';
import CategoriesContext from '../../context/CategoriesContext';
import ConnectedCategoriesContext from '../../context/ConnectedCategoriesContext';

export default () => {
  const [categories, set_categories] = useContext(CategoriesContext)
  const [connectedCategories, set_connectedCategories] = useContext(ConnectedCategoriesContext)
  return connectedCategories.length > 0 ? categories.filter((category) => {
    let catExists = false;

    for (let index = 0; index < connectedCategories.length; index++) {
      const connectedCat = connectedCategories[index];
      if (category.id === connectedCat.id) {
        catExists = true;
      }

    }

    return catExists ? false : true
  }) : categories
}