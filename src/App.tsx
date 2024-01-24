import {
  IonApp,
  IonMenu,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Router } from "react-router-dom";
import Login from "./pages/Login";
import login from "./pages/Page.css";
import ExploreContainer from "./components/Home";
import Entry from "./pages/Entry";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";
import Addcustomer from "./pages/Addcustomer";
import Menu from "./components/Menu";
import Customer from "./pages/Customer";
import Signup from "./pages/Signup";
import Genratebill from "./pages/Genratebill";
import ShareApp from "./pages/shareApp";
import Home from "./components/Home";
import Protect from "./pages/Protect";
import Recuring from "./pages/Recuring";
 
setupIonicReact();
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <>
          
            <Route path="/Home" exact={true}>
              <Protect Cmp={Home} />
            </Route>            
            <Route path="/Addcustomer" exact={true}>
              <Protect Cmp={Addcustomer} />
            </Route>
            <Route path="/Entry" exact={true}>
              <Protect Cmp={Entry} />
            </Route>
            <Route path="/Customer" exact={true}>
              <Protect Cmp={Customer} />
            </Route>
            
            <Route path="/Genratebill" exact={true}>
              <Protect Cmp={Genratebill} />
            </Route>
            <Route path="/ShareApp" exact={true}>
              <Protect Cmp={ShareApp} />
            </Route>
            <Route path="/Recuring" exact={true}>
              <Protect Cmp={Recuring} />
            </Route>
           
            
            

            <Route
              path="/"
              component={localStorage.getItem("UID") ? Home : Login}
              exact={true}
            />
            <Route
              path="/Signup"
              component={localStorage.getItem("UID") ? Home : Signup}
              exact={true}
            />
          </>

          {/* <Route path ="/app" component={Menu} exact={true}/> */}
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
