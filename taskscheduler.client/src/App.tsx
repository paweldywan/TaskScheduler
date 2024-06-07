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
    getEvents
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
    const [data, setData] = useState<Event[]>([]);

    const [isAdding, setIsAdding] = useState(false);

    const [eventToAdd, setEventToAdd] = useState<Event>({});

    const populateData = async () => {
        const dataToSet = await getEvents();

        setData(dataToSet);
    };

    useEffect(() => {
        populateData();
    }, []);

    const moveEvent: withDragAndDropProps['onEventDrop'] = useCallback((data: EventInteractionArgs<Event>): void =>
        setData(currentEvents => {
            const changedEvent = currentEvents.find(currentEvent => currentEvent.resource === data.event.resource);

            if (changedEvent) {
                changedEvent.start = data.start as Date;

                changedEvent.end = data.end as Date;
            }

            return [...currentEvents];
        }), []);

    return (
        <Container fluid>
            <DnDCalendar
                defaultView='week'
                events={data}
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

                        await populateData();

                        setIsAdding(false);
                    }}
                />
            </AppModal>
        </Container>
    );
}

export default App;