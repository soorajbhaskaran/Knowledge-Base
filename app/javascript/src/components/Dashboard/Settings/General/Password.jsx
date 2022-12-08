import React, { useState, useRef, useEffect } from "react";

import { Check, Close } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";

import { ALPHANUMERIC_REGEX } from "../constants";

const Password = ({ setFieldValue }) => {
  const [password, setPassword] = useState("123456d");
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const ref = useRef(null);

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setFieldValue("password", e.target.value);
  };

  const handlePasswordVisibility = () => {
    ref.current.focus();
    setIsPasswordDisabled(false);
  };

  useEffect(() => {
    ref.current.focus();
  }, [isPasswordDisabled]);

  return (
    <>
      <div className="flex">
        <Input
          className="flex-grow mr-5"
          disabled={isPasswordDisabled}
          label="Password"
          name="password"
          placeholder="Enter Password"
          ref={ref}
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          className="mt-5 h-8"
          label="Change Password"
          style="secondary"
          onClick={handlePasswordVisibility}
        />
      </div>
      <div className="mt-2 flex items-center">
        {password.length >= 6 ? (
          <Check color="green" size={22} />
        ) : (
          <Close color="red" size={22} />
        )}
        <Typography component="p" style="body3">
          Have atleast 6 characters
        </Typography>
      </div>
      <div className="flex items-center">
        {ALPHANUMERIC_REGEX.test(password) ? (
          <Check color="green" size={22} />
        ) : (
          <Close color="red" size={22} />
        )}
        <Typography component="p" style="body3">
          Include atleast one letter and one number
        </Typography>
      </div>
    </>
  );
};

export default Password;
