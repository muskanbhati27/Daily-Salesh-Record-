import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
} from "@ionic/react";
import style from "./Recuringdetails.module.scss";
import { add } from "ionicons/icons";
import Header from "./Header";
import { IonBackButton, IonItem, IonTitle, IonToolbar } from "@ionic/react";
import { firestore } from "../firebaseconfig";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseconfig";
const auth = getAuth(app);
function Example() {
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
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
          <IonTitle color="light" size="large" className={style.pagesheader}>
            Recuring Details
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="ion-padding">
          <IonCard className={style.recuring_card}>
            <IonCardHeader>
              <IonCardTitle>Muskan Bhati</IonCardTitle>
              <IonCardSubtitle>6267862266</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <h2 >Start Date:22 july 2023</h2>
              <h2 >End Date: 22 july 2023</h2>
            </IonCardContent>

            <>
              <IonButton id="present-alert-1" fill="clear">
                Click Me
              </IonButton>
              <IonAlert
                header="Are you sure!"
                trigger="present-alert-1"
                buttons={[
                  {
                    text: "no",
                    role: "cancel",
                  },
                  {
                    text: "yes",
                    role: "confirm",
                  },
                ]}
                onDidDismiss={({ detail }) =>
                  setRoleMessage(`Dismissed with role: ${detail.role}`)
                }
              ></IonAlert>
            </>
          </IonCard>
        </div>
      </IonContent>
    </>
  );
}
export default Example;
