import React, { useState, useEffect, useRef } from 'react';
import {
  IonPage,
  IonContent,
  IonIcon,
  IonAlert,
} from '@ionic/react';

import {
  arrowBackOutline,
  callOutline,
  locationOutline,
  peopleOutline,
  addOutline,
  trashOutline,
  createOutline,
  closeOutline,
  checkmarkOutline,
} from 'ionicons/icons';

import './EmergencySOS.css';

interface Contact {
  id: number;
  name: string;
  phone: string;
  relation: string;
}

const EmergencySOS: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [pressing, setPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);

  const [locationShared, setLocationShared] = useState(true);

  const [currentLocation, setCurrentLocation] =
    useState('Getting location...');

  const [coords, setCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [showAddContact, setShowAddContact] = useState(false);

  const [editingContact, setEditingContact] =
    useState<Contact | null>(null);

  const [showCancelAlert, setShowCancelAlert] =
    useState(false);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Home',
      phone: '1234',
      relation: 'Family',
    },
    {
      id: 2,
      name: 'Police',
      phone: '100',
      relation: 'Emergency',
    },
    {
      id: 3,
      name: 'Ambulance',
      phone: '108',
      relation: 'Medical',
    },
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relation: '',
  });

  const progressRef = useRef<any>(null);
  const countdownRef = useRef<any>(null);

  /* =========================
     GET GPS LOCATION
  ========================= */

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          setCoords({
            lat: latitude,
            lng: longitude,
          });

          setCurrentLocation(
            `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`
          );
        },
        () => {
          setCurrentLocation(
            'Leh, Ladakh (GPS unavailable)'
          );
        }
      );
    }
  }, []);

  /* =========================
     SOS COUNTDOWN
  ========================= */

  useEffect(() => {
    if (sosActive) {
      setCountdown(5);

      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            triggerCalls();
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdownRef.current);
  }, [sosActive]);

  /* =========================
     CALL CONTACTS
  ========================= */

  const triggerCalls = () => {
    contacts.forEach((contact, i) => {
      setTimeout(() => {
        window.location.href = `tel:${contact.phone}`;
      }, i * 3000);
    });
  };

  const callNumber = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  /* =========================
     PRESS & HOLD SOS
  ========================= */

  const handlePressStart = () => {
    if (sosActive) return;

    setPressing(true);
    setPressProgress(0);

    let progress = 0;

    progressRef.current = setInterval(() => {
      progress += 2;

      setPressProgress(progress);

      if (progress >= 100) {
        clearInterval(progressRef.current);
        setPressing(false);
        setSosActive(true);
      }
    }, 60);
  };

  const handlePressEnd = () => {
    if (pressing) {
      clearInterval(progressRef.current);

      setPressing(false);
      setPressProgress(0);
    }
  };

  /* =========================
     CANCEL SOS
  ========================= */

  const cancelSOS = () => {
    clearInterval(countdownRef.current);

    setSosActive(false);
    setCountdown(5);
    setPressProgress(0);
  };

  /* =========================
     ADD / EDIT CONTACT
  ========================= */

  const addContact = () => {
    if (!newContact.name || !newContact.phone) return;

    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id
            ? { ...c, ...newContact }
            : c
        )
      );

      setEditingContact(null);
    } else {
      setContacts((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...newContact,
        },
      ]);
    }

    setNewContact({
      name: '',
      phone: '',
      relation: '',
    });

    setShowAddContact(false);
  };

  const deleteContact = (id: number) => {
    setContacts((prev) =>
      prev.filter((c) => c.id !== id)
    );
  };

  const startEdit = (contact: Contact) => {
    setEditingContact(contact);

    setNewContact({
      name: contact.name,
      phone: contact.phone,
      relation: contact.relation,
    });

    setShowAddContact(true);
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={true}>

        {/* HEADER */}

        <div className="sos-header">
          <IonIcon
            icon={arrowBackOutline}
            className="sos-back"
          />

          <span className="sos-title">
            Emergency SOS
          </span>

          <div style={{ width: 24 }} />
        </div>

        {/* SOS HERO */}

        <div
          className={`sos-hero ${
            sosActive ? 'active' : ''
          }`}
        >
          {/* RINGS */}

          <div className="sos-rings">

            <div
              className={`sos-ring ring1 ${
                pressing || sosActive
                  ? 'pulse'
                  : ''
              }`}
            />

            <div
              className={`sos-ring ring2 ${
                pressing || sosActive
                  ? 'pulse'
                  : ''
              }`}
            />

            <div
              className={`sos-ring ring3 ${
                pressing || sosActive
                  ? 'pulse'
                  : ''
              }`}
            />
          </div>

          {/* BUTTON */}

          <button
            className={`sos-btn ${
              pressing ? 'pressing' : ''
            } ${sosActive ? 'active' : ''}`}

            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}

            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
          >
            {sosActive ? (
              <div className="sos-btn-inner">
                <span className="sos-counting">
                  {countdown}
                </span>

                <span className="sos-calling-text">
                  Calling in...
                </span>
              </div>
            ) : (
              <div className="sos-btn-inner">
                <span className="sos-label">
                  SOS
                </span>

                <span className="sos-sub">
                  Hold to activate
                </span>
              </div>
            )}

            {/* PROGRESS RING */}

            {pressing && (
              <svg
                className="sos-progress-ring"
                viewBox="0 0 160 160"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="72"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="6"
                  strokeDasharray={`${
                    (pressProgress / 100) * 452
                  } 452`}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </svg>
            )}
          </button>
        </div>

        {/* STATUS */}

        <div className="sos-status-text">

          {sosActive ? (
            <div className="sos-active-status">

              <p className="sos-alert-text">
                🚨 SOS Activated! Calling emergency contacts...
              </p>

              <button
                className="sos-cancel-btn"
                onClick={() =>
                  setShowCancelAlert(true)
                }
              >
                <IonIcon icon={closeOutline} />
                Cancel SOS
              </button>
            </div>
          ) : (
            <p className="sos-hint">
              Press and hold the SOS button
              for 3 seconds to alert emergency contacts
            </p>
          )}
        </div>

        {/* LOCATION */}

        <div className="sos-section">

          <div className="sos-location-card">

            <div className="sos-location-top">

              <div className="sos-loc-icon">
                <IonIcon icon={locationOutline} />
              </div>

              <div className="sos-loc-info">
                <p className="sos-loc-title">
                  Share Live Location
                </p>

                <p className="sos-loc-sub">
                  with your family
                </p>
              </div>

              <div
                className={`sos-toggle ${
                  locationShared
                    ? 'on'
                    : 'off'
                }`}
                onClick={() =>
                  setLocationShared(
                    !locationShared
                  )
                }
              >
                <div className="sos-toggle-thumb" />
              </div>
            </div>

            {locationShared && (
              <div className="sos-coords">

                <IonIcon
                  icon={locationOutline}
                  className="sos-coords-icon"
                />

                <span>{currentLocation}</span>

                {coords && (
                  <a
                    href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="sos-map-link"
                  >
                    Open Map
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CONTACTS */}

        <div className="sos-section">

          <div className="sos-section-header">

            <div className="sos-section-left">
              <IonIcon icon={peopleOutline} />
              <span>Emergency Contacts</span>
            </div>

            <button
              className="sos-add-btn"
              onClick={() => {
                setEditingContact(null);

                setNewContact({
                  name: '',
                  phone: '',
                  relation: '',
                });

                setShowAddContact(true);
              }}
            >
              <IonIcon icon={addOutline} />
              Add
            </button>
          </div>

          {contacts.map((contact) => (
            <div
              className="sos-contact-card"
              key={contact.id}
            >
              <div className="sos-contact-avatar">
                {contact.name.charAt(0)}
              </div>

              <div className="sos-contact-info">

                <p className="sos-contact-name">
                  {contact.name}
                </p>

                <p className="sos-contact-phone">
                  {contact.phone}
                </p>

                {contact.relation && (
                  <span className="sos-contact-tag">
                    {contact.relation}
                  </span>
                )}
              </div>

              <div className="sos-contact-actions">

                <button
                  className="sos-action-btn call"
                  onClick={() =>
                    callNumber(contact.phone)
                  }
                >
                  <IonIcon icon={callOutline} />
                </button>

                <button
                  className="sos-action-btn edit"
                  onClick={() =>
                    startEdit(contact)
                  }
                >
                  <IonIcon icon={createOutline} />
                </button>

                <button
                  className="sos-action-btn delete"
                  onClick={() =>
                    deleteContact(contact.id)
                  }
                >
                  <IonIcon icon={trashOutline} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}

        {showAddContact && (
          <div
            className="sos-modal-overlay"
            onClick={() =>
              setShowAddContact(false)
            }
          >
            <div
              className="sos-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div className="sos-modal-header">

                <span>
                  {editingContact
                    ? 'Edit Contact'
                    : 'Add Contact'}
                </span>

                <IonIcon
                  icon={closeOutline}
                  onClick={() =>
                    setShowAddContact(false)
                  }
                />
              </div>

              <input
                className="sos-input"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="sos-input"
                placeholder="Phone Number"
                type="tel"
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    phone: e.target.value,
                  })
                }
              />

              <input
                className="sos-input"
                placeholder="Relation"
                value={newContact.relation}
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    relation: e.target.value,
                  })
                }
              />

              <button
                className="sos-save-btn"
                onClick={addContact}
              >
                <IonIcon icon={checkmarkOutline} />

                {editingContact
                  ? 'Save Changes'
                  : 'Add Contact'}
              </button>
            </div>
          </div>
        )}

        {/* ALERT */}

        <IonAlert
          isOpen={showCancelAlert}
          onDidDismiss={() =>
            setShowCancelAlert(false)
          }
          header="Cancel SOS?"
          message="Are you sure you want to cancel the emergency alert?"
          buttons={[
            {
              text: 'No',
              role: 'cancel',
            },
            {
              text: 'Yes, Cancel',
              handler: cancelSOS,
            },
          ]}
        />

        <div className="bottom-space" />

      </IonContent>
    </IonPage>
  );
};

export default EmergencySOS;