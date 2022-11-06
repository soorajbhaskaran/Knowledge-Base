import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Typography, Button, PageLoader } from "neetoui";
import { Input } from "neetoui/formik";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import preferenceApi from "apis/preference";
import PasswordImage from "images/Password";
import { setToLocalStorage } from "utils/storage";

import { PASSWORD_SCREEN_VALIDATION_SCHEMA } from "./constants";

const PasswordScreen = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmitButton = async (values) => {
    try {
      setLoading(true);
      const response = await authApi.login(values);
      setToLocalStorage({
        authToken: response.data.authentication_token,
      });
      setAuthHeaders();

      window.location.href = "/articles";
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPreferenceData = async () => {
    try {
      const {
        data: {
          preference: { name },
        },
      } = await preferenceApi.show();
      setName(name);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    getPreferenceData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

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
            {name} is password protected!
          </Typography>
          <Typography
            className="mt-2 text-gray-500"
            component="p"
            style="body2"
          >
            Enter the password to gain access to {name}
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
