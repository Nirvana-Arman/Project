import React from 'react';

import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Scan from './pages/Scan';
import { Redirect, Route } from 'react-router-dom';

import Home from './pages/Home';
import LiveTracking from './pages/Tracking';
import OfflineMap from './pages/Offline';
import EmergencySOS from './pages/EmergencySOS';

const App: React.FC = () => {
  return (
    <IonApp>

      <IonReactRouter>

        <IonRouterOutlet>

          <Route exact path="/home" component={Home} />
          <Route exact path="/scan" component={Scan} />
          <Route
            exact
            path="/live-tracking"
            component={LiveTracking}
          />

          <Route
            exact
            path="/offline-map"
            component={OfflineMap}
          />

          <Route
            exact
            path="/sos"
            component={EmergencySOS}
          />

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

        </IonRouterOutlet>

      </IonReactRouter>

    </IonApp>
  );
};

export default App;