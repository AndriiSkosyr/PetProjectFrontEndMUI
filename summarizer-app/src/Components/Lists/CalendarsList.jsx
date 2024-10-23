import React from "react";
import ListCard from "./ListCard";

const CalendarsList = () => {
    return (
        <ListCard
            title="Calendars"
            fetchUrl="http://127.0.0.1:5000/calendar"
            deleteUrl="http://127.0.0.1:5000/calendar"
            addLink="/AddCalendar"
            itemIdKey="CalendarId"
            itemNameKey="CalendarName"
            updateLinkBase="/UpdateCalendar"
        />
    );
};

export default CalendarsList;