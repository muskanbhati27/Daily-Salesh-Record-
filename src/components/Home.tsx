import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonText,
} from "@ionic/react";
import { personAdd, create } from "ionicons/icons";
import style from "./Home.module.scss";
import Header from "../pages/Header";
const ExploreContainers = () => {
  return (
    <>
      <Header />
      <div className={style.Home_container}>
        <IonContent className="ion-padding">
          <div className={style.card_container}>
            <IonCard className="ion-padding">
              <IonCardHeader className="ion-padding">
                <IonAvatar>
                  <IonIcon icon={personAdd}></IonIcon>
                </IonAvatar>
              </IonCardHeader>

              <IonCardContent>
                <IonText>
                  <h1>Add Customer</h1>
                </IonText>
                <IonText className={style.cardsubtitle}>
                  <h5>Adding for Create a new user </h5>
                </IonText>
                <div className="ion-padding">
                  <IonButton color="primary" routerLink="/Addcustomer">
                    Customers Add
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="ion-padding">
              <IonCardHeader className="ion-padding">
                <IonAvatar>
                  <IonIcon icon={create}></IonIcon>
                </IonAvatar>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <h1>Add Entry</h1>
                </IonText>
                <IonText className={style.cardsubtitle}>
                  <h5>Add A Entry for users Details </h5>
                </IonText>
                <div className="ion-padding">
                  <IonButton color="primary" routerLink="/Entry">
                    Customer Entry
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </div>
    </>
  );
};
export default ExploreContainers;
