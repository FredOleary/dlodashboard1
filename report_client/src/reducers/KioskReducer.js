import { RECEIVE_KIOSKS, SELECT_KIOSK} from 'actions/ActionTypes';

export default function kiosk(state = {kiosks:[], selectedKiosk:""}, action) {
	let newState;
	switch (action.type) {
		case RECEIVE_KIOSKS:
			newState = action.kiosks;
			newState.selectedKiosk = "";
			console.log('RECEIVE_KIOSKS Action');
			return newState;
		case SELECT_KIOSK:
			newState = {...state};
			newState.selectedKiosk = action.selectedKiosk;
			return newState;
		default:
			return state;
	}
}
