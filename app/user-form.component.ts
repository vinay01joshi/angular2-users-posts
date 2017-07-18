import { Component } from "angular2/core";
import { ControlGroup, FormBuilder, Validators } from "angular2/common";
import { BasicValidators } from "./basicValidators";
import { CanDeactivate } from "angular2/router";

@Component({
    templateUrl : 'app/user-form.component.html'
})
export class UserFormComponent implements CanDeactivate{
    form: ControlGroup;
    constructor(fb: FormBuilder){
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
        })
    }

    routerCanDeactivate() {
        if(this.form.dirty)
            return confirm('You have unsaved changes. Are you want to navigate away?');

        return true;
    }
}