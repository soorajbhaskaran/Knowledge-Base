import React from "react";

import { Formik, Form } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";

import PasswordImage from "images/Password";

const PasswordScreen = () => (
  <div className="m-auto mt-16 w-64">
    <img
      alt="Password"
      className="block w-48 text-center"
      src={PasswordImage}
    />
    <Typography className="mt-2 w-64" component="h3" style="h3">
      Spinkart is password protected!
    </Typography>
    <Typography className="mt-2 text-gray-500" component="p" style="body2">
      Enter the password to gain access to Spinkart
    </Typography>
    <Formik initialValues={{ password: "" }}>
      {(isSubmitting) => (
        <Form className="mt-6">
          <Input
            required
            className="mb-2"
            label="Password"
            name="password"
            placeholder="Enter password"
          />
          <Button
            disabled={!isSubmitting}
            label="Continue"
            loading={!isSubmitting}
            type="submit"
            onClick={() => {}}
          />
        </Form>
      )}
    </Formik>
  </div>
);

PasswordScreen.propTypes = {};

export default PasswordScreen;
