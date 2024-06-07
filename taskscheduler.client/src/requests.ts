import {
    Event
} from 'react-big-calendar';

import moment from 'moment';

export const getEvents = async (): Promise<Event[]> => {
    const response = await fetch('/api/event');

    const json = await response.json();

    return json.map((event: Event) => ({
        ...event,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate()
    }));
};

export const addEvent = async (event: Event) =>
    fetch('/api/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });

export const updateEvent = async (event: Event) =>
    fetch('/api/event', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });

export const deleteEvent = async (event: Event) =>
    fetch(`/api/event/${event.resource}`, {
        method: 'DELETE'
    });