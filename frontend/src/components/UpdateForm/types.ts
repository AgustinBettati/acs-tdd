import {match} from "react-router";

export interface IProps {
    match: match<any>;
};

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
    fields: IFields;
    errors: IErrors;
    showPassword: boolean;
    isNew: boolean;
    isEditing: boolean;
    isCreating: boolean;
    course?: ICourse;
    redirect?: string;
    isDeleteModalOpen: boolean;
}

export interface IStateHome{
    courses: ICourse[];
}

export interface IFields {
    name: string;
    description: string;
    platform: string;
    link: string;
    id: string;
}

export type IErrors = {
    [p in keyof IFields]?: boolean
};
