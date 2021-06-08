import {
	GETTING_SHOES,
	GETTING_SHOES_SUCCESS,
	GETTING_SHOES_FAIL,
	GETTING_TEN_SHOES,
	GETTING_TEN_SHOES_SUCCESS,
	GETTING_TEN_SHOES_FAIL,
	SELECTED_SHOE,
} from "../actions";

const initialState = {
	shoes: [],
	gettingShoes: false,
	gettingShoesError: "",
	selectedShoe: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GETTING_SHOES:
			return {
				...state,
				gettingShoes: true,
			};

		case GETTING_SHOES_SUCCESS:
			console.log("stop loading");
			return {
				...state,
				shoes: action.payload,
				gettingShoes: false,
			};

		case GETTING_SHOES_FAIL:
			return {
				...state,
				gettingShoes: false,
				gettingShoesError: action.payload,
			};

		case SELECTED_SHOE:
			const id = action.payload;
			const shoe = state.shoes.find((shoe) => shoe._id === id);
			console.log("shoe", shoe);
			return {
				...state,
				selectedShoe: shoe,
			};

		default:
			return state;
	}
};
