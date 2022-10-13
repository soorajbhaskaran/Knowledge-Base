import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Typography, Button, Checkbox } from "neetoui";
import { Input } from "neetoui/formik";

import {
  KNOWLEDGE_BASE_INITIAL_FORM_VALUES,
  KNOWLEDGE_BASE_VALIDATION_SCHEMA,
} from "./constants";

const General = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="mx-auto mt-5 w-full">
      <div className="mx-64">
        <Typography component="h3" style="h3">
          General Settings
        </Typography>
        <Typography className="text-gray-600" component="p" style="body1">
          Configure general attributes of scribble
        </Typography>
        <Formik
          initialValues={KNOWLEDGE_BASE_INITIAL_FORM_VALUES}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          validationSchema={KNOWLEDGE_BASE_VALIDATION_SCHEMA}
        >
          {({ isSubmitting }) => (
            <div className="">
              <Typography className="mb-6" style="h2" />
              <Form className="w-full">
                <Input
                  className="flex-grow mr-5"
                  label="Site Name"
                  name="site"
                  placeholder="Enter Site Name"
                />
                <Typography
                  className="text-gray-600"
                  component="p"
                  style="body3"
                >
                  Customize the site name which is used to show the site name in{" "}
                  <br />
                  <strong>Open graphs Tags</strong>
                </Typography>
                <hr className="my-4 h-2" />
                <Checkbox
                  className="mb-4"
                  id="password"
                  label="Password Protect Knowledge Base"
                  onChange={() => setIsPasswordVisible(!isPasswordVisible)}
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
                    className="ml-2"
                    label="Cancel"
                    size="large"
                    style="text"
                    type="reset"
                    // onClick={onClose}
                  />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

General.propTypes = {};

export default General;
