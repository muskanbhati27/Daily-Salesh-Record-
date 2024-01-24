import {
  IonButton,
  IonCheckbox,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  useIonToast,
} from "@ionic/react";
import style from "../pages/LoginSignup.module.scss";
import React from "react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { create, person } from "ionicons/icons";
interface ContainerProps {}
const Login: React.FC<ContainerProps> = () => {
  useEffect(() => {
    if (localStorage.getItem("UID")) {
      history.push("/home");
      console.log("hello");
    }
  }, []);
  const [present] = useIonToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  //login
  const userLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        localStorage.setItem("UID", user.uid);
        submitToast("top");
        history.push("/home");
        console.log("hello");
      })
      .catch(() => {
        notSubmitToast("top");
        console.log("hiii");
      });
  };
  const submitToast = (position: "top") => {
    present({
      message: "Login successfully",
      duration: 2000,
      position: position,
    });
  };
  const notSubmitToast = (position: "top") => {
    present({
      message: "User Not Exists Check username & Password",
      duration: 2500,
      position: position,
    });
  };
  return (
    <>
      <IonHeader className={style.login_Header}>
        <h1>Welcome</h1>
        <IonText>Sign in to continue!</IonText>
      </IonHeader>
      <div className={style.Login_content}>
        <form>
          <IonInput
            label="Email"
            label-placement="floating"
            fill="outline"
            placeholder="Enter Email"
            type="email"
            value={email}
            onIonChange={handleEmail}
          />
          <IonInput
            className="ion-margin-top"
            label="Password"
            label-placement="floating"
            fill="outline"
            placeholder="Enter Password"
            type="password"
            value={password}
            onKeyUp={handlePassword}
          />

          <IonButton
            type="button"
            expand="block"
            onClick={userLogin}
            className={style.login_signupbutton}
          >
            Login
          </IonButton>
        </form>{" "}
        <IonText>Don't have an acount? </IonText>
        <IonButton
          type="button"
          expand="block"
          color="primary"
          routerLink="/Signup"
          fill="clear"
          className={style.Forward_link}
        >
          Sign-Up
        </IonButton>
      </div>
    </>
  );
};
export default Login;
