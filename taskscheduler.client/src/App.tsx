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
    getEvents
} from './requests';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
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

const DnDCalendar = withDragAndDrop(Calendar);

const App = () => {
    const [data, setData] = useState<Event[]>([]);

    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const populateData = async () => {
            const dataToSet = await getEvents();

            setData(dataToSet);
        };

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
        <>
            <Modal
                isOpen={isAdding}
                toggle={() => setIsAdding(prevState => !prevState)}
            >
                <ModalHeader>
                    Add Event
                </ModalHeader>

                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='title'>
                                Title
                            </Label>

                            <Input
                                type='text'
                                name='title'
                                id='title'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='start'>
                                Start
                            </Label>

                            <Input
                                type='datetime-local'
                                name='start'
                                id='start'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='end'>
                                End
                            </Label>

                            <Input
                                type='datetime-local'
                                name='end'
                                id='end'
                            />
                        </FormGroup>

                        <Button
                            color='primary'
                            onClick={() => setIsAdding(prevState => !prevState)}
                        >
                            Add
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>

            <DnDCalendar
                defaultView='week'
                events={data}
                localizer={localizer}
                onEventDrop={moveEvent}
                onEventResize={moveEvent}
                onSelectSlot={() => setIsAdding(true)}
                resizable
                style={{ height: '100vh' }}
            />
        </>
    );
}

export default App;