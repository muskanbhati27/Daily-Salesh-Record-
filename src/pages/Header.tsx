import {
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import style from "./Header.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
const Page: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { name } = useParams<{ name: string }>();
  const logOut = () => {
    localStorage.clear();
    console.log("hello");
    signOut(auth);
    history.push("/");
    submitToast("top");
  };
  const submitToast = (position: "top") => {
    present({
      message: "Logout successfully ",
      duration: 2500,
      position: position,
    });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle className={style.header_heading}>Info Customer</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Page;
