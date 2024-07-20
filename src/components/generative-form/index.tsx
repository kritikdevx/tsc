"use client";

import React from "react";
import { useFormik } from "formik";
import { GerativeFormSchema } from "./schema";

export default function GenerativeForm() {
  const formik = useFormik({
    initialValues: {
      selfie: null,
      background: "beach.jpg",
    },
    validationSchema: GerativeFormSchema,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2));
      const formData = new FormData();
      formData.append("selfie", values.selfie!);
      formData.append("background", values.background);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(event) =>
          formik.setFieldValue("selfie", event.currentTarget.files?.[0] || null)
        }
        onBlur={formik.handleBlur}
        className="border p-2"
      />
      {formik.errors.selfie && formik.touched.selfie && (
        <div style={{ color: "red" }}>{formik.errors.selfie}</div>
      )}
      <select
        name="background"
        value={formik.values.background}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="border p-2"
      >
        <option value="beach.jpg">Beach</option>
        <option value="city.jpg">City</option>
        {/* Add more backgrounds */}
      </select>
      {formik.errors.background && formik.touched.background && (
        <div style={{ color: "red" }}>{formik.errors.background}</div>
      )}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Process Image
      </button>
    </form>
  );
}
