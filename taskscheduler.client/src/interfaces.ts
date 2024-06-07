import {
    InputType
} from "reactstrap/types/lib/Input";

export interface FormInputs<T> {
    key: keyof T;
    label: string;
    type?: InputType;
}

export interface FormButton {
    label: string;
    onClick: () => void;
    color?: string;
}

export interface ModalSettings {
    header: string;
    buttonLabel: string;
    isOpen: boolean;
    isAdding: boolean;
}