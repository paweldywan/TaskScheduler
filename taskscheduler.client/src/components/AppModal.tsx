import {
    Modal,
    ModalBody,
    ModalHeader
} from "reactstrap";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    header?: string;
    children?: React.ReactNode;
}

const AppModal = ({
    isOpen,
    setIsOpen,
    header,
    children
}: Props) => {
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
        >
            {header &&
                <ModalHeader
                    toggle={toggle}
                >
                    {header}
                </ModalHeader>}

            {children &&
                <ModalBody>
                    {children}
                </ModalBody>}
        </Modal>
    );
};

export default AppModal;