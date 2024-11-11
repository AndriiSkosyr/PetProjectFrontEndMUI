import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Box, Paper, Container } from '@mui/material';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const localizer = momentLocalizer(moment);

function GoogleCalendar() {
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [events, setEvents] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
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

    // Load token from localStorage if available
    const storedToken = localStorage.getItem('gapi_token');
    if (storedToken && gapi.client) {
      gapi.client.setToken({ access_token: storedToken });
      setIsAuthorized(true);
      listUpcomingEvents();
    }

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
    if (window.google) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // Will be set later
      });
      setTokenClient(client);
      setGisInited(true);
    } else {
      console.error("Google client library not loaded.");
    }
  };

  const handleAuthClick = async () => {
    if (tokenClient) {
      tokenClient.callback = async (resp) => {
        if (resp.error) {
          console.error(resp.error);
          return;
        }
        setIsAuthorized(true);
        localStorage.setItem('gapi_token', resp.access_token); // Store token
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
    const token = gapi.client ? gapi.client.getToken() : null;
    if (token && window.google) {
      window.google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken(''); // Only call this if gapi.client is available
      localStorage.removeItem('gapi_token'); // Remove token from localStorage
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

      const formattedEvents = response.result.items.map(event => ({
        title: event.summary,
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 0.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper elevation={0} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>

        {!isAuthorized ? (
          <Button 
            variant="contained" 
            onClick={handleAuthClick} 
            disabled={!gapiInited || !gisInited} 
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Authorize Google Calendar
          </Button>
        ) : (
          <Button 
            variant="outlined" 
            onClick={handleSignoutClick} 
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign Out
          </Button>
        )}
      </Paper>
    </Container>
  );
}

export default GoogleCalendar;
