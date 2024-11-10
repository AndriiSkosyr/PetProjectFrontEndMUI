import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
/* global google */

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

function GoogleCalendar() {
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [events, setEvents] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Load the API client and auth2 library
    const script1 = document.createElement('script');
    script1.src = "https://apis.google.com/js/api.js";
    script1.async = true;
    script1.defer = true;
    script1.onload = () => gapi.load('client', initializeGapiClient);
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://accounts.google.com/gsi/client";
    script2.async = true;
    script2.defer = true;
    script2.onload = gisLoaded;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const initializeGapiClient = async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiInited(true);
  };

  const gisLoaded = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // Will be set later
    });
    setTokenClient(client);
    setGisInited(true);
  };

  const handleAuthClick = async () => {
    if (tokenClient) {
      tokenClient.callback = async (resp) => {
        if (resp.error) {
          console.error(resp.error);
          return;
        }
        setIsAuthorized(true);
        await listUpcomingEvents();
      };

      if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        tokenClient.requestAccessToken({ prompt: '' });
      }
    }
  };

  const handleSignoutClick = () => {
    if (gapi.client.getToken() !== null) {
      google.accounts.oauth2.revoke(gapi.client.getToken().access_token);
      gapi.client.setToken('');
      setEvents([]);
      setIsAuthorized(false);
    }
  };

  const listUpcomingEvents = async () => {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      });

      setEvents(response.result.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Google Calendar API Quickstart</h1>
      {!isAuthorized ? (
        <button onClick={handleAuthClick} disabled={!gapiInited || !gisInited}>
          Authorize
        </button>
      ) : (
        <button onClick={handleSignoutClick}>Sign Out</button>
      )}
      <pre>
        {events.length > 0
          ? events.map((event, index) => (
              <div key={index}>
                {event.summary} ({event.start.dateTime || event.start.date})
              </div>
            ))
          : 'No events found.'}
      </pre>
    </div>
  );
}

export default GoogleCalendar;
