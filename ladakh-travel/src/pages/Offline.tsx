import React from 'react';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from '@ionic/react';

import './Offline.css';

const OfflineMap: React.FC = () => {
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>

          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>

          <IonTitle>Offline Map</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <div className="map-container">

          <iframe
            title="Google Map"
            src="https://maps.google.com/maps?q=leh%20ladakh&t=&z=10&ie=UTF8&iwloc=&output=embed"
            className="map-frame"
            loading="lazy"
          />

        </div>

      </IonContent>

    </IonPage>
  );
};

export default OfflineMap;