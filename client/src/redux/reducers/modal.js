import { INIT_STATE } from "../../constans";
import { getType, showModal, hideModal, showModalUpdate, hideModalUpdate } from "../actions";

export default function modalReducers(state = INIT_STATE.modal, action){
    switch(action.type){
        case getType(showModal):
            return{
                isShow: true,
            };
        case getType(hideModal):
            return{
                isShow: false,
            };
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
