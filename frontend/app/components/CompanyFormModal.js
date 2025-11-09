"use client";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

export default function CompanyFormModal({ company, onClose, onSaved }) {

    const isEdit = Boolean(company?.id);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        setFieldValue("logo", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (values, formikHelpers) => {
        const { setSubmitting, resetForm } = formikHelpers;
        try {
            const url = isEdit
                ? `${process.env.NEXT_PUBLIC_API_URL}/companies/update/${company.id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/companies/save-company`;

            await axios.post(url, values);
            toast.success(`Company ${isEdit ? "updated" : "created"} successfully!`);
            resetForm();
            onSaved();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to save company");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" open={true} onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded max-w-5xl w-full p-6 z-50">
            <Dialog.Title className="text-lg text-gray-800 font-bold mb-4">{isEdit ? "Edit Company" : "Add Company"}</Dialog.Title>
            <Formik
                initialValues={{
                    name              : company.name || "",
                    email             : company.email || "",
                    phone             : company.phone || "",
                    address1          : company.address1 || "",
                    address2          : company.address2 || "",
                    website           : company.website || "",
                    contact_person    : company.contact_person || "",
                    contact_email     : company.contact_email || "",
                    logo              : company.logo || null,
                    is_active         : company.is_active ?? true,
                }}
                
                validate={(values) => {
                    const errors = {};
                    if (!values.name) errors.name = "Required";
                    if (!values.email) errors.email = "Required";
                    if (!values.phone) errors.phone = "Required";
                    if (!values.address1) errors.address1 = "Required";
                    if (!values.contact_person) errors.contact_person = "Required";
                    if (!values.contact_email) errors.contact_email = "Required";
                    return errors;
                }}

                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div>

                            <div className="flex flex-wrap md:flex-nowrap gap-6">
                                {/* Left column */}
                                <div className="flex flex-col w-full md:w-1/2 gap-3">
                                    <Field name="name" placeholder="Company Name" className="border rounded p-2 w-full" />
                                    <Field name="email" type="email" placeholder="john.smith@gmail.com" className="border rounded p-2 w-full" />
                                    <Field name="phone" placeholder="+8801XXXXXXXXX" className="border rounded p-2 w-full" />
                                    <Field as="textarea" name="details" placeholder="Details" className="border rounded p-2 w-full" />
                                    {/* File input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="logo"
                                        onChange={(event) => handleImageChange(event, setFieldValue)}
                                        className="border rounded p-2 w-full"
                                    />

                                    {/* Image preview */}
                                    {preview && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600 mb-1">Preview:</p>
                                            <Image
                                                src={preview}
                                                alt="Logo Preview"
                                                width={96}
                                                height={96}
                                                className="object-cover rounded border"
                                            />
                                            {/* <input name="logo" type="hidden" /> */}
                                        </div>
                                    )}
                                </div>

                                {/* Right column */}
                                <div className="flex flex-col w-full md:w-1/2 gap-3">
                                    <Field name="address1" placeholder="Address Line 1" className="border rounded p-2 w-full" />
                                    <Field name="address2" placeholder="Address Line 2" className="border rounded p-2 w-full" />
                                    <Field name="website" placeholder="Website URL" className="border rounded p-2 w-full" />
                                    <Field name="contact_person" placeholder="Contact Person" className="border rounded p-2 w-full" />
                                    <Field name="contact_email" type="email" placeholder="Contact Email" className="border rounded p-2 w-full" />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-red-600">
                                Cancel
                                </button>
                                <button type="submit" disabled={isSubmitting}  className="bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-green-700">
                                {isEdit ? "Update" : "Save"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
        </Dialog>
    );
}
