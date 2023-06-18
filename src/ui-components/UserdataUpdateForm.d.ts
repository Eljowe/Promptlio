/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Userdata } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserdataUpdateFormInputValues = {
    test_text?: string;
};
export declare type UserdataUpdateFormValidationValues = {
    test_text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserdataUpdateFormOverridesProps = {
    UserdataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    test_text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserdataUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserdataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userdata?: Userdata;
    onSubmit?: (fields: UserdataUpdateFormInputValues) => UserdataUpdateFormInputValues;
    onSuccess?: (fields: UserdataUpdateFormInputValues) => void;
    onError?: (fields: UserdataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserdataUpdateFormInputValues) => UserdataUpdateFormInputValues;
    onValidate?: UserdataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserdataUpdateForm(props: UserdataUpdateFormProps): React.ReactElement;
