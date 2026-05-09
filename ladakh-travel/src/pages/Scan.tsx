import React, { useState } from 'react';

import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonTitle,
} from '@ionic/react';

import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

const Scan: React.FC = () => {

  const [scanResult, setScanResult] =
    useState('');

  const [startLocation, setStartLocation] =
    useState('');

  const [destination, setDestination] =
    useState('');

  const [fare, setFare] =
    useState<number | null>(null);

  /* =========================
     CALCULATE FARE
  ========================= */

  const calculateFare = (
    from: string,
    to: string
  ) => {

    const fares: any = {
      'LEH-PANGONG': 450,
      'LEH-NUBRA': 350,
      'LEH-DISKIT': 300,
      'NUBRA-LEH': 350,
      'PANGONG-LEH': 450,
    };

    const key =
      `${from.toUpperCase()}-${to.toUpperCase()}`;

    const price =
      fares[key] || 200;

    setFare(price);

    alert(
      `Trip: ${from} → ${to}\nFare: ₹${price}`
    );

    /* OPEN PAYMENT APP */

    window.location.href =
      `upi://pay?pa=test@upi&pn=LadakhTravel&am=${price}&cu=INR`;
  };

  /* =========================
     QR SCAN
  ========================= */

  const startScan = async () => {

    try {

      const result =
        await BarcodeScanner.scan();

      if (result.barcodes.length > 0) {

        const value =
          result.barcodes[0].displayValue || '';

        setScanResult(value);

        console.log('QR:', value);

        /* FIRST SCAN */

        if (!startLocation) {

          setStartLocation(value);

          alert(
            `Start Location Saved: ${value}`
          );

        }

        /* SECOND SCAN */

        else {

          setDestination(value);

          calculateFare(
            startLocation,
            value
          );
        }
      }

    } catch (error) {

      console.log(error);

      alert('Scanner failed');

    }
  };

  /* =========================
     RESET TRIP
  ========================= */

  const resetTrip = () => {

    setStartLocation('');
    setDestination('');
    setFare(null);
    setScanResult('');

  };

  return (
    <IonPage>

      <IonContent className="ion-padding">

        <IonTitle>
          Smart QR Ticket Scanner
        </IonTitle>

        <br />

        <IonButton
          expand="block"
          onClick={startScan}
        >
          Scan QR
        </IonButton>

        <br />

        <IonButton
          expand="block"
          color="medium"
          onClick={resetTrip}
        >
          Reset Journey
        </IonButton>

        <br />

        <IonCard>

          <IonCardContent>

            <IonText>

              <h2>
                Last Scan:
              </h2>

              <p>{scanResult || 'No QR scanned'}</p>

              <hr />

              <h2>
                Start Location:
              </h2>

              <p>
                {startLocation || 'Not selected'}
              </p>

              <hr />

              <h2>
                Destination:
              </h2>

              <p>
                {destination || 'Not selected'}
              </p>

              <hr />

              <h2>
                Estimated Fare:
              </h2>

              <p>
                {fare ? `₹${fare}` : '--'}
              </p>

            </IonText>

          </IonCardContent>

        </IonCard>

      </IonContent>

    </IonPage>
  );
};

export default Scan;