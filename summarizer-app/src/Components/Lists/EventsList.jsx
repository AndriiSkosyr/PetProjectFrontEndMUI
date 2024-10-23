import React from "react";
import ListCard from "./ListCard";

const EventsList = () => {
    return (
        <ListCard
            title="Recent events"
            fetchUrl="http://127.0.0.1:5000/event"
            deleteUrl="http://127.0.0.1:5000/event"
            addLink="/AddEvent"
            itemIdKey="EventId"
            itemNameKey="EventName"
            updateLinkBase="/UpdateEvent"
        />
    );
};

export default EventsList;
