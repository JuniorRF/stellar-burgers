import { TIngredient } from '@utils-types';

export const mapIngredients = (ingredients: TIngredient[]) => {
    return ingredients.map(item => {
        return {
            _id: item._id,
            name: item.name,
            type: item.type,
            proteins: item.proteins,
            fat: item.fat,
            carbohydrates: item.carbohydrates,
            calories: item.calories,
            price: item.price,
            image: item.image,
            image_large: item.image_large,
            image_mobile: item.image_mobile
        };
    });
}