# Product-verification
This is a product verification system.
The following technologies have been used
1. Frontend 
    `Hypertext markup language(html)`
    `Cascade style sheet(css)`
    `Javascript(js)`
2. Backend - `Firebase`

## `Break down of file organization`
The html files are located in the root of the project.\n
The css and javascript files are located in the folder call assets except for firebase file which are also found on the root of the project.
    
 For backend authentication I `@PaymasterMax` has created event listeners at the bottom of the signup.js file where the backend is expected to be connected to the firestore.
For google authentication, check this event listener at the bottom of the file signup.js
    `_google_auth.addEventListener('click',(e)=>{
		console.log("_google_auth");
        })`
For facebook authentication, check this event listener at the bottom of the file signup.js
    `_facebook_auth.addEventListener('click',(e)=>{
		console.log("_facebook_auth");
})`
        
