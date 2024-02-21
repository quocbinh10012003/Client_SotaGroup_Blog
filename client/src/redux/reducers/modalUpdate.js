import { INIT_STATE } from "../../constans";
import { getType, showModalUpdate, hideModalUpdate } from "../actions";

export default function modalReducers(state = INIT_STATE.modalUpdate, action){
    switch(action.type){
        case getType(showModalUpdate):
            return{
                isShowUpdate: true,
            };
        case getType(hideModalUpdate):
            return{
                isShowUpdate: false,
            };   
        default:
            return state;
    }
}
