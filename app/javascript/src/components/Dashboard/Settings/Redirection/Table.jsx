import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Plus } from "neetoicons";
import { Table as NeetoUITable, Button } from "neetoui";
import { v4 as uuidv4 } from "uuid";

import redirectionApi from "apis/redirections";

import EditableCell from "./EditableCell";

import { buildRedirectionColumn } from "../utils";

const Table = () => {
  const [editingKey, setEditingKey] = useState("");
  const [redirections, setRedirections] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState({
    from_path: "",
    to_path: "",
  });

  const isEditing = (record) => record.id === editingKey;

  const handleEditRedirectionButton = (record) => {
    setInitialValues({
      from_path: record.from_path,
      to_path: record.to_path,
    });
    setEditingKey(record.id);
  };

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionApi.fetch();
      setRedirections(redirections);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleAddNewRedirection = () => {
    const newRedirection = {
      id: uuidv4().slice(0, 8),
      fromPath: "",
      toPath: "",
    };
    setRedirections((prevRedirection) => [...prevRedirection, newRedirection]);
    setEditingKey(newRedirection.id);
  };

  const handleSubmitRedirection = async (values, resetForm) => {
    if (editingKey.length === 8) {
      try {
        await redirectionApi.create(values);
        fetchRedirections();
        resetForm({ from_path: "", to_path: "" });
      } catch (error) {
        logger.error(error);
        handleDeleteRedirection(editingKey);
      }
    } else {
      try {
        await redirectionApi.update({ editingKey, values });
        fetchRedirections();
      } catch (error) {
        logger.error(error);
      }
    }
    setEditingKey("");
  };

  const handleDeleteRedirection = async (id) => {
    if (id.length === 8) {
      setRedirections((prevRedirections) =>
        prevRedirections.filter((redirection) => redirection.id !== id)
      );
    } else {
      try {
        await redirectionApi.destroy(id);
        fetchRedirections();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  const handleOnKeyPress = (e, values, resetForm) => {
    if (e.key === "Enter") {
      handleSubmitRedirection(values, resetForm);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  const mergedColumns = ({ isSubmitting, values, resetForm }) =>
    buildRedirectionColumn({
      isEditing,
      handleEditRedirectionButton,
      isSubmitting,
      setSubmitted,
      handleDeleteRedirection,
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

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validateOnChange={submitted}
        onSubmit={(values, { resetForm }) =>
          handleSubmitRedirection(values, resetForm)
        }
      >
        {({ isSubmitting, values, resetForm }) => (
          <Form>
            <div style={{ height: "60vh" }}>
              <NeetoUITable
                fixedHeight
                columns={mergedColumns({ isSubmitting, values, resetForm })}
                rowData={redirections}
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
