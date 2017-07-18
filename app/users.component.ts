
import { Component, OnInit } from "angular2/core";
import { UserService } from "./user.service";

@Component({
    templateUrl : 'app/users.component.html',
    providers :[UserService]
})
export class UsersComponent implements OnInit {
    users : any[];
    constructor(private _userService: UserService) {
      
    }
    ngOnInit() {
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }
}