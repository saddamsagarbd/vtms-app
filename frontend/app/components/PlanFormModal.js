"use client";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

export default function PlanFormModal({ plan, onClose, onSaved }) {
  const isEdit = Boolean(plan?.id);

  const handleSubmit = async (values, formikHelpers) => {
    const { setSubmitting, resetForm } = formikHelpers;
    try {
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_API_URL}/plans/update/${plan.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/plans/save-plan`;

      await axios.post(url, values);
      toast.success(`Plan ${isEdit ? "updated" : "created"} successfully!`);
      resetForm();
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save plan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" open={true} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded max-w-md w-full p-6 z-50">
          <Dialog.Title className="text-lg text-gray-800 font-bold mb-4">{isEdit ? "Edit Plan" : "Add Plan"}</Dialog.Title>
          <Formik
            initialValues={{
              name: plan.name || "",
              price: plan.price || 0,
              details: plan.details || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) errors.name = "Required";
              if (!values.price) errors.price = "Required";
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field name="name" placeholder="Plan Name" className="w-full text-gray-800 border p-2 rounded" />
                <Field name="price" type="number" placeholder="Price" className="w-full text-gray-800 border p-2 rounded" />
                <Field as="textarea" name="details" placeholder="Details" className="w-full text-gray-800 border p-2 rounded" />
                <div className="flex justify-end gap-2">
                  <button type="button" className="bg-red-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-4 py-2 rounded">
                    {isEdit ? "Update" : "Save"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
}
