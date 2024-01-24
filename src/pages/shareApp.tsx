import React, { useState, useRef, useEffect } from "react";
import {
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonIcon,
  IonText,
} from "@ionic/react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import style from  "../pages/ShareApp.module.scss";
import { paperPlane } from "ionicons/icons";
function Example() {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  useEffect(() => {
    setPresentingElement(page.current);
  }, []);
  function dismiss() {
    modal.current?.dismiss();
  }
  const shareUrl = "https://webcrudoperation.netlify.app/";
  const title = "Check out this awesome app!";
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonItem slot="start" color="primary">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonItem>
          <IonTitle className={style.pageheader}> ShareApp</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className={style.ShareApp_content}>
        <IonContent className="ion-padding" >
          <div className="ion-padding">
            <IonIcon
              icon={paperPlane}
              className="ion-padding"
             
            ></IonIcon>
            <div className={style.Addcustomer_text} >
              <h1>Invite a Friend</h1>
             
            </div>
          </div>

          <IonList className="ion-padding">
            <IonItem lines="none">
              <FacebookShareButton url={shareUrl} quote={title}>
                <IonButton color="primary" >
                  Facebook
                </IonButton>
              </FacebookShareButton>
            </IonItem>
            <IonItem lines="none">
              <TwitterShareButton url={shareUrl} title={title}>
                <IonButton color="primary"  slot="start">
                  Twitters
                </IonButton>
              </TwitterShareButton>
            </IonItem>
            <IonItem lines="none">
              <WhatsappShareButton url={shareUrl} title={title}>
                <IonButton color="primary" >
                  WhatsApp
                </IonButton>
              </WhatsappShareButton>
            </IonItem>
          </IonList>
        </IonContent>
      </div>
    </>
  );
}

export default Example;
