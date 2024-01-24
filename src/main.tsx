import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { IonNav } from '@ionic/react';
import ExploreContainers from './components/Home';
const container = document.getElementById('root');
const root = createRoot(container!);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


 function main() {
  return (
    <div>
      <IonNav root={() => <ExploreContainers/>}></IonNav>
    </div>
  )
}
export default main;
