import { MiddlewareAPI } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import ActionTypes from '../actions/ActionTypes';
import { Store, Home } from '../reducers/State';
import AjaxObservable from '../fetch/ajaxObservable';
import {redirect, showSignInErrorMessage} from '../actions';

const signInEpic =(action$: ActionsObservable<any>, store: MiddlewareAPI<Store>) => action$.ofType(ActionTypes.SIGNIN)
.switchMap((action)=>{
    return AjaxObservable({ path: '/api/signin', method: 'POST', body: {username:action.username, password:action.password}}, store);
})
.map((response)=>{
    if(response.value.isValid){
        return redirect('/master/home');
    }
    return showSignInErrorMessage();
});

export default [signInEpic];