import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    private _url = "https://jsonplaceholder.typicode.com/users";
    constructor(private _http : Http){

    }

    getUser(id){
        return this._http.get(this._url +"/" + id)
            .map(res=>res.json());
    }

    getUsers(){
        return this._http.get(this._url)
            .map(res=>res.json())
    }

    addUser(user){
        return this._http.post(this._url,JSON.stringify(user))
                .map(res => res.json());
    }
}