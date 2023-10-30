/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Subscribe } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SubscribeUpdateFormInputValues = {
    email?: string;
};
export declare type SubscribeUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscribeUpdateFormOverridesProps = {
    SubscribeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubscribeUpdateFormProps = React.PropsWithChildren<{
    overrides?: SubscribeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    subscribe?: Subscribe;
    onSubmit?: (fields: SubscribeUpdateFormInputValues) => SubscribeUpdateFormInputValues;
    onSuccess?: (fields: SubscribeUpdateFormInputValues) => void;
    onError?: (fields: SubscribeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscribeUpdateFormInputValues) => SubscribeUpdateFormInputValues;
    onValidate?: SubscribeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SubscribeUpdateForm(props: SubscribeUpdateFormProps): React.ReactElement;
