import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";

import {
    FormButton,
    FormInput
} from "../interfaces";

import moment from "moment";

interface Props<T> {
    inputs: FormInput<T>[];
    data: T;
    setData: (data: T) => void;
    buttonLabel: string;
    onSubmit?: () => void;
    additionalButtons?: FormButton[];
}

const AppForm = <T,>({
    inputs,
    data,
    setData,
    buttonLabel,
    onSubmit,
    additionalButtons
}: Props<T>) => {
    return (
        <Form
            onSubmit={e => {
                e.preventDefault();

                onSubmit?.();
            }}
        >
            {inputs.map(input => (
                <FormGroup
                    key={input.key.toString()}
                    check={input.type === 'checkbox'}
                >
                    <Label
                        for={input.key.toString()}
                        check={input.type === 'checkbox'}
                    >
                        {input.label}
                    </Label>

                    <Input
                        type={input.type}
                        name={input.key.toString()}
                        id={input.key.toString()}
                        value={input.type === 'checkbox' ? undefined : data[input.key] instanceof Date ? moment(data[input.key] as Date).format('YYYY-MM-DDTHH:mm') : data[input.key] as string}
                        checked={input.type === 'checkbox' ? data[input.key] as boolean : undefined}
                        onChange={e => setData({
                            ...data,
                            [input.key]: data[input.key] instanceof Date ? new Date(e.target.value) : input.type === 'checkbox' ? e.target.checked : e.target.value
                        })}
                    />
                </FormGroup>
            ))}

            <Container className="mt-3">
                <Row xs="auto" className="gap-3">
                    <Button
                        color='primary'
                    >
                        {buttonLabel}
                    </Button>

                    {additionalButtons?.map(button => (
                        <Button
                            key={button.label}
                            color={button.color}
                            onClick={button.onClick}
                        >
                            {button.label}
                        </Button>
                    ))}
                </Row>
            </Container>
        </Form>
    );
};

export default AppForm;