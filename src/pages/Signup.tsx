import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import Login from "../pages/Login";
import style from "../pages/LoginSignup.module.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../firebaseconfig";
import { collection, addDoc } from "@firebase/firestore";

const sigup: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("UID")) {
      history.push("/home");
    }
  }, []);
  const [value, setvalue] = useState({
    name: "",
  });
  const [present] = useIonToast();
  const [email, setEmail] = useState("");
  // const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  // const { signUp } = useUserAuth();
  const history = useHistory();
  // const [user, setUser] = useState();
  //  const [uid, setUid] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError("");
  //     try {
  //       await signUp(email, password);
  //       navigate("/");
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };
  // singup
  const createUser = async (e: any) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        history.push("/");
        submitToast("top");
        await updateProfile(user, {
          displayName: value.name,
        });
        //Admin collection to store uid and email
        const userCollectionRef = collection(firestore, "ADMIN");
        addDoc(userCollectionRef, {
          Uid: user.uid,
          email: user.email,
        });
        // localStorage.setItem("UID",   user.uid)
        console.log(value);
        console.log(user.uid);
        // console.log("Stored UID = ", localStorage.getItem("UID"));
      })
      .catch(() => {
        notSubmitToast("top");
      });
  };
  //Toast create Msg
  const submitToast = (position: "top") => {
    present({
      message: "Singup successfully",
      duration: 2500,
      position: position,
    });
  };
  const notSubmitToast = (position: "top") => {
    present({
      message: "please fill all fields properly",
      duration: 2500,
      position: position,
    });
  };
  return (
    <>
      <IonHeader className={style.login_Header}>
        <h1>Let's Create! </h1>
        <IonText>Sign up to get started!</IonText>
      </IonHeader>
      <div className={style.Login_content}>
        <form>
          <IonInput
            label="Username"
            label-placement="floating"
            fill="outline"
            placeholder="Enter Username"
            type="text"
            onIonChange={(e: any) =>
              setvalue((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <IonInput
            label="Email"
            label-placement="floating"
            fill="outline"
            placeholder="Enter Email"
            className="ion-margin-top"
            type="email"
            value={email}
            onIonChange={(e: any) => setEmail(e.target.value)}
          />

          <IonInput
            className="ion-margin-top"
            label="Password"
            label-placement="floating"
            fill="outline"
            placeholder="Enter Password"
            type="password"
            value={password}
            onKeyUp={(e: any) => setPassword(e.target.value)}
          />
          <IonButton
            type="button"
            expand="block"
            onClick={createUser}
            id="Login"
            className={style.login_signupbutton}
          >
            Signup
          </IonButton>
        </form>
        <IonText>I'm already a member </IonText>
        <IonButton
          type="button"
          expand="block" 
          color="primary"
          routerLink="/"
          fill="clear"
          className={style.Forward_link}
        >
          Sign-In
        </IonButton>
      </div>
    </>
  );
};

export default sigup;
