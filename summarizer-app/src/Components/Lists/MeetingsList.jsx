import React from "react";
import ListCard from "./ListCard";

const MeetingsList = () => {
    return (
        <ListCard
            title="Recent meetings"
            fetchUrl="http://127.0.0.1:5000/meeting"
            deleteUrl="http://127.0.0.1:5000/meeting"
            addLink="/AddMeeting"
            itemIdKey="MeetingId"
            itemNameKey="MeetingName"
            updateLinkBase="/UpdateMeeting"
        />
    );
};

export default MeetingsList;
