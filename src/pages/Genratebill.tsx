import {
  IonButton,
  IonBackButton,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonIcon,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonRadio,
  IonRadioGroup,
  IonContent,
  IonHeader,
} from "@ionic/react";
import style from "./Genratebill.module.scss";
import { format, parseISO } from "date-fns";
import { IonItem, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { auth, firestore } from "../firebaseconfig";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { caretDown, newspaper } from "ionicons/icons";
function Genrate() {
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
  const [selectedName, setSelectedName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [data, setData] = useState([]);
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
  //fetch the data of customer
  const fetchPost = async () => {
    await getDocs(collection(firestore, "Customer-info")).then(
      (querySnapshot: { docs: any[] }) => {
        const newData: any = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(newData);
        // console.log(newData);
      }
    );
  };
  useEffect(() => {
    fetchPost();
  }, []);
  // Store the selected options in Firebase to genrate bill

  // const handleMonthChange = (e: any) => {
  //   setSelectedMonth(e.target.value);
  // };
  const handleNumberChange = (e: any) => {
    setSelectedNumber(e.target.value);
    dismiss();
  };
  const handleNameChange = (e: any) => {
    setSelectedName(e.target.value);
  };

  //const [names, setNames] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    // Calculate the total price when the selected name or month changes
    if (selectedNumber && selectedMonth) {
      getDocs(collection(firestore, "CustomerEntry")).then(
        (querySnapshot: { docs: any[] }) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const selectedData = Object.values(newData).filter(
            (item) =>
              item.number === selectedNumber && item.month === selectedMonth
          );
          console.log(selectedData);
          const totalPriceForMonth = selectedData.reduce(
            (total, item: { price: any }) => total + Number(item.price),
            0
          );
          setTotalPrice(totalPriceForMonth);
          console.log(totalPriceForMonth);
        }
      );
    }
  }, [selectedName, selectedMonth]);
  return (
    <>
      <IonToolbar color="primary">
        <IonItem slot="start" color="primary">
          <IonBackButton color="light" defaultHref="/"></IonBackButton>
        </IonItem>
        <IonTitle color="light" size="large" className={style.pageheader}>
          Genrate Bill
        </IonTitle>
      </IonToolbar>
      <div className={style.Genratebill_content}>
        <div className="ion-padding">
          <IonIcon icon={newspaper} className="ion-padding"></IonIcon>
          <div className={style.Genratebill_text}>
            <h1>Customer Information</h1>
            <IonText>Fill details to Genrate customer bill</IonText>
          </div>
        </div>
        <form className={style.Genratebill_form}>
          <IonItem color="light">
            <IonLabel id="open-modal">
              <>
                {selectedNumber == selectedName
                  ? "Select Name"
                  : selectedNumber}
              </>{" "}
            </IonLabel>

            <IonIcon icon={caretDown} id="open-modal"></IonIcon>
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
                  setSelectedMonth(
                    format(parseISO(e.target.value), "MMM d, yyyy")
                  );
                }}
                id="datetime"
                presentation="month-year"
                display-Format="MM YYYY"
                preferWheel={true}
              ></IonDatetime>
            </IonModal>
          </IonItem>
          <IonModal ref={modal} trigger="open-modal">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle id="pages-header"> Entry Customer</IonTitle>
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
                  <IonRadioGroup
                  onIonChange={handleNumberChange}
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
                            <div className={style.readio_group} >
                              {" "}
                              <h2 >{index.name}</h2>
                              <p >{index.number}</p>
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
          <IonItem color="light">
            {selectedNumber && selectedMonth && (
              <IonText color="dark">
                <h3 id="bill-hrading">" Bill "</h3>

                <h4 id="bill-name">
                  Customer Number - {selectedNumber}
                  <br />
                  Month - {selectedMonth}
                  <br />
                  Total Price - ${totalPrice}
                </h4>
              </IonText>
            )}
          </IonItem>
          <IonButton
            type="button"
            expand="block"
            color="primary"
            //onClick={generatePDF}
          >
            Genrate Bill
          </IonButton>
        </form>
      </div>
    </>
  );
}
export default Genrate;
