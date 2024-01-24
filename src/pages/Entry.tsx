import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonBackButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  useIonToast,
  IonInput,
  IonRadio,
  IonRadioGroup,
  IonDatetime,
  IonDatetimeButton,
} from "@ionic/react";
import { format, parseISO } from "date-fns";
import { caretDown, create } from "ionicons/icons";
import style from "./EntryAddcustomer.module.scss";
import { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../firebaseconfig";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Example() {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const [canDismiss, setCanDismiss] = useState(false);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    console.log("hello");
    modal.current?.dismiss();
  }
  const [month, setDate] = useState("");
  const [Price, setPrice] = useState({});
  const [selectedName, setSelectedName] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [data, setData] = useState([]);
  const [id, setUid] = useState("");
  const [present] = useIonToast();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  // customer name and number fetching
  const handleNameChange = (e: any) => {
    setSelectedName(e.target.value);
  };
  const handlePhoneNumber = (e: any) => {
    setSelectedNumber(e.target.value);
    dismiss();
  };

  const fetchPost = async () => {
    await getDocs(collection(firestore, "Customer-info")).then(
      (querySnapshot: { docs: any[] }) => {
        const newData: any = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(newData);
      }
    );
  };
  useEffect(() => {
    fetchPost();
  }, []);
  // data insert to firebase
  const userCollectionRef = collection(firestore, "CustomerEntry");
  const postData = (e: any) => {
    e.preventDefault();
    if (month && Price) {
      addDoc(userCollectionRef, {
        name: selectedName,
        number: selectedNumber,
        month: format(parseISO(month), "MMM d, yyyy"),
        price: Price,
      }).then(() => {
        submitToast("top");
        setDate(" "), setPrice(" "), setSelectedNumber(" ");
        submitToast("top");
        console.log(Price);
      });
    } else {
      notSubmitToast("top");
    }
  };
  // const [Customer, setcustomer] = useState("value");
  // Toast Message++

  const submitToast = (position: "top") => {
    present({
      message: "Submitted successfully ",
      duration: 2500,
      position: position,
    });
  };
  const notSubmitToast = (position: "top") => {
    present({
      message: "Please select month",
      duration: 2500,
      position: position,
    });
  };
  const datetime = useRef<null | HTMLIonDatetimeElement>(null);

  // useEffect(() => {
  //   if (!datetime.current) return;
  //   datetime.current.value = ["2022-06-03", "2022-06-13", "2022-06-29"];
  // }, []);

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonItem slot="start" color="primary">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonItem>
          <IonTitle className={style.pageheader}> Entry Customer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <section className={style.Addcustomer_content}>
          <div className="ion-padding">
            <IonIcon icon={create} className="ion-padding"></IonIcon>
            <div className={style.Addcustomertext}>
              <h1>Fill in your customer details </h1>
            </div>
          </div>

          <section>
            <IonItem color="light" className={style.selectitem_icon}>
              <IonLabel id="open-modal">
                <>
                  {selectedNumber == selectedName
                    ? "Select Name"
                    : selectedNumber}
                </>{" "}
              </IonLabel>

              <IonIcon
                icon={caretDown}
                className={style.select_icon}
                id="open-modal"
              ></IonIcon>
            </IonItem>
            <IonItem color="light">
              <IonLabel position="fixed" slot="start">
                Month
              </IonLabel>

              <IonDatetimeButton
                datetime="datetime"
                className={style.datepicker}
              ></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  onIonChange={(e: any) => {
                    setDate(e.target.value);
                  }}
                  id="datetime"
                  presentation="month-year"
                  // date-Formate="MM/YYYY"
                  display-Format="MM YYYY"
                  preferWheel={true}
                  // presentation="date"
                  // date-Wheels="|MMMM YYYY|"
                ></IonDatetime>
              </IonModal>
            </IonItem>
            <IonItem color="light">
              <IonLabel position="fixed">Price</IonLabel>

              <IonInput
                type="number"
                name="price"
                onKeyUp={(e: any) => {
                  setPrice(e.target.value);
                }}
                required
              />
            </IonItem>
            <IonItem color="light">
              <IonLabel>Recuring Entry</IonLabel>
              <IonCheckbox />
            </IonItem>

            <IonButton
              className="ion-margin-top"
              type="button"
              expand="block"
              color="primary"
              onClick={postData}
            >
              Add Entry
            </IonButton>
          </section>
          <IonModal ref={modal} trigger="open-modal">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle className={style.pages_header}>
                  {" "}
                  Entry Customer
                </IonTitle>
                <IonButton
                  onClick={() => dismiss()}
                  slot="end"
                  fill="clear"
                  color="light"
                >
                  Close
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonItem color="light" className="ion-padding">
                <IonLabel className="ion-text-wrap" {...{ for: "terms" }}>
                  {/* Do you accept the terms and conditions? */}
                  <IonRadioGroup
                    onIonChange={handlePhoneNumber}
                    value={selectedNumber}
                  >
                    {data.map((index: any, a) => {
                      if (index.UID == id) {
                        return (
                          <div
                            key={a}
                            id="radio-button-css"
                            className="ion-padding"
                          >
                            <IonRadio
                              value={index.number}
                              onChange={(e: any) => {
                                setCanDismiss(e.detail.checked);
                              }}
                            >
                              <div className={style.readio_group}>
                                {" "}
                                <h2>{index.name}</h2>
                                <p>{index.number}</p>
                              </div>
                            </IonRadio>
                          </div>
                        );
                      }
                    })}
                  </IonRadioGroup>
                </IonLabel>
              </IonItem>
            </IonContent>
          </IonModal>
        </section>
      </IonContent>
    </IonPage>
  );
}

export default Example;
