# Firebase Ecom Demo App
## Firebase
### Authentication

Uses Firebase Authentication. See [Firebase Authentication](https://firebase.google.com/docs/auth/).

### Firestore Database

## State Management

Originally used `useContext` and `useState` to manage state. Used for keep track of the user's cart, products from the database, and authentication state.

### Redux

Decided to use Redux to manage state. I noticed the cart items contained a lot of different types of data. The actual items, quantity, price, and other data. In order to keep track of the cart items, I decided to use Redux. 

```js
// shape of the cart item
{
  id: number,
  name: string,
  price: number,
  quantity: number, 
  imageUrl: string,
}

  // values/functions to pass to context
const value = {
  cartItems, // array of cart items
  addItemToCart, // function to add item to cart
  removeItemFromCart, // function to remove item from cart
  cartCount, // number of items in cart
  cartSubtotal, // subtotal of cart
  clearItemFromCart, // function to clear item from cart
}
```

We have a **lot** of stuff going on in here. Additionally, whenever we make changes to the `cartItems`, we need to update the `cartCount` and `cartSubtotal`. We are currently using `useEffect` to trigger these updates and make the changes. And each of these values are being stored as a separate state with `useState`. 

This is a very **react** way of doing things. This isn't bad, but we can make some improvements.

#### Using Reducers

A reducer is still an object. It's just a function that takes in the current state and an action. The **action** is an object that contains a `type` and `payload`. The `type` is a string that describes what we want to do. The `payload` is the data we want to use to update the state. 


| Type                          | Payload                                  |
| ----------------------------- | ---------------------------------------- |
| Describes what we want to do. | Data we want to use to update the state. |
| `string`                      | `any`                                    |
| `ADD_ITEM`                    | `{ id: 1, name: 'Item 1', price: 10 }`   |
| Required                      | Optional                                 |

The flow of a reducer is as follows:

1. We call the reducer with the current state and an action.
2. The reducer checks the action's `type` and does something based on that.
3. Only the required data is passed to the reducer. The reducer doesn't need to know about the entire state. It only needs to know about the data it needs to update.
4. The reducer returns the new state.

This is very different from the way we were doing things before. When we updated one part of the state (like `cartCount`), we had to update the entire state. This is because we were using `useState` to store each part of the state.




## Learning

- [X] Firebase Authentication
  - [X] Email/Password
  - [X] Google Popup
  - [X] Google Redirect
  - Ended up using Google Redirect and Email/Password.
- [X] Firebase Firestore
  - [X] Write: initial products from json file and store in Firestore
  - [X] Read: fetch products and store in state
- [x] Tailwind CSS
- [x] React Router DOM
- [x] React
  - [x] useState
  - [x] useContext
  - [x] useEffect 

{
    "type": "user/signUpUser/rejected",
    "meta": {
        "arg": {
            "displayName": "sdsdf",
            "email": "curtis.gwarcup@gmail.com",
            "password": "123123123"
        },
        "requestId": "ObzLzu7NmfFd-V1zN1nG5",
        "rejectedWithValue": false,
        "requestStatus": "rejected",
        "aborted": false,
        "condition": false
    },
    "error": {
        "name": "FirebaseError",
        "message": "Firebase: Error (auth/email-already-in-use).",
        "stack": "FirebaseError: Firebase: Error (auth/email-already-in-use).\n    at createErrorInternal (http://localhost:3000/static/js/bundle.js:3882:37)\n    at _createError (http://localhost:3000/static/js/bundle.js:3851:10)\n    at _makeTaggedError (http://localhost:3000/static/js/bundle.js:4459:17)\n    at _performFetchWithErrorHandling (http://localhost:3000/static/js/bundle.js:4396:15)\n    at async _performSignInRequest (http://localhost:3000/static/js/bundle.js:4417:26)\n    at async createUserWithEmailAndPassword (http://localhost:3000/static/js/bundle.js:8595:20)\n    at async createAuthUserWithEmailAndPassword (http://localhost:3000/static/js/bundle.js:3278:10)\n    at async http://localhost:3000/static/js/bundle.js:2926:20",
        "code": "auth/email-already-in-use"
    }
}