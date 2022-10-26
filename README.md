Work in progress


## Authentication

Uses Firebase Authentication. See [Firebase Authentication](https://firebase.google.com/docs/auth/).

Learn:
- using the `signInWithPopup` method to obtain a users `accessToken`. This is used to authenticate with the backend.
  - We can use this `accessToken` to make CRUD requests to the backend.
- whenever a user authenticates, we create a new user in the backend. This is done by calling the `createUser` mutation.
  - This is done so that we can store the users `accessToken` in the backend. This is used to make CRUD requests to the backend.
- Was second time using a document store. First time was with Supabase. Notice they are similar to JSON object where we can nest properties. 

Collections: are like tables in a relational database. A collection can contain documents.
Documents: are like rows in a relational database. Describe the shape of the data.
Data: is like columns in a relational database. Are stored as key-value pairs inside a document.


## Firestore Database

Can check if data exists in a document using the `exists` property on the `DocumentSnapshot` object. This object is returned from the `get` method on a `DocumentReference` object. Recall, this `DocumentReference` object is returned from the `doc` method on a `CollectionReference` object.

```js
export const createUserDocumentFromAuth = async (userAuth) => {
  // creates a reference to the user document in the firestore database
  const userRef = doc(db, 'users', userAuth.uid)
  console.log('userRef: ', userRef)
  // get the data related to a document. Returns a DocumentSnapshot
  const userSnapshot = await getDoc(userRef)
  //
  console.log('userSnapshot', userSnapshot.exists()) // true or false

  // if user data does not exist, create a new user document in the firestore database. Use the userAuth object to create the user data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      // create a new user document in the firestore database
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  // if user data exists, return the user data
  return userRef
}
```

> Now if a user does not exist in the firestore database, we create a new user document in the firestore database. We use the `userAuth` object to create the user data.

