import './Home.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonIcon,
  IonRippleEffect,
  IonInput,
} from '@ionic/react';

import {
  notificationsOutline,
  menuOutline,
  locationOutline,
  swapVerticalOutline,
  searchOutline,
  busOutline,
  cloudOutline,
  mapOutline,
  alertCircleOutline,
  documentTextOutline,
  cashOutline,
  alertOutline,
  leafOutline,
} from 'ionicons/icons';



const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen scrollY={true}>

        {/* HERO SECTION */}
        <div className="hero-section">
          <div className="hero-overlay" />

          <div className="hero-top-bar">
            <IonIcon icon={menuOutline} className="hero-icon" />

            <div className="hero-logo">
              <span className="logo-text">LADAKH</span>
              <span className="logo-sub">SMART TRAVEL</span>
            </div>

            <IonIcon icon={notificationsOutline} className="hero-icon" />
          </div>

          <div className="hero-content">
            <p className="greeting">Good Morning, Traveler! 👋</p>

            {/* SEARCH CARD */}
            <div className="search-card">
              <p className="search-label">Plan Your Journey</p>

              <div className="input-row">
                <IonIcon icon={locationOutline} className="input-icon green" />
                <IonInput className="route-input" placeholder="From: Leh" />
              </div>

              <div className="divider-line" />

              <div className="input-row">
                <IonIcon icon={locationOutline} className="input-icon blue" />
                <IonInput className="route-input" placeholder="To: Nubra Valley" />
                <IonIcon icon={swapVerticalOutline} className="swap-icon" />
              </div>

              <button className="search-btn">
                <IonIcon icon={searchOutline} />
                Search Route
              </button>
            </div>
          </div>
        </div>

        {/* QUICK ACCESS */}
        <div className="section">
          <div className="section-header">
            <span className="section-title">Quick Access</span>
            <span className="see-all">See All</span>
          </div>

          <div className="quick-grid">
            {quickItems.map((item, i) => (
              <div
                key={i}
                className="quick-item ion-activatable"
                onClick={() => history.push(item.route)}
              >
                <IonRippleEffect />

                <div className={`quick-icon-wrap ${item.color}`}>
                  <IonIcon icon={item.icon} />
                
                </div>

                <span className="quick-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR ROUTES */}
        <div className="section">
          <div className="section-header">
            <span className="section-title">Popular Routes</span>
            <span className="see-all">See All</span>
          </div>

          {routes.map((route, i) => (
            <div className="route-card" key={i}>
              <div className="route-info">
                <span className="route-name">
                  {route.from} → {route.to}
                </span>
                <span className="route-detail">
                  {route.duration} • {route.km} km
                </span>
              </div>

              {route.recommended && (
                <span className="badge-recommended">Recommended</span>
              )}
            </div>
          ))}
        </div>

        {/* ALERTS */}
        <div className="section">
          <div className="alert-banner red">
            <IonIcon icon={alertCircleOutline} />
            <div>
              <p className="alert-title">Road Closed</p>
              <p className="alert-desc">
                Leh–Khardung La Road due to heavy snowfall
              </p>
            </div>
          </div>

          <div className="alert-banner yellow">
            <IonIcon icon={alertOutline} />
            <div>
              <p className="alert-title">Landslide Alert</p>
              <p className="alert-desc">
                Srinagar–Leh Highway, drive with caution
              </p>
            </div>
          </div>
        </div>

        <div className="bottom-space" />
      </IonContent>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        {navItems.map((item, i) => (
          <div className={`nav-item ${i === 0 ? 'active' : ''}`} key={i}>
            <IonIcon icon={item.icon} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </IonPage>
  );
};

/* QUICK ITEMS */
const quickItems = [
  { label: 'Scan', icon: searchOutline, route: '/scan' },
  { label: 'Live Tracking', icon: busOutline, color: 'blue', route: '/live-tracking' },
  { label: 'Weather Alert', icon: cloudOutline, color: 'purple', route: '/weather' },
  { label: 'Offline Map', icon: mapOutline, color: 'green', route: '/offline-map' },
  { label: 'Road Status', icon: alertCircleOutline, color: 'orange', route: '/road-status' },
  { label: 'Permits', icon: documentTextOutline, color: 'teal', route: '/permits' },
  { label: 'Fare Check', icon: cashOutline, color: 'indigo', route: '/fare' },
  { label: 'SOS', icon: alertOutline, color: 'red', route: '/sos' },
  { label: 'Eco Tracker', icon: leafOutline, color: 'lime', route: '/eco' },
];

/* ROUTES */
const routes = [
  { from: 'Leh', to: 'Pangong', duration: '5h 30m', km: 160, recommended: true },
  { from: 'Leh', to: 'Nubra Valley', duration: '4h 00m', km: 120, recommended: false },
  { from: 'Leh', to: 'Diskit', duration: '4h 30m', km: 130, recommended: false },
];

/* BOTTOM NAV */
const navItems = [
  { label: 'Home', icon: locationOutline },
  { label: 'Map', icon: mapOutline },
  { label: 'Scan', icon: searchOutline },
  { label: 'Wallet', icon: cashOutline },
  { label: 'Profile', icon: documentTextOutline },
];

export default Home;