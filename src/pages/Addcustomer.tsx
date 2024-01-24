import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonBackButton,
  IonToolbar,
  IonTitle,
  useIonToast,
  IonHeader,
  IonIcon,
  IonText,
} from "@ionic/react";
import { firestore, app } from "../firebaseconfig";
import { collection, addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import style from "./EntryAddcustomer.module.scss"
import { personAdd } from "ionicons/icons";
import { useHistory } from "react-router";
const auth = getAuth(app);
function Example() {
  const [Uid, setUid] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  const [present] = useIonToast();
  const [user, setUser] = useState({
    name: "",
    number: "",
  });
  let name, value;
  const history = useHistory();
  const getData = (event: any) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  // store customer name and number
  const userCollectionRef = collection(firestore, "Customer-info");
  const postData = (e: any) => {
    e.preventDefault();
    const { name, number } = user;
    console.log("Submit clicked...");

    console.log(name, number);

    if (name && number) {
      console.log("Inside if...");

      //  onAuthStateChanged(auth, (uid) => {
      addDoc(userCollectionRef, {
        name: user.name,
        number: user.number,
        UID: Uid,
      }).then(() => {
        submitToast("top");
        history.push("/home");
        setUser({
          name: " ",
          number: " ",
        });
      });
      // });
    } else {
      notSubmitToast("top");
    }
  };
  // Toast Message
  const submitToast = (position: "top") => {
    present({
      message: "Submitted successfully ",
      duration: 2500,
      position: position,
    });
  };
  const notSubmitToast = (position: "top") => {
    present({
      message: " Please enter",
      duration: 2500,
      position: position,
    });
  };
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonItem slot="start" color="primary">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonItem>
          <IonTitle className={style.pageheader}> Add Customer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <section  className={style.Addcustomer_content}>
        <div className="ion-padding">
          <IonIcon
            icon={personAdd}            
            className="ion-padding"
          ></IonIcon>
          <div className={style.Addcustomer_text}>
            <h1>Fill in below details to </h1>
            <IonText>create new customer</IonText>
          </div>
        </div>
        <form className={style.Addcustomer_form}>
          <IonInput 
            label="Customer Name"
            label-placement="floating"
            fill="outline"
            placeholder="Enter Name"
            type="text"
            name="name"
            value={user.name}
            onIonChange={getData}
            required
          />
          <IonInput          
          className="ion-margin-top"
            label="Customer Number"
            label-placement="floating"
            fill="outline"
            placeholder="Enter Number"
            type="number"
            name="number"
            value={user.number}
            onKeyUp={getData}
            required
          />

          <IonButton
            className="ion-margin-top"
            type="button"
            expand="block"
            onClick={postData}
          >
            Add Customer
          </IonButton>
        </form>
      </section>
    </>
  );
}
export default Example;
