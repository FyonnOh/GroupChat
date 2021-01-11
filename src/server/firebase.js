import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCqKlliVnZEuo5_3-sc6eWhRo890cssQJ0",
    authDomain: "slack-react-clone-f6ac6.firebaseapp.com",
    projectId: "slack-react-clone-f6ac6",
    storageBucket: "slack-react-clone-f6ac6.appspot.com",
    messagingSenderId: "72159594866",
    appId: "1:72159594866:web:3ec1f061c802a98609b5eb",
    measurementId: "G-3YHYXBWX8Y"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    export default firebase;

