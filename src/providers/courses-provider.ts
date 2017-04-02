import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { ApiEndpoints, AppConstants } from '../app/constants';

/*
  Generated class for the CoursesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CoursesProvider {

    constructor(public http: Http) {
        console.log('Hello CoursesProvider Provider');
    }

    public getCourses() {
        // Make a request for a specific course

        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observable) => {
                // Make the HTTP request
                this.http.get(ApiEndpoints.COURSE + '/' + AppConstants.ALL)
                    .map((response) => response.json())
                    // map is just a function that gets applied no matter what comes back
                    // in this case we use it to always convert the object to a json representation of the response body
                    .subscribe(
                    // To the subscribe method we pass several anonymous methods that are called
                    // Under different circumstances (e.g. success, error)
                    // Check the docs for more info
                    // http://reactivex.io/documentation/operators/subscribe.html
                    (data) => {
                        observable.next(data);
                        observable.complete();
                    },
                    (error) => {
                        observable.error(error);
                    }
                    )
            }
        );
    }

    public getCourse(id) {
        // Make a request for a specific course

        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observable) => {
                // Make the HTTP request
                this.http.get(ApiEndpoints.COURSE + '/' + id)
                    .map((response) => response.json())
                    // map is just a function that gets applied no matter what comes back
                    // in this case we use it to always convert the object to a json representation of the response body
                    .subscribe(
                    // To the subscribe method we pass several anonymous methods that are called
                    // Under different circumstances (e.g. success, error)
                    // Check the docs for more info
                    // http://reactivex.io/documentation/operators/subscribe.html
                    (data) => {
                        console.log("Get course by id got data");
                        console.log(data);
                        observable.next(data);
                        observable.complete();

                    },
                    (error) => {
                        observable.error(error);
                    })
            });
    }

}
