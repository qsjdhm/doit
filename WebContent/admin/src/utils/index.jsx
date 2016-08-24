// reducer生成器，为了以后使用方便，起名为create reducer的简写
export function cr ( initialState, handlers ) {
	return function reducer( state = initialState, action ) {
		if ( handlers.hasOwnProperty( action.type ) ) {
			return handlers[action.type]( state, action );
		} else {
			return state;
		}
	}
}

// action生成器的生成器，同样原因，起名为create action creator的简写
export function cac ( type, ...argNames ){
	return function( ...args ) {
		let action = { type };
		argNames.forEach( ( arg, index ) => {
			action[argNames[index]] = args[index];
		} );
		return action;
	}
}
