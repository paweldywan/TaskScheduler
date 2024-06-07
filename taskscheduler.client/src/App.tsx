import {
    FC,
    useState
} from 'react';

import {
    Calendar,
    dateFnsLocalizer,
    Event
} from 'react-big-calendar';

import withDragAndDrop, {
    EventInteractionArgs,
    withDragAndDropProps
} from 'react-big-calendar/lib/addons/dragAndDrop';

import format from 'date-fns/format';

import parse from 'date-fns/parse';

import startOfWeek from 'date-fns/startOfWeek';

import getDay from 'date-fns/getDay';

import enUS from 'date-fns/locale/en-US';

import {
    addHours,
    startOfHour
} from 'date-fns';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': enUS
};

const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);

const now = new Date();

const start = endOfHour(now);

const end = addHours(start, 2);

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

const DnDCalendar = withDragAndDrop(Calendar);

const App: FC = () => {
    const [events, setEvents] = useState<Event[]>([
        {
            title: 'Learn cool stuff',
            resource: 1,
            start,
            end
        }
    ]);

    const moveEvent: withDragAndDropProps['onEventDrop'] = (data: EventInteractionArgs<Event>): void =>
        setEvents(currentEvents => {
            const changedEvent = currentEvents.find(currentEvent => currentEvent.resource === data.event.resource);

            if (changedEvent) {
                changedEvent.start = data.start as Date;
                changedEvent.end = data.end as Date;
            }

            return [...currentEvents];
        });

    return (
        <DnDCalendar
            defaultView='week'
            events={events}
            localizer={localizer}
            onEventDrop={moveEvent}
            onEventResize={moveEvent}
            resizable
            style={{ height: '100vh' }}
        />
    );
}

export default App;