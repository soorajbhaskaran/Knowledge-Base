import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Typography, Button, Checkbox } from "neetoui";
import { Input } from "neetoui/formik";

import preferenceApi from "apis/preference";

import { buildPreferanceValidationSchema } from "./utils";

const General = () => {
  const [submitted, setSubmitted] = useState(false);
  const [preference, setPreference] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const fetchApplicationDetails = async () => {
    try {
      const {
        data: { preference },
      } = await preferenceApi.show();
      setPreference({
        id: preference.id,
        name: preference.name,
        password: "",
      });
      setIsPasswordVisible(preference.active);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmitButton = async (values) => {
    try {
      await preferenceApi.update({
        name: values.name,
        active: isPasswordVisible,
        password: (isPasswordVisible && values.password) || "",
      });
      fetchApplicationDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCheckboxChange = (setTouched) => {
    setIsPasswordVisible(!isPasswordVisible);
    setTouched((prevTouched) => (prevTouched.password = false));
  };

  useEffect(() => {
    fetchApplicationDetails();
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
      {({ isSubmitting, setTouched }) => (
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
                onChange={() => handleCheckboxChange(setTouched)}
              />
              {isPasswordVisible && (
                <>
                  <Input
                    className="flex-grow mr-5"
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                  />
                  <div className="flex items-center">
                    <Check color="green" size={22} />
                    <Typography component="p" style="body3">
                      Have atleast 6 characters
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <Close color="red" size={22} />
                    <Typography component="p" style="body3">
                      Include atleast one letter and one number
                    </Typography>
                  </div>
                </>
              )}
              <div className="flex">
                <Button
                  className="my-4"
                  disabled={isSubmitting}
                  label="Save Changes"
                  loading={isSubmitting}
                  size="medium"
                  style="primary"
                  type="submit"
                  onClick={() => setSubmitted(true)}
                />
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
