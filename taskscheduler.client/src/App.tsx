import {
    useCallback,
    useEffect,
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

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
    addEvent,
    getEvents,
    updateEvent
} from './requests';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Container
} from 'reactstrap';

const locales = {
    'en-US': enUS
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

import AppModal from './components/AppModal';

import AppForm from './components/AppForm';

const DnDCalendar = withDragAndDrop(Calendar);

const App = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const [isAdding, setIsAdding] = useState(false);

    const [eventToAdd, setEventToAdd] = useState<Event>({});

    const populateEvents = async () => {
        const dataToSet = await getEvents();

        setEvents(dataToSet);
    };

    useEffect(() => {
        populateEvents();
    }, []);

    const moveEvent: withDragAndDropProps['onEventDrop'] = useCallback(async (data: EventInteractionArgs<Event>) => {
        const changedEvent = events.find(event => event.resource === data.event.resource);

        if (changedEvent) {
            changedEvent.start = data.start as Date;

            changedEvent.end = data.end as Date;

            await updateEvent(changedEvent);

            await populateEvents();
        }
    }, [events]);

    return (
        <Container fluid>
            <DnDCalendar
                defaultView='week'
                events={events}
                localizer={localizer}
                onEventDrop={moveEvent}
                onEventResize={moveEvent}
                onSelectSlot={e => {
                    setEventToAdd({
                        title: '',
                        start: e.start,
                        end: e.end
                    });

                    setIsAdding(true);
                }}
                resizable
                style={{ height: '100vh' }}
                selectable
            />

            <AppModal
                header='Add Event'
                isOpen={isAdding}
                setIsOpen={setIsAdding}
            >
                <AppForm
                    inputs={[
                        {
                            key: 'title',
                            label: 'Title'
                        },
                        {
                            key: 'start',
                            label: 'Start',
                            type: 'datetime-local'
                        },
                        {
                            key: 'end',
                            label: 'End',
                            type: 'datetime-local'
                        }
                    ]}
                    data={eventToAdd}
                    setData={setEventToAdd}
                    buttonLabel='Add'
                    onSubmit={async () => {
                        await addEvent(eventToAdd);

                        await populateEvents();

                        setIsAdding(false);
                    }}
                />
            </AppModal>
        </Container>
    );
}

export default App;