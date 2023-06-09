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
export declare type UserdataCreateFormInputValues = {
    test_text?: string;
};
export declare type UserdataCreateFormValidationValues = {
    test_text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserdataCreateFormOverridesProps = {
    UserdataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    test_text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserdataCreateFormProps = React.PropsWithChildren<{
    overrides?: UserdataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserdataCreateFormInputValues) => UserdataCreateFormInputValues;
    onSuccess?: (fields: UserdataCreateFormInputValues) => void;
    onError?: (fields: UserdataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserdataCreateFormInputValues) => UserdataCreateFormInputValues;
    onValidate?: UserdataCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserdataCreateForm(props: UserdataCreateFormProps): React.ReactElement;
