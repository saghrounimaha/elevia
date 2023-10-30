/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProductCreateFormInputValues = {
    name?: string;
    price?: number;
    category?: string;
    description?: string;
    weight?: string;
    dimension?: string;
    image?: string[];
    onpromo?: boolean;
    promo?: number;
    new?: boolean;
    quantity?: number;
    custom?: boolean;
    customtext?: string;
    trending?: boolean;
    feature?: boolean;
};
export declare type ProductCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    category?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    weight?: ValidationFunction<string>;
    dimension?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    onpromo?: ValidationFunction<boolean>;
    promo?: ValidationFunction<number>;
    new?: ValidationFunction<boolean>;
    quantity?: ValidationFunction<number>;
    custom?: ValidationFunction<boolean>;
    customtext?: ValidationFunction<string>;
    trending?: ValidationFunction<boolean>;
    feature?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductCreateFormOverridesProps = {
    ProductCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    weight?: PrimitiveOverrideProps<TextFieldProps>;
    dimension?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    onpromo?: PrimitiveOverrideProps<SwitchFieldProps>;
    promo?: PrimitiveOverrideProps<TextFieldProps>;
    new?: PrimitiveOverrideProps<SwitchFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    custom?: PrimitiveOverrideProps<SwitchFieldProps>;
    customtext?: PrimitiveOverrideProps<TextFieldProps>;
    trending?: PrimitiveOverrideProps<SwitchFieldProps>;
    feature?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ProductCreateFormProps = React.PropsWithChildren<{
    overrides?: ProductCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProductCreateFormInputValues) => ProductCreateFormInputValues;
    onSuccess?: (fields: ProductCreateFormInputValues) => void;
    onError?: (fields: ProductCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductCreateFormInputValues) => ProductCreateFormInputValues;
    onValidate?: ProductCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProductCreateForm(props: ProductCreateFormProps): React.ReactElement;
