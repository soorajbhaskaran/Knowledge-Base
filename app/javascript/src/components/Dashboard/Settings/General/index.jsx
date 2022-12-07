import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Typography, Button, Checkbox } from "neetoui";
import { Input } from "neetoui/formik";
import { assoc, modify, F } from "ramda";

import organizationApi from "apis/organization";
import TooltipWrapper from "components/Common/TooltipWrapper";
import { setToLocalStorage } from "utils/storage";

import Password from "./Password";

import { buildPreferanceValidationSchema } from "../utils";

const General = () => {
  const [submitted, setSubmitted] = useState(false);
  const [organization, setOrganization] = useState({});

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const fetchOrganization = async () => {
    try {
      const {
        data: { organization },
      } = await organizationApi.show();
      setOrganization(assoc("password", "", organization));
      setIsPasswordVisible(organization.is_password_protection_enabled);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmitButton = async (values) => {
    try {
      await organizationApi.update({
        organization: {
          name: values.name,
          is_password_protection_enabled: isPasswordVisible,
          password: (isPasswordVisible && values.password) || "",
        },
      });
      setToLocalStorage({
        authToken: null,
      });
      fetchOrganization();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCheckboxChange = (setTouched, setFieldValue) => {
    setIsPasswordVisible(!isPasswordVisible);
    setTouched(modify("password", F));
    setFieldValue("active", isPasswordVisible);
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={organization}
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
                  disabled={organization === values}
                  position="bottom"
                >
                  <Button
                    className="my-4"
                    disabled={isSubmitting || organization === values}
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

export default General;
