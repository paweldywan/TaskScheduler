import {
    useCallback,
    useEffect,
    useMemo,
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
    deleteEvent,
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

import {
    FormButton,
    FormInput,
    ModalSettings
} from './interfaces';

const DnDCalendar = withDragAndDrop(Calendar);

const App = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const [eventToAddOrEdit, setEventToAddOrEdit] = useState<Event>({});

    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        header: '',
        buttonLabel: '',
        isOpen: false,
        isAdding: false
    });

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

    const setModalIsOpen = useCallback((isOpen: boolean) => {
        setModalSettings(prevState => ({
            ...prevState,
            isOpen
        }));
    }, []);

    const hideModal = useCallback(() => {
        setModalIsOpen(false);
    }, [setModalIsOpen]);

    const prepareAddEvent = useCallback((e: SlotInfo) => {
        setEventToAddOrEdit({
            title: '',
            start: e.start,
            end: e.end
        });

        setModalSettings({
            header: 'Add Event',
            buttonLabel: 'Add',
            isOpen: true,
            isAdding: true
        });
    }, []);

    const executeAddEvent = useCallback(async () => {
        await addEvent(eventToAddOrEdit);

        await populateEvents();

        hideModal();
    }, [eventToAddOrEdit, populateEvents, hideModal]);

    const prepareEditEvent = useCallback((event: Event) => {
        setEventToAddOrEdit(event);

        setModalSettings({
            header: 'Edit Event',
            buttonLabel: 'Edit',
            isOpen: true,
            isAdding: false
        });
    }, []);

    const executeEditEvent = useCallback(async () => {
        await updateEvent(eventToAddOrEdit);

        await populateEvents();

        hideModal();
    }, [eventToAddOrEdit, populateEvents, hideModal]);

    const executeDeleteEvent = useCallback(async () => {
        await deleteEvent(eventToAddOrEdit);

        await populateEvents();

        hideModal();
    }, [eventToAddOrEdit, populateEvents, hideModal]);

    useEffect(() => {
        populateEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const inputs: FormInput<Event>[] = useMemo(() => [
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
    ], []);

    const additionalButtons: FormButton[] | undefined = useMemo(() => modalSettings.isAdding ? undefined : [
        {
            label: 'Delete',
            onClick: executeDeleteEvent,
            color: 'danger'
        }
    ], [modalSettings.isAdding, executeDeleteEvent]);

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
                header={modalSettings.header}
                isOpen={modalSettings.isOpen}
                setIsOpen={setModalIsOpen}
            >
                <AppForm
                    inputs={inputs}
                    data={eventToAddOrEdit}
                    setData={setEventToAddOrEdit}
                    buttonLabel={modalSettings.buttonLabel}
                    onSubmit={modalSettings.isAdding ? executeAddEvent : executeEditEvent}
                    additionalButtons={additionalButtons}
                />
            </AppModal>
        </Container>
    );
}

export default App;