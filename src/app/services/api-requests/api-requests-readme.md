### AUTHOR: DANIEL FRANKORT ###
### COMPONENT DESCRIPTION ###
Since API-requests are usually the same lines code, we don't need to copy-paste all of it, using these functions we can make our code a lot cleaner & clearer and we don't need to figure out how these functions work from scratch again.

## How to use

### 1) Declare a variable with class `ApiRequestsService` in your constructor
    ```ts
    export class exampleService {

        constructor(
          private api: ApiRequestsService, // add this
        ) {}

    ```
    Make sure the ApiRequestsService is also imported to the .ts file.
    ```ts
    import { ApiRequestsService } from '../api-requests/api-requests.service';
    ```
    
### 2) Use the api-request that you need in your function.
    ```ts
    this.api.getFromApi(); // GET => Get data
    this.api.postToApi(); // POST => Post fully new data
    this.api.putToApi(); // PUT => Update existing data
    ```

### 3) Provide the function with Variables
The api-request functions require some inputs to work. 
#### a) GET-Request Inputs: Only requires the end-point to call to.
```ts
//getFromApi(enpoint: string);
this.api.getFromApi('/group-2/ingredients');
```
In this example we want to reach the end-point ``/group-2/ingredients``.
The variable will get ``https://syntra2023.code-coaching.dev/api`` put in front of it automatically, this is done with an interceptor (base-url.interceptor.ts).
So in our case, by providing the input ``/group-2/ingredients``, we are actually doing  an API-request to ``https://syntra2023.code-coaching.dev/api/group-2/ingredients``.

#### B) POST-Request Inputs: Requires endpoint & data to post.
```ts
//postToApi(endpoint: string, dataToPost: Any);
this.api.postToApi('/group-2/ingredients', myData);
```
For info about the endpoint, refer to A) GET-Requests Inputs

You need to also supply the data you want to post, this is different from endpoint to endpoint.

### 4) Subscribe to the function, if needed!
Important to note that all of these functions return an Observable.
By using .subscribe we can look at the data we just did a request to.
- with GET: by subscribing to the Observable, we can run a function every time the data is renewed. This allows us to, for example, save the new data to a variable every time it's renewed. 
    #### Example:
    ```ts
    loadIngredientsFromAPI(){
        this.api.getFromApi('/group-2/ingredients')
            .subscribe((data: Array<Ingredient>) => {this.ingredients = data;});
    }
    ```
- with POST: by subscribing