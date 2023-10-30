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
export declare type SubscribeCreateFormInputValues = {
    email?: string;
};
export declare type SubscribeCreateFormValidationValues = {
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscribeCreateFormOverridesProps = {
    SubscribeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubscribeCreateFormProps = React.PropsWithChildren<{
    overrides?: SubscribeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SubscribeCreateFormInputValues) => SubscribeCreateFormInputValues;
    onSuccess?: (fields: SubscribeCreateFormInputValues) => void;
    onError?: (fields: SubscribeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscribeCreateFormInputValues) => SubscribeCreateFormInputValues;
    onValidate?: SubscribeCreateFormValidationValues;
} & React.CSSProperties>;
export default function SubscribeCreateForm(props: SubscribeCreateFormProps): React.ReactElement;
