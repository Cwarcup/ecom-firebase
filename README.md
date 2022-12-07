![Site image](public/twitter-card.jpg)

#  E-commerce Website with TypeScript, React, Redux and Firebase

This is a project that I built while learning React and Redux. It is a fully functional e-commerce website that allows users to sign in with their Google account, add items to their cart, and make payments with Stripe. 

Deployed with Netlify: [https://firebase-store-cwarcup.netlify.app/](https://firebase-store-cwarcup.netlify.app/)

## Learning and Tools

| Firebase       |                                               |
| -------------- | --------------------------------------------- |
| Authentication | Email/Password, Google Popup, Google Redirect |
| Firestore      | Use NoSQL to store user and product data      |

| Redux ToolKit |                                |
| ------------- | ------------------------------ |
| Redux Thunk   | Async actions                  |
| Redux Persist | Persist state to local storage |

| Other Tools  |                    |
| ------------ | ------------------ |
| Stripe       | Payment processing |
| Typescript   | Type checking      |
| React        | UI                 |
| React Router | Routing            |
| TailwindCSS  | Styling            |

## Firebase
### Authentication

Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. 

For this application I decided to use the Email/Password and Google providers for my authentication methods. 

I learnt there are a few ways you can use the Google provider. You can use the `signInWithPopup` which will open a popup window for the user to sign in with their Google account. Or you can use the `signInWithRedirect` which will redirect the user to a Google sign in page. I decided to use the `signInWithRedirect` method as I wanted to keep the user on the same page and not have a popup window open. I felt like this method was also a bit more challenging to implement and I wanted to learn how to do it.

### Firestore Database

This was my first time using a NoSQL database. I used Firestore to store the products and users. I found the documentation to be challenging because I didn't initially understand how all the pieces fit together. However, once the pieces were in place, it was easy to use.

My database is structured as follows:

```
  users
    - userId
      - createdAt
      - displayName
      - email

  categories
    - categoryName
      - items
        - itemId
          - name
          - price
          - imageUrl
```

One of the tricky things was getting data into my database. I created a helper function to take in a json object and add it to the database. I used this to add my products to the database.

## State Management

Originally used `useContext` and `useState` to manage state. Used for keep track of the user's cart, products from the database, and authentication state.

### Redux

I decided to use Redux to manage state. I noticed the cart items contained a lot of different types of data. The actual items, quantity, price, and other data. A lot of state also depended on other state. For example, the cart count and subtotal depended on the cart items. This is why I felt like Redux was a good choice for this application.

I originally used `useContext` and `useState` to manage state. I used `useContext` to pass the cart items to the components that needed it. But this was a lot of values and functions to pass to the context. For example, whenever we make changes to the `cartItems` (Like adding an item to the cart), we need to update the `cartCount` and `cartSubtotal`. I was using `useEffect` to trigger these updates and make the changes. And each of these values are being stored as a separate state with `useState`. I didn't like this approach because it was a lot of state to manage and it was difficult to keep track of everything.

#### Using Redux

I've had some experience with classic Redux but decided to use Redux Toolkit. I've heard good things about it and it's a lot easier to use. The docs were easy to follow and I was amazed at how quickly I was able to get it up and running.

Setting up the async actions to authenticate a user using Firebase was a little tricky, but I was able to get it working within an hour. I used `redux-persist` to persist the cart items in local storage. I didn't have to worry about the authentication state because Firebase handles that for us.

I would highly recommend using Redux Toolkit if you're looking to use Redux.

## Typescript

I originally wrote the entire application in JavaScript. I decided to add Typescript to the project. I found it to be a bit challenging at first, but once I got the hang of it, it was easy to use.

The biggest challenge was handling types for everything in Redux. Because I moved all the logic for async actions to Redux, I had to handle types for the actions, reducers, and the state. It was a bit of a learning curve, but I was able to get it working.

Additionally, typing the Firebase functions was a bit challenging. It was difficult to remember exactly what the functions returned and what the parameters were. After a few hours I got it to work.

I wish I implemented Typescript from the beginning. I think it would have saved me a lot of time and headaches.

## Tailwind

I've used Tailwind in the past for numerous projects, so I didn't focus too much on the styling. I wanted to focus more on the functionality of the application.

## Stripe

In order to handle payments in Stripe, I used Netlify functions. I created a function that would handle the payment and return a response. I then used the response to update the user's cart and order history.

I used the Netlify CLI to build and deploy the functions. I found the documentation to be a bit confusing, but I was able to get it working.

In order to run the development server for the functions, I had to run `netlify dev` in the root directory. This will allow us to run the functions locally, thus allowing us to test the payment process.

The deployed site should be able to handle payments.

Use the following test card to make a payment:

```
Card number: 4242 4242 4242 4242
Expiry: 04/24
CVC: 242
```