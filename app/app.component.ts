import {Component} from 'angular2/core';
import { Observable } from 'rxjs/Rx';

import { NavbarComponent } from './navbar.component';

@Component({
    selector: 'my-app',
    template:  `
       <navbar></navbar> 
    `,
    directives:[NavbarComponent]
})
export class AppComponent { 
 
}