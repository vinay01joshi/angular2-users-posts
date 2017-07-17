/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template:  `
    <div class="container">    
        <input id="search" type="text" class="form-control">
    </div>`
})
export class AppComponent { 
   ngAfterViewInit() {
        var keyups = Observable.fromEvent($("#search"), "keyup");
        keyups.subscribe( data => console.log(data));
  }
}