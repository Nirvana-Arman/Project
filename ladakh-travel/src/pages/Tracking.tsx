import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonIcon,
} from '@ionic/react';

import {
  arrowBackOutline,
  ellipsisVerticalOutline,
  busOutline,
  timeOutline,
  locationOutline,
  navigateOutline,
  chevronForwardOutline,
} from 'ionicons/icons';

import './Tracking.css';

const Tracking: React.FC = () => {
  const [selectedBus] = useState({
    number: 'JK10 AB 1234',
    type: 'Volvo Bus',
    route: 'Leh → Diskit',
    status: 'On Time',
    eta: '10:24 AM',
    etaMin: '5 min away',
    nextStop: 'Hunder',
    nextStopTime: '10:45 AM',
    from: 'Leh',
    to: 'Diskit',
    progress: 65,
  });

  const stops = [
    { name: 'Leh', time: '08:00 AM', done: true },
    { name: 'Nimmu', time: '08:45 AM', done: true },
    { name: 'Basgo', time: '09:15 AM', done: true },
    { name: 'Hunder', time: '10:45 AM', done: false, next: true },
    { name: 'Sumur', time: '11:30 AM', done: false },
    { name: 'Diskit', time: '12:15 PM', done: false },
  ];

  return (
    <IonPage>
      <IonContent fullscreen scrollY={true}>
        
        {/* HEADER */}
        <div className="lt-header">
          <IonIcon
            icon={arrowBackOutline}
            className="lt-back-icon"
            onClick={() => history.back()}
/>
          <span className="lt-title">Live Tracking</span>
          <IonIcon icon={ellipsisVerticalOutline} className="lt-menu-icon" />
        </div>

        {/* MAP AREA */}
        <div className="lt-map-area">
          <div className="lt-map-bg">

            {/* Simulated map with route line */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 360 220"
              preserveAspectRatio="none"
            >
              {/* Background grid lines */}
              {[40, 80, 120, 160, 200].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="360"
                  y2={y}
                  stroke="#c8d8e8"
                  strokeWidth="0.5"
                />
              ))}

              {[60, 120, 180, 240, 300].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="220"
                  stroke="#c8d8e8"
                  strokeWidth="0.5"
                />
              ))}

              {/* Route path */}
              <path
                d="M 30 180 Q 80 160 120 130 Q 160 100 200 80 Q 240 60 300 40"
                fill="none"
                stroke="#90caf9"
                strokeWidth="3"
                strokeDasharray="6,3"
              />

              {/* Completed route */}
              <path
                d="M 30 180 Q 80 160 120 130 Q 150 108 175 92"
                fill="none"
                stroke="#1565c0"
                strokeWidth="4"
              />

              {/* Bus marker */}
              <circle cx="175" cy="92" r="14" fill="#1565c0" />
              <text
                x="175"
                y="97"
                textAnchor="middle"
                fill="white"
                fontSize="12"
              >
                🚌
              </text>

              {/* Start dot */}
              <circle cx="30" cy="180" r="6" fill="#2e7d32" />

              {/* End dot */}
              <circle cx="300" cy="40" r="6" fill="#c62828" />
            </svg>

            {/* Bus info bubble on map */}
            <div className="lt-map-bubble">
              <IonIcon icon={busOutline} className="bubble-icon" />

              <div>
                <p className="bubble-number">
                  Bus {selectedBus.number}
                </p>

                <p className="bubble-route">
                  {selectedBus.route}
                </p>
              </div>

              <span
                className={`bubble-status ${
                  selectedBus.status === 'On Time'
                    ? 'green'
                    : 'red'
                }`}
              >
                {selectedBus.status}
              </span>
            </div>
          </div>
        </div>

        {/* BUS DETAIL CARD */}
        <div className="lt-card">
          <div className="lt-card-header">
            <div className="lt-bus-icon-wrap">
              <IonIcon icon={busOutline} />
            </div>

            <div className="lt-bus-info">
              <p className="lt-bus-number">
                Bus {selectedBus.number}
              </p>

              <p className="lt-bus-type">
                {selectedBus.type}
              </p>
            </div>

            <IonIcon
              icon={ellipsisVerticalOutline}
              className="lt-dots"
            />
          </div>

          {/* ETA Row */}
          <div className="lt-eta-row">
            <div className="lt-eta-box">
              <IonIcon icon={timeOutline} className="eta-icon" />

              <div>
                <p className="eta-label">ETA</p>
                <p className="eta-value">{selectedBus.eta}</p>
              </div>
            </div>

            <div className="lt-eta-divider" />

            <div className="lt-eta-box">
              <IonIcon icon={navigateOutline} className="eta-icon" />

              <div>
                <p className="eta-label">Distance</p>
                <p className="eta-value">{selectedBus.etaMin}</p>
              </div>
            </div>
          </div>

          {/* Next Stop */}
          <div className="lt-next-stop">
            <p className="next-stop-label">Next Stop</p>

            <div className="next-stop-row">
              <span className="next-stop-name">
                {selectedBus.nextStop}
              </span>

              <span className="next-stop-time">
                {selectedBus.nextStopTime}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="lt-progress-wrap">
            <div className="lt-progress-labels">
              <div className="lt-prog-stop">
                <IonIcon
                  icon={locationOutline}
                  className="prog-icon green"
                />
                <span>{selectedBus.from}</span>
              </div>

              <div className="lt-prog-stop">
                <IonIcon
                  icon={locationOutline}
                  className="prog-icon red"
                />
                <span>{selectedBus.to}</span>
              </div>
            </div>

            <div className="lt-progress-bar">
              <div
                className="lt-progress-fill"
                style={{ width: `${selectedBus.progress}%` }}
              />

              <div
                className="lt-bus-dot"
                style={{ left: `${selectedBus.progress}%` }}
              >
                🚌
              </div>
            </div>
          </div>

          {/* View Full Route Button */}
          <button className="lt-full-route-btn">
            View Full Route
            <IonIcon icon={chevronForwardOutline} />
          </button>
        </div>

        {/* STOPS LIST */}
        <div className="lt-stops-section">
          <p className="lt-stops-title">All Stops</p>

          <div className="lt-stops-list">
            {stops.map((stop, i) => (
              <div className="lt-stop-item" key={i}>
                
                <div className="lt-stop-line-wrap">
                  <div
                    className={`lt-stop-dot ${
                      stop.done
                        ? 'done'
                        : stop.next
                        ? 'next'
                        : ''
                    }`}
                  />

                  {i < stops.length - 1 && (
                    <div
                      className={`lt-stop-connector ${
                        stop.done ? 'done' : ''
                      }`}
                    />
                  )}
                </div>

                <div
                  className={`lt-stop-info ${
                    stop.next ? 'highlighted' : ''
                  }`}
                >
                  <span className="lt-stop-name">
                    {stop.name}
                  </span>

                  <span className="lt-stop-time">
                    {stop.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bottom-space" />
      </IonContent>
    </IonPage>
  );
};

export default Tracking;