/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Product } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ProductUpdateForm(props) {
  const {
    id: idProp,
    product: productModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    price: "",
    category: "",
    description: "",
    weight: "",
    dimension: "",
    image: [],
    onpromo: false,
    promo: "",
    new: false,
    quantity: "",
    custom: false,
    customtext: "",
    trending: false,
    feature: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [price, setPrice] = React.useState(initialValues.price);
  const [category, setCategory] = React.useState(initialValues.category);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [weight, setWeight] = React.useState(initialValues.weight);
  const [dimension, setDimension] = React.useState(initialValues.dimension);
  const [image, setImage] = React.useState(initialValues.image);
  const [onpromo, setOnpromo] = React.useState(initialValues.onpromo);
  const [promo, setPromo] = React.useState(initialValues.promo);
  const [new1, setNew1] = React.useState(initialValues.new);
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [custom, setCustom] = React.useState(initialValues.custom);
  const [customtext, setCustomtext] = React.useState(initialValues.customtext);
  const [trending, setTrending] = React.useState(initialValues.trending);
  const [feature, setFeature] = React.useState(initialValues.feature);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = productRecord
      ? { ...initialValues, ...productRecord }
      : initialValues;
    setName(cleanValues.name);
    setPrice(cleanValues.price);
    setCategory(cleanValues.category);
    setDescription(cleanValues.description);
    setWeight(cleanValues.weight);
    setDimension(cleanValues.dimension);
    setImage(cleanValues.image ?? []);
    setCurrentImageValue("");
    setOnpromo(cleanValues.onpromo);
    setPromo(cleanValues.promo);
    setNew1(cleanValues.new);
    setQuantity(cleanValues.quantity);
    setCustom(cleanValues.custom);
    setCustomtext(cleanValues.customtext);
    setTrending(cleanValues.trending);
    setFeature(cleanValues.feature);
    setErrors({});
  };
  const [productRecord, setProductRecord] = React.useState(productModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Product, idProp)
        : productModelProp;
      setProductRecord(record);
    };
    queryData();
  }, [idProp, productModelProp]);
  React.useEffect(resetStateValues, [productRecord]);
  const [currentImageValue, setCurrentImageValue] = React.useState("");
  const imageRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    price: [{ type: "Required" }],
    category: [{ type: "Required" }],
    description: [{ type: "Required" }],
    weight: [],
    dimension: [],
    image: [],
    onpromo: [{ type: "Required" }],
    promo: [],
    new: [{ type: "Required" }],
    quantity: [{ type: "Required" }],
    custom: [{ type: "Required" }],
    customtext: [],
    trending: [{ type: "Required" }],
    feature: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          price,
          category,
          description,
          weight,
          dimension,
          image,
          onpromo,
          promo,
          new: new1,
          quantity,
          custom,
          customtext,
          trending,
          feature,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Product.copyOf(productRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProductUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price: value,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Category"
        isRequired={true}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category: value,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description: value,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Weight"
        isRequired={false}
        isReadOnly={false}
        value={weight}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight: value,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.weight ?? value;
          }
          if (errors.weight?.hasError) {
            runValidationTasks("weight", value);
          }
          setWeight(value);
        }}
        onBlur={() => runValidationTasks("weight", weight)}
        errorMessage={errors.weight?.errorMessage}
        hasError={errors.weight?.hasError}
        {...getOverrideProps(overrides, "weight")}
      ></TextField>
      <TextField
        label="Dimension"
        isRequired={false}
        isReadOnly={false}
        value={dimension}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension: value,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.dimension ?? value;
          }
          if (errors.dimension?.hasError) {
            runValidationTasks("dimension", value);
          }
          setDimension(value);
        }}
        onBlur={() => runValidationTasks("dimension", dimension)}
        errorMessage={errors.dimension?.errorMessage}
        hasError={errors.dimension?.hasError}
        {...getOverrideProps(overrides, "dimension")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image: values,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            values = result?.image ?? values;
          }
          setImage(values);
          setCurrentImageValue("");
        }}
        currentFieldValue={currentImageValue}
        label={"Image"}
        items={image}
        hasError={errors?.image?.hasError}
        errorMessage={errors?.image?.errorMessage}
        setFieldValue={setCurrentImageValue}
        inputFieldRef={imageRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Image"
          isRequired={false}
          isReadOnly={false}
          value={currentImageValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.image?.hasError) {
              runValidationTasks("image", value);
            }
            setCurrentImageValue(value);
          }}
          onBlur={() => runValidationTasks("image", currentImageValue)}
          errorMessage={errors.image?.errorMessage}
          hasError={errors.image?.hasError}
          ref={imageRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "image")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Onpromo"
        defaultChecked={false}
        isDisabled={false}
        isChecked={onpromo}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo: value,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.onpromo ?? value;
          }
          if (errors.onpromo?.hasError) {
            runValidationTasks("onpromo", value);
          }
          setOnpromo(value);
        }}
        onBlur={() => runValidationTasks("onpromo", onpromo)}
        errorMessage={errors.onpromo?.errorMessage}
        hasError={errors.onpromo?.hasError}
        {...getOverrideProps(overrides, "onpromo")}
      ></SwitchField>
      <TextField
        label="Promo"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={promo}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo: value,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.promo ?? value;
          }
          if (errors.promo?.hasError) {
            runValidationTasks("promo", value);
          }
          setPromo(value);
        }}
        onBlur={() => runValidationTasks("promo", promo)}
        errorMessage={errors.promo?.errorMessage}
        hasError={errors.promo?.hasError}
        {...getOverrideProps(overrides, "promo")}
      ></TextField>
      <SwitchField
        label="New"
        defaultChecked={false}
        isDisabled={false}
        isChecked={new1}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: value,
              quantity,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.new ?? value;
          }
          if (errors.new?.hasError) {
            runValidationTasks("new", value);
          }
          setNew1(value);
        }}
        onBlur={() => runValidationTasks("new", new1)}
        errorMessage={errors.new?.errorMessage}
        hasError={errors.new?.hasError}
        {...getOverrideProps(overrides, "new")}
      ></SwitchField>
      <TextField
        label="Quantity"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={quantity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity: value,
              custom,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.quantity ?? value;
          }
          if (errors.quantity?.hasError) {
            runValidationTasks("quantity", value);
          }
          setQuantity(value);
        }}
        onBlur={() => runValidationTasks("quantity", quantity)}
        errorMessage={errors.quantity?.errorMessage}
        hasError={errors.quantity?.hasError}
        {...getOverrideProps(overrides, "quantity")}
      ></TextField>
      <SwitchField
        label="Custom"
        defaultChecked={false}
        isDisabled={false}
        isChecked={custom}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom: value,
              customtext,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.custom ?? value;
          }
          if (errors.custom?.hasError) {
            runValidationTasks("custom", value);
          }
          setCustom(value);
        }}
        onBlur={() => runValidationTasks("custom", custom)}
        errorMessage={errors.custom?.errorMessage}
        hasError={errors.custom?.hasError}
        {...getOverrideProps(overrides, "custom")}
      ></SwitchField>
      <TextField
        label="Customtext"
        isRequired={false}
        isReadOnly={false}
        value={customtext}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext: value,
              trending,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.customtext ?? value;
          }
          if (errors.customtext?.hasError) {
            runValidationTasks("customtext", value);
          }
          setCustomtext(value);
        }}
        onBlur={() => runValidationTasks("customtext", customtext)}
        errorMessage={errors.customtext?.errorMessage}
        hasError={errors.customtext?.hasError}
        {...getOverrideProps(overrides, "customtext")}
      ></TextField>
      <SwitchField
        label="Trending"
        defaultChecked={false}
        isDisabled={false}
        isChecked={trending}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending: value,
              feature,
            };
            const result = onChange(modelFields);
            value = result?.trending ?? value;
          }
          if (errors.trending?.hasError) {
            runValidationTasks("trending", value);
          }
          setTrending(value);
        }}
        onBlur={() => runValidationTasks("trending", trending)}
        errorMessage={errors.trending?.errorMessage}
        hasError={errors.trending?.hasError}
        {...getOverrideProps(overrides, "trending")}
      ></SwitchField>
      <SwitchField
        label="Feature"
        defaultChecked={false}
        isDisabled={false}
        isChecked={feature}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              price,
              category,
              description,
              weight,
              dimension,
              image,
              onpromo,
              promo,
              new: new1,
              quantity,
              custom,
              customtext,
              trending,
              feature: value,
            };
            const result = onChange(modelFields);
            value = result?.feature ?? value;
          }
          if (errors.feature?.hasError) {
            runValidationTasks("feature", value);
          }
          setFeature(value);
        }}
        onBlur={() => runValidationTasks("feature", feature)}
        errorMessage={errors.feature?.errorMessage}
        hasError={errors.feature?.hasError}
        {...getOverrideProps(overrides, "feature")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || productModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || productModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
