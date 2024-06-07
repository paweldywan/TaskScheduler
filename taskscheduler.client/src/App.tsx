import {
    useCallback,
    useEffect,
    useState
} from 'react';

import {
    Calendar,
    dateFnsLocalizer,
    Event,
    SlotInfo
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

    const [isEditing, setIsEditing] = useState(false);

    const [eventToAddOrEdit, setEventToAddOrEdit] = useState<Event>({});

    const populateEvents = useCallback(async () => {
        const dataToSet = await getEvents();

        setEvents(dataToSet);
    }, []);

    const moveEvent: withDragAndDropProps['onEventDrop'] = useCallback(async (data: EventInteractionArgs<Event>) => {
        const changedEvent = events.find(event => event.resource === data.event.resource);

        if (changedEvent) {
            changedEvent.start = data.start as Date;

            changedEvent.end = data.end as Date;

            await updateEvent(changedEvent);

            await populateEvents();
        }
    }, [events, populateEvents]);

    const prepareAddEvent = useCallback((e: SlotInfo) => {
        setEventToAddOrEdit({
            title: '',
            start: e.start,
            end: e.end
        });

        setIsAdding(true);
    }, []);

    const executeAddEvent = useCallback(async () => {
        await addEvent(eventToAddOrEdit);

        await populateEvents();

        setIsAdding(false);
    }, [eventToAddOrEdit, populateEvents]);

    const prepareEditEvent = useCallback((event: Event) => {
        setEventToAddOrEdit(event);

        setIsEditing(true);
    }, []);

    const executeEditEvent = useCallback(async () => {
        await updateEvent(eventToAddOrEdit);

        await populateEvents();

        setIsEditing(false);
    }, [eventToAddOrEdit, populateEvents]);

    useEffect(() => {
        populateEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <DnDCalendar
                defaultView='week'
                events={events}
                localizer={localizer}
                onEventDrop={moveEvent}
                onEventResize={moveEvent}
                onSelectSlot={prepareAddEvent}
                onSelectEvent={prepareEditEvent}
                resizable
                selectable
                style={{ height: '100vh' }}
            />

            <AppModal
                header={isAdding ? 'Add Event' : 'Edit Event'} 
                isOpen={isAdding || isEditing}
                setIsOpen={isAdding ? setIsAdding : setIsEditing}
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
                    data={eventToAddOrEdit}
                    setData={setEventToAddOrEdit}
                    buttonLabel={isAdding ? 'Add' : 'Edit'}
                    onSubmit={isAdding ? executeAddEvent : executeEditEvent}
                />
            </AppModal>
        </Container>
    );
}

export default App;