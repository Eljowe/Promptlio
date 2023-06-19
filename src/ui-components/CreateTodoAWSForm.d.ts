/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CreateTodoAWSFormInputValues = {
    Field1?: string;
    Field0?: string;
};
export declare type CreateTodoAWSFormValidationValues = {
    Field1?: ValidationFunction<string>;
    Field0?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreateTodoAWSFormOverridesProps = {
    CreateTodoAWSFormGrid?: PrimitiveOverrideProps<GridProps>;
    Field1?: PrimitiveOverrideProps<TextFieldProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CreateTodoAWSFormProps = React.PropsWithChildren<{
    overrides?: CreateTodoAWSFormOverridesProps | undefined | null;
} & {
    onSubmit: (fields: CreateTodoAWSFormInputValues) => void;
    onChange?: (fields: CreateTodoAWSFormInputValues) => CreateTodoAWSFormInputValues;
    onValidate?: CreateTodoAWSFormValidationValues;
} & React.CSSProperties>;
export default function CreateTodoAWSForm(props: CreateTodoAWSFormProps): React.ReactElement;
