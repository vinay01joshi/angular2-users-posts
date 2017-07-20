import { Component, OnInit } from "angular2/core";
import { ControlGroup, FormBuilder, Validators } from "angular2/common";
import { CanDeactivate, Router, RouteParams } from "angular2/router";
import { UserService } from "./user.service";
import { User } from "./user";
import { BasicValidators } from "../shared/basicValidators";

@Component({
    templateUrl : 'app/users/user-form.component.html',
    providers:[UserService]
})
export class UserFormComponent implements OnInit, CanDeactivate{
    form: ControlGroup;
    title;
    user = new User();
    constructor(
        fb: FormBuilder,
        private _userService : UserService, 
        private _router : Router,
        private _routeParams : RouteParams){
       
            this.form = fb.group({
            name : ['',Validators.required],
            email: ['',BasicValidators.email],
            phone:[],
            address : fb.group({
               street :[],
               suite :[],
               city :[],
               zipcode:[]
            })
        });
    }

    ngOnInit() {
      var id = this._routeParams.get("id");

      this.title = id ? "Edit User" :"Add User";

      if(!id)
        return

      this._userService.getUser(id)
            .subscribe(user=> this.user = user,
                      response => {
                          if(response.status == "404"){
                              this._router.navigate(['NotFound'])
                          }

                    });
      
    }
    routerCanDeactivate() {
        if(this.form.dirty)
            return confirm('You have unsaved changes. Are you want to navigate away?');

        return true;
    }

    save(){
       var result;
        
        if (this.user.id) 
            result = this._userService.updateUser(this.user);
        else
            result = this._userService.addUser(this.user)
            
		result.subscribe(x => {
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            this._router.navigate(['Users']);
        });
    }      
}