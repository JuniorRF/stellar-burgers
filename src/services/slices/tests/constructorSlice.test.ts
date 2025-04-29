import {
	addIngredient,
	removeIngredient,
	moveUp,
	clearConstructor,
	constructorSlice
} from '@slices';
import { testBun, testIngredient, testSouce } from './fixtures'

describe('Слайс конструктора ингредиентов', () => {
	const state = {
		constructor: {
			bun: null,
			ingredients: []
		},
		buyBurgerStatus: false,
		orderData: null
	};

	describe('Добавление ингредиентов', () => {
		it('Добавление булки', () => {
			const action = addIngredient(testBun);
			const newState = constructorSlice.reducer(state, action);

			expect(newState.constructor.bun).toEqual(
				expect.objectContaining(testBun)
			);
			expect(newState.constructor.ingredients).toHaveLength(0);
		});

		it('Добавление мяса', () => {
			const action = addIngredient(testIngredient);
			const newState = constructorSlice.reducer(state, action);

			expect(newState.constructor.bun).toBeNull();
			expect(newState.constructor.ingredients).toHaveLength(1);
			expect(newState.constructor.ingredients[0]).toEqual(
				expect.objectContaining(testIngredient)
			);
		});
	});
	describe('Изменение ингредиентов в сторе', () => {
		const state = {
			constructor: {
				bun: {...testBun, id: 'bunId'},
				ingredients: [
					{...testIngredient, id: 'ingredientId'},
					{...testSouce, id: 'souceId'}
				]
			},
			buyBurgerStatus: false,
			orderData: null
		};
		it('Смена позиции ингредиента в сторе', () => {
			expect(state.constructor.ingredients[0]._id).toBe('main1');
			const action = moveUp(1);
			const newState = constructorSlice.reducer(state, action);
			expect(newState.constructor.ingredients[0]._id).toBe('sauce1');
		});
		it('Удаление ингредиента', () => {
			expect(state.constructor.ingredients).toHaveLength(2);
			const action = removeIngredient('souceId');
			const newState = constructorSlice.reducer(state, action);
			expect(newState.constructor.ingredients).toHaveLength(1);
			expect(newState.constructor.ingredients[0]).toEqual(
				expect.objectContaining(testIngredient)
			);
		});
		it('Удаление всех ингредиентов', () => {
			expect(state.constructor.ingredients).toHaveLength(2);
			const action = clearConstructor();
			const newState = constructorSlice.reducer(state, action);
			expect(newState.constructor.ingredients).toHaveLength(0);
			expect(newState.constructor.bun).toBeNull();

		});
	});
});