### AUTHOR: DANIEL FRANKORT
## SERVICE DESCRIPTION
Since API-requests are usually the same lines of code, we don't need to copy-paste all of it, using these functions we can make our code a lot cleaner & clearer and we don't need to figure out how these functions work from scratch every time we use them.

# How to use

## 1) Declare a variable with class `ApiRequestsService` in your constructor.
Make sure the ApiRequestsService is also imported to the .ts file.
```ts
import { ApiRequestsService } from '../api-requests/api-requests.service';

...

export class exampleService {
    constructor(
      private api: ApiRequestsService, // add this
    ) {}
```
    
## 2) Use the api-function that you need in your function.
```ts
this.api.getFromApi(endpoint, optionalId); // GET => Get data
this.api.postToApi(endpoint, dataToPost); // POST => Post fully new data
this.api.putToApi(endpoint, endpointId, dataToPut); // PUT => Update existing data of data with id 'endpointId'
```
These functions return an Observable of the supplied variables.

## 3) Provide the function with Variables
The api-request functions require some inputs to work. 
#### A) GET-Request Inputs: Only requires the endpoint, also accepts an ID for specific-calls.
```ts
//getFromApi(endpoint: string, id: number);
this.api.getFromApi('/group-2/ingredients');
```
In this example we want to reach the end-point ``/group-2/ingredients``.
The variable will get ``https://syntra2023.code-coaching.dev/api`` put in front of it automatically, this is done with an interceptor (base-url.interceptor.ts).
So in our case, by providing the input ``/group-2/ingredients``, we are actually doing  an API-request to ``https://syntra2023.code-coaching.dev/api/group-2/ingredients``.

If we want to call a specific ingredient, we can supply an id to the function:
```ts
const id = 1;
this.api.getFromApi('/group-2/ingredients', id);
```
This example returns an Observable of the ingredient with the ID 1.
You only need to supply an ID if you need to call specific data.

#### B) POST-Request Inputs: Requires endpoint & data to post.
```ts
//postToApi(endpoint: string, dataToPost: Any);
this.api.postToApi('/group-2/ingredients', myData);
```
For info about the endpoint, refer to A) GET-Requests Inputs

You need to also supply the data you want to post, this is different from endpoint to endpoint.

## 4) Subscribe to the function, if needed!
Important to note that all of these functions return an Observable.
By using .subscribe we can look at the data we just did a request to.

If the concept of subscribing is confusing to you, think about YouTube.
- A YouTube channel is an Observable, it keeps getting new videos.
- If you subscribe to a YouTube-channel, you get updated about their new videos, same with a ``.subscribe()``
If you subscribe to an Observable, you get notified about new data.
- When your favourite youtuber uploads a new video, you get a notification and you start watching it (you perform a function). Same with ``.subscribe()``, if the Observable's data is updated, you can automatically run a function within your subscribe. This function will only be performed when the Observable's data changes.
```ts
//example code, not functional
Observable.subscribe(ObservableData => this.storedData = ObservableData); // Stores the newest data to this variable 'storedData'
```

### GET: Subscribing with getFromApi().
By subscribing to the Observable, we can run a function every time the data is updated. This allows us to, for example, save the new data to a variable every time it's updated.
Example:
```ts
// subscribe example
loadIngredientsFromAPI(){
    this.api.getFromApi('/group-2/ingredients')
        // overwrite local variable with new data from Observable:
        .subscribe((data) => {this.ingredients = data;}); 
}
```
If necesarry you can still do a .pipe before subscribing, be aware that thesefunctions already perform a .pipe for bulk-data, since the back-end sends us a lotof useless information in this situation. ``.pipe(map(data => data.data))`` is notneeded!
```ts
// pipe example
this.api.getFromApi('/group-2/ingredients')
    .pipe(map((data) => data.id); // Only allow the data's id's to flow through
    .subscribe((data) => {console.log(data)}); // log the new data, in this case the ID's
```

### POST & PUT: Subscribing to postToApi() / putToApi().
You can subscribe to a post/put, this would return the data that was stored/changed in the backend. You can use this if you need the id of your posted/changed data right after posting it, you can also use it to run a function after a post/put has finished (example: navigating back to the home-page after a post).
A few examples:
```ts
// log id of posted data
this.api.postToApi('/group-2/ingredients', postData)
    .subscribe((data) => {console.log("new data with id: "data.id)}); // log the ID of the newly stored data.
```
```ts
// navigate to homepage after post finished
this.api.postToApi('/group-2/ingredients', postData)
    .subscribe(this.navigateToHomepage()); // Navigate back to the homepage after POST is completed.
```

Of course, if you don't need to check the data afterwards, you don't need a ``.subscribe()``.
