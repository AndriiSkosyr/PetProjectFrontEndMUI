import React from 'react';

const GoogleCalendar = () => {
    return (
        <div style={{ 
            width: '100%', 
            height: '100%', 
            padding: '2rem', 
            boxSizing: 'border-box', 
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch' 
        }}>
            <iframe
                src="https://calendar.google.com/calendar/embed?src=akaciand29%40gmail.com&ctz=Europe%2FAthens&hl=en"
                style={{ 
                    border: 0, 
                    width: '100%', 
                    height: '100%' 
                }}                
                title="Google Calendar"
            ></iframe>
        </div>
    );
};

export default GoogleCalendar;
