import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";

import preferenceApi from "apis/preference";
import PasswordImage from "images/Password";

import { PASSWORD_SCREEN_VALIDATION_SCHEMA } from "./constants";

const PasswordScreen = ({ preference, setPreference }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitButton = async (values) => {
    try {
      await preferenceApi.create(values);
      setPreference((prevPreference) => (prevPreference.active = false));
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ password: "" }}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={PASSWORD_SCREEN_VALIDATION_SCHEMA}
      onSubmit={handleSubmitButton}
    >
      {({ isSubmitting }) => (
        <div className="m-auto mt-16 w-64">
          <img
            alt="Password"
            className="block w-48 text-center"
            src={PasswordImage}
          />
          <Typography className="mt-2 w-64" component="h3" style="h3">
            {preference.name} is password protected!
          </Typography>
          <Typography
            className="mt-2 text-gray-500"
            component="p"
            style="body2"
          >
            Enter the password to gain access to {preference.name}
          </Typography>
          <Form className="mt-6">
            <Input
              required
              className="mb-2"
              label="Password"
              name="password"
              placeholder="Enter password"
              type="password"
            />
            <Button
              disabled={isSubmitting}
              label="Continue"
              loading={isSubmitting}
              type="submit"
              onClick={() => setSubmitted(true)}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

PasswordScreen.propTypes = {};

export default PasswordScreen;
