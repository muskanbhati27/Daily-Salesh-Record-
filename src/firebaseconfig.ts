import {initializeApp} from 'firebase/app';
import  {getFirestore} from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

// import  {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlGgU1LVE8eqv84ERNrVT0AQk3I5f_hmI",
  authDomain: "customer-app-e8431.firebaseapp.com",
  projectId: "customer-app-e8431",
  storageBucket: "customer-app-e8431.appspot.com",
  messagingSenderId: "702833531944",
  appId: "1:702833531944:web:b7ac6d9b93b1d2ecbde91d"
};

const app=initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export{app, firestore, auth}

// export {app, db as default};
// export default {app, db};
// export {};
// export {app, db};

// export  const app=firebase.initializeApp(firebaseConfig);

// export const db = getFirestore(app);
