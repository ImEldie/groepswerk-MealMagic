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
this.api.get(endpoint, optionalId); // GET => Get data
this.api.post(endpoint, dataToPost); // POST => Post fully new data
this.api.put(endpoint, endpointId, dataToPut); // PUT => Update existing data of data with id 'endpointId'
```
These functions return an Observable of the supplied variables.

## 3) Provide the function with Variables
The api-request functions require some inputs to work. 
### A) GET-Request Inputs: Only requires the endpoint, optionally accepts an ID for specific-calls.
#### - ENDPOINT
```ts
//get(endpoint: string, id: number);
this.api.get('/ingredients');
```
In this example we want to reach the end-point ``/ingredients``.
The endpoint will get ``https://syntra2023.code-coaching.dev/api/group-2`` put in front of it automatically, this is done with an interceptor (base-url.interceptor.ts).
So in our case, by providing the input ``/ingredients``, we are actually doing an API-request to ``https://syntra2023.code-coaching.dev/api/group-2/ingredients``.

The use of forwardslashes ``/`` at the start and end of your endpoint is not important, the interceptor makes sure that there are always forwardslashes in front and behind of your endpoint (converts ``ingredients`` to ``/ingredients/``).

###### NOTE: If you supply an endpoint starting with ``/token``, ``/group-2/`` will be removed from the call-link by the interceptor, since we don't need it in this case.

#### - OPTIONAL ID
If we want to call a specific ingredient, we can supply an id to the function:
```ts
const id = 1;
this.api.get('/ingredients', id);
```
This example returns an Observable of the ingredient with the ID 1.
You only need to supply an ID if you need to call specific data.

### B) POST-Request Inputs: Requires endpoint & data to post.
```ts
//post(endpoint: string, dataToPost: Any);
this.api.post('/ingredients', myData);
```
#### - ENDPOINT
Refer to endpoint-explanation from GET, it works the same here.

#### - POSTDATA
For a post-request you need to provide the data you want to post, this is different for every end-point.
Let's say you want to post login-details to ``/token/login``.
You would only need to supply the postdata in an object like follows:
```ts
const postData = { // data to post
    email: email , 
    password:password
    }; 
return this.api.post('/token/login', postData)
```
Any variable you post should have all the data that the back-end requires, in this case the back-end needs ``email`` and ``password``.

## 4) Subscribe to the function, if needed!
Important to note that all of these functions return an Observable.
By using ``.subscribe()`` we can look at the data we just did a request to.

If the concept of subscribing is confusing to you, think about YouTube.
- A YouTube channel is an Observable, it keeps getting new videos.
- If you subscribe to a YouTube-channel, you get updated about their new videos, same with a ``.subscribe()``
If you subscribe to an Observable, it is notified when new data is available.
- When the YouTube-channel uploads a new video, you get a notification and you start watching it (you perform a function). Same with ``.subscribe()``, if the Observable's data is updated, you can automatically run a function within your subscribe. This function will be performed when the Observable's request is updated or succesful.
```ts
//example code, not functional
youtubeChannel.subscribe(video => watchVideo());
Observable.subscribe(ObservableData => this.storedData = ObservableData); // Stores the newest data to this variable 'storedData'
```

### GET: Subscribing with get().
By subscribing to the Observable, we can run a function every time the data is updated. This allows us to, for example, save the new data to a variable every time it's updated.
Example:
```ts
// subscribe example
loadIngredientsFromAPI(){
    this.api.get('/ingredients')
        // overwrite local variable with new data from Observable:
        .subscribe((data) => {this.ingredients = data;}); 
}
```
If necesarry you can still do a ``.pipe()`` before subscribing, be aware that these functions already perform a ``.pipe()`` internally with bulk-data, since the back-end sends us data we don't need in some situations.
```ts
// pipe example
this.api.get('/ingredients')
    // Only allow the data's id's to flow through
    .pipe(map((data) => data.id); 
    // log the new data, in this case the IDs from /ingredients
    .subscribe((data) => {console.log(data)}); 
    
```

### POST & PUT: Subscribing to post() / put().
You can subscribe to a post/put, this would return the data that was posted/put in the backend. You can use this if you need the id of your posted/put data right after posting it, you can also use it to run a function after a post/put has finished (example: navigating back to the home-page after a post).
A few examples:
```ts
// Example: log id of posted data
this.api.post('/ingredients', postData)
    .subscribe((data) => {console.log("new data with id: "data.id)}); // log the ID of the newly stored data.
```
```ts
// Example: navigate to homepage after put finished
this.api.put('/ingredients', id ,postData)
    .subscribe(this.navigateToHomepage()); // Navigate back to the homepage after PUT is completed.
```

Of course, if you don't need to do anything after a succesful POST/PUT, you don't need a ``.subscribe()``.
