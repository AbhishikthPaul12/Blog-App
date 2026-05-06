Three roles
1. Author
Registration, Login, Add, view author articles, edit and delete articles
2. User
Registration, Login, View articles, Write comments
3. Admin
Login, View Articles, Block and activate user

Application building starts with database schema design.
Two resources identified - User, Article
Two schemas must be designed

//13-03-2026
Always follow DRY principle(Do not repeat yourself)

Always do brainstorming and finish deciding requirements. Without proper reqs, we will have endless confusion.
No application can provide 100% security. Security is built layer-by-layer

Don't mix asynchronous and synchronous operations.
It causes some assumptions and results in errors.
Delete can only be used on JS Object. We can use toObject method for converting the document to a Javascript object.

Login-> Submitting credentials to get token
Logout-> Deleting the token

Put->Complete replacement
Patch->Partial replacement

//14-03-26
xxs- Cross site scripting
csrf- Cross site resource forgery


### Frontend
Dynamic, responsive user interfaces
(UI= Web page)
To open a web page, we need a software called browser
To create a web page, we need HTML
To apply styles and responsiveness to the web page, we need CSS
Dynamic nature can be applied using Javascript
Website + Dynamic nature=Web application
Javascript technologies simplifying mordern web applications -> ReactJs/Angular/Vue/NextJS
React native -> Mobile applications, Electron.js -> Desktop applications
Angular is a framework whereas ReactJS is a library.(Angular is a frontend JS framework used for large scale applications)
Medium and small scale applications can be developed by using ReactJS.
(Pick them based on requirement)
To overcome CSS disadvantages related to writing long amounts of code, we can use CSS frameworks like Bootstrap and TailwindCSS.

//18-03-2026
Normally, when we use Vanilla Javascript, we need to specify each and every instruction very clearly. Otherwise, it may fail at a certain point of time. 
Example:- When we click a heading and we expect the heading text to turn red, we have to specify to JS to first go get the heading, then add an event listener in which we have to add the instructions for font-color change.

This is called imperative programming. It is not much useful because we have write long amounts of code. 
So, we use either React or Angular as part of declarative programming. It has these instrcutions already. We can just ask it now to apply the red color to the heading and it will do it for us.


### React JS
When direct DOM manipulation occurs(no code written in HTML doc but mentioned in JS doc), it still is an expensive process.
Because everytime we make changes to the JS file, DOM tree always keeps on getting reconstructed.
DOM tree reconstruction takes time and this affects the performance of the application.
React isdesigned in such a way that it never touches the actual DOM tree.
It makes a copy of the DOM tree and makes the changes to this copy.(The copy is called as virtual DOM).
When user makes any changes to the application, a new virtual DOM is created. It compares this new version to the old version and just adds the changes to the real DOM.
Hence, today many real-world applications use React for frontend activities. It offers many features without affecting the real DOM, hence making the application performance faster and better user experience can be ensured in this way.