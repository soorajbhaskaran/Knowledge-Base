import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Plus } from "neetoicons";
import { Table as NeetoUITable, Button, PageLoader } from "neetoui";
import { v4 as uuidv4 } from "uuid";

import redirectionsApi from "apis/redirections";

import EditableCell from "./EditableCell";

import { buildRedirectionColumn } from "../utils";

const Table = () => {
  const [editingKey, setEditingKey] = useState("");
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState({
    from_path: "",
    to_path: "",
  });

  const isEditing = (record) => record.id === editingKey;

  const handleEditRedirectionButton = (record) => {
    setEditingKey(record.id);
    setInitialValues({
      from_path: record.from_path,
      to_path: record.to_path,
    });
  };

  const fetchRedirections = async () => {
    try {
      setLoading(true);
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setRedirections(redirections);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewRedirection = () => {
    const newRedirection = {
      id: uuidv4().slice(0, 8),
      from_path: "",
      to_path: "",
    };
    setInitialValues({ from_path: "", to_path: "" });
    setRedirections((prevRedirection) => [...prevRedirection, newRedirection]);
    setEditingKey(newRedirection.id);
  };

  const handleSubmitRedirection = async ({ values, resetForm }) => {
    if (editingKey.length === 8) {
      try {
        await redirectionsApi.create(values);
        fetchRedirections();
      } catch (error) {
        logger.error(error);
        handleDeleteRedirection(editingKey);
        resetForm({ from_path: "", to_path: "" });
      }
    } else {
      try {
        await redirectionsApi.update({ editingKey, values });
        fetchRedirections();
      } catch (error) {
        logger.error(error);
      }
    }
    setSubmitted(false);
    setEditingKey("");
  };

  const handleDeleteRedirection = async (id) => {
    if (id.length === 8) {
      setRedirections((prevRedirections) =>
        prevRedirections.filter((redirection) => redirection.id !== id)
      );
    } else {
      try {
        await redirectionsApi.destroy(id);
        fetchRedirections();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  const handleOnKeyPress = ({ e, values, resetForm }) => {
    if (e.key === "Enter") {
      handleSubmitRedirection({ values, resetForm });
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  const mergedColumns = ({ isSubmitting, values, submitForm, resetForm }) =>
    buildRedirectionColumn({
      isEditing,
      handleEditRedirectionButton,
      isSubmitting,
      setSubmitted,
      submitForm,
      handleDeleteRedirection,
      resetForm,
    }).map((col) => {
      if (!col.editable) {
        return { ...col, key: col.key };
      }

      return {
        ...col,
        key: col.key,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          editing: isEditing(record),
          values,
          resetForm,
          handleOnKeyPress,
        }),
      };
    });

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validateOnChange={submitted}
        onSubmit={(values, { resetForm }) =>
          handleSubmitRedirection({ values, resetForm })
        }
      >
        {({ isSubmitting, values, submitForm, resetForm }) => (
          <Form>
            <div style={{ height: "30vh" }}>
              <NeetoUITable
                fixedHeight
                rowData={redirections}
                columns={mergedColumns({
                  isSubmitting,
                  values,
                  submitForm,
                  resetForm,
                })}
                components={{
                  body: { cell: EditableCell },
                }}
                onRowClick={() => {}}
                onRowSelect={() => {}}
              />
            </div>
          </Form>
        )}
      </Formik>
      <Button
        className="mt-5"
        icon={Plus}
        label="Add New Redirection"
        style="link"
        onClick={handleAddNewRedirection}
      />
    </>
  );
};

export default Table;
