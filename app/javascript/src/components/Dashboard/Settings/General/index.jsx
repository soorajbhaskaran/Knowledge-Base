import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Typography, Button, Checkbox } from "neetoui";
import { Input } from "neetoui/formik";

import preferenceApi from "apis/preference";
import TooltipWrapper from "components/Common/TooltipWrapper";
import { setToLocalStorage } from "utils/storage";

import Password from "./Password";

import { buildPreferanceValidationSchema } from "../utils";

const General = () => {
  const [submitted, setSubmitted] = useState(false);
  const [preference, setPreference] = useState({});

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const fetchPreference = async () => {
    try {
      const {
        data: { preference },
      } = await preferenceApi.show();
      setPreference({
        id: preference.id,
        name: preference.name,
        password: "",
      });
      setIsPasswordVisible(preference.is_password_protection_enabled);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmitButton = async (values) => {
    try {
      await preferenceApi.update({
        preference: {
          name: values.name,
          is_password_protection_enabled: isPasswordVisible,
          password: (isPasswordVisible && values.password) || "",
        },
      });
      setToLocalStorage({
        authToken: null,
      });
      fetchPreference();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCheckboxChange = (setTouched, setFieldValue) => {
    setIsPasswordVisible(!isPasswordVisible);
    setTouched((prevTouched) => (prevTouched.password = false));
    setFieldValue("active", isPasswordVisible);
  };

  useEffect(() => {
    fetchPreference();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={preference}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={buildPreferanceValidationSchema({ isPasswordVisible })}
      onSubmit={handleSubmitButton}
    >
      {({ isSubmitting, setTouched, values, setFieldValue }) => (
        <div className="mx-auto mt-5 w-full">
          <div className="mx-64">
            <Typography component="h3" style="h3">
              General Settings
            </Typography>
            <Typography className="text-gray-600" component="p" style="body1">
              Configure general attributes of scribble
            </Typography>
            <Form className="mt-4 w-full">
              <Input
                className="flex-grow mr-5"
                label="Site Name"
                name="name"
                placeholder="Enter Site Name"
              />
              <Typography className="text-gray-600" component="p" style="body3">
                Customize the site name which is used to show the site name in{" "}
                <br />
                <strong>Open graphs Tags</strong>
              </Typography>
              <hr className="my-4 h-2" />
              <Checkbox
                checked={isPasswordVisible}
                className="mb-4"
                id="password"
                label="Password Protect Knowledge Base"
                name="active"
                onChange={() => handleCheckboxChange(setTouched, setFieldValue)}
              />
              {isPasswordVisible && <Password setFieldValue={setFieldValue} />}
              <div className="flex">
                <TooltipWrapper
                  content="Button is disabled because settings are not changed"
                  disabled={preference === values}
                  position="bottom"
                >
                  <Button
                    className="my-4"
                    disabled={isSubmitting || preference === values}
                    label="Save Changes"
                    loading={isSubmitting}
                    size="medium"
                    style="primary"
                    type="submit"
                    onClick={() => setSubmitted(true)}
                  />
                </TooltipWrapper>
                <Button
                  className="ml-4"
                  label="Cancel"
                  size="small"
                  style="text"
                  type="reset"
                  onClick={() => setIsPasswordVisible(false)}
                />
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

General.propTypes = {};

export default General;
