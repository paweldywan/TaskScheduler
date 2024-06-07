import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

import {
    FormInputs
} from "../interfaces";

import moment from "moment";

interface Props<T> {
    inputs: FormInputs<T>[];
    data: T;
    setData: (data: T) => void;
    buttonLabel: string;
    onSubmit: () => void;
}

const AppForm = <T,>({
    inputs,
    data,
    setData,
    buttonLabel,
    onSubmit
}: Props<T>) => {
    return (
        <Form
            onSubmit={e => {
                e.preventDefault();

                onSubmit();
            }}
        >
            {inputs.map(input => (
                <FormGroup key={input.key.toString()}>
                    <Label for={input.key.toString()}>
                        {input.label}
                    </Label>

                    <Input
                        type={input.type}
                        name={input.key.toString()}
                        id={input.key.toString()}
                        value={data[input.key] instanceof Date ? moment(data[input.key] as Date).format('YYYY-MM-DDTHH:mm') : data[input.key] as string}
                        onChange={e => setData({
                            ...data,
                            [input.key]: data[input.key] instanceof Date ? new Date(e.target.value) : e.target.value
                        })}
                    />
                </FormGroup>
            ))}

            <Button
                color='primary'
            >
                {buttonLabel}
            </Button>
        </Form>
    );
};

export default AppForm;