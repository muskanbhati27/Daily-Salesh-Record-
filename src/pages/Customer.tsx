import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { add } from "ionicons/icons";
import style from "./customer.module.scss";
import { IonBackButton, IonItem, IonTitle, IonToolbar } from "@ionic/react";
import { firestore } from "../firebaseconfig";
import { collection, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseconfig";

const auth = getAuth(app);
function Example() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState<string[]>([]);
  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 50; i++) {
      newItems.push(`Item ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
  };
  useEffect(() => {
    generateItems();
  }, []);

  const [id, setUid] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  console.log(id);
  // fetch customers
  const fetchPost = async () => {
    await getDocs(collection(firestore, "Customer-info")).then(
      (querySnapshot: { docs: any[] }) => {
        const newData: any = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(newData);
        //console.log(data, newData);
      }
    );
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonItem slot="start" color="primary">
            <IonBackButton color="light" defaultHref="/"></IonBackButton>
          </IonItem>
          <IonTitle color="light" size="large" className={style.pageheader}>
            Customer
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={style.customer_container}>
        <IonRow slot="fixed">
          <IonCol>Name</IonCol>
          <IonCol>Phoneno.</IonCol>
        </IonRow>
        <IonGrid >
          {data.map((name: any, i) => {
            if (name.UID == id) {
              console.log(name.name);
              return (
                <IonRow  key={i}>
                  <IonCol >{name.name}</IonCol>
                  <IonCol >{name.number}</IonCol>
                </IonRow>
              );
            }
          })}
        </IonGrid>
        <IonFab
          className="ion-padding"
          id="add-botton"
          horizontal="end"
          slot="fixed"
        >
          <IonFabButton
            color="primary"
            routerLink="/Addcustomer"
            id="Customer-Add-Button"
          >
            <IonIcon icon={add} color="light" id="add-icon"></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </>
  );
}
export default Example;
