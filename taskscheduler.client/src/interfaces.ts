import { InputType } from "reactstrap/types/lib/Input";

export interface FormInputs<T> {
    key: keyof T;
    label: string;
    type?: InputType;
}