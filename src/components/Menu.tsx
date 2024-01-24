import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonText,
  useIonToast,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import {
  close,
  caretDown,
  home,
  newspaper,
  paperPlane,
  person,
  receipt,
  logOut,
  logOutOutline,
  backspace,
  chevronBack,
  arrowBackOutline,
  closeCircle,
} from "ionicons/icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
// import "./Menu.css";
import style from "./Menu.module.scss";
import { useEffect, useState } from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/Home",
    iosIcon: home,
    mdIcon: home,
  },
  {
    title: "Customer",
    url: "/Customer",
    iosIcon: person,
    mdIcon: person,
  },
  {
    title: "Genrate Bill",
    url: "/Genratebill",
    iosIcon: newspaper,
    mdIcon: newspaper,
  },
  {
    title: "Recuring",
    url: "/Recuring",
    iosIcon: receipt,
    mdIcon: receipt,
  },
  {
    title: "Share",
    url: "/ShareApp",
    iosIcon: paperPlane,
    mdIcon: paperPlane,
  },
];

const Menu: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const logOut = async () => {
    await localStorage.clear();
    history.push("/");
    submitToast("top");
    signOut(auth);
  };
  const submitToast = (position: "top") => {
    present({
      message: "Logout successfully ",
      duration: 2500,
      position: position,
    });
  };

  const location = useLocation();

  const [id, setUid] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUid(user.email);
        setName(user.displayName);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  return (
    <>
      <IonMenu contentId="main" type="overlay">
        <section>
          <IonHeader className={style.Menuheader_Design}>
            <IonMenuToggle className={style.Menuback_button}>
              <IonButton fill="clear" className="ion-margin-top">
                <IonIcon icon={chevronBack} className="select-icon"></IonIcon>
              </IonButton>
            </IonMenuToggle>
          </IonHeader>
        </section>
        <IonContent>
          <div className={style.Username_email}>
            <h1 className="ion-margin-top">{name}</h1>
            <br />
            <IonNote>{id}</IonNote>
          </div>
          <div className={style.featuer_menu}>
            {appPages.map((appPage, id) => {
              return (
                <div key={id}>
                  <IonMenuToggle key={id} autoHide={false}>
                    <IonItem
                      className={
                        location.pathname === appPage.url ? "selected" : ""
                      }
                      routerLink={appPage.url}
                      routerDirection="none"
                      lines="none"
                      detail={false}
                    >
                      <IonIcon
                        color="primary"
                        aria-hidden="true"
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel className={style.Menu_List}>
                        <h6>{appPage.title}</h6>
                      </IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                </div>
              );
            })}
            {/* </IonList> */}
          </div>
        </IonContent>
        <IonMenuToggle>
          <div className={style.logout_blog}>
            <IonButtons slot="end" className="ion-padding">
              <IonButton id="present-alert" fill="clear">
                Logout
              </IonButton>
              <IonAlert
                header="Confirm Logout?"
                trigger="present-alert"
                buttons={[
                  {
                    text: "Cancel",
                    role: "cancel",
                    handler: () => {
                      setHandlerMessage("Alert canceled");
                    },
                  },
                  {
                    text: "OK",
                    role: "confirm",
                    handler: () => {
                      setHandlerMessage("Alert confirmed");
                      logOut();
                    },
                  },
                ]}
                onDidDismiss={({ detail }) =>
                  setRoleMessage(`Dismissed with role: ${detail.role}`)
                }
              ></IonAlert>
            </IonButtons>
          </div>
        </IonMenuToggle>
      </IonMenu>
    </>
  );
};

export default Menu;
