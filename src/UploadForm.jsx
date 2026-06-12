import React, { useState } from "react";
import "./App.css";
import axios from "axios";


function UploadForm() {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const requestData = new FormData();

  requestData.append("sourceAgency", formData.field1);
  requestData.append("sourceIdentifier", formData.field2);
  requestData.append("targetAgency", formData.field3);
  requestData.append("targetIdentifier", formData.field4);
  requestData.append("keyField", formData.field5);
  requestData.append("valueField", formData.field6);

  if (file) {
    requestData.append("file", file);
  }

  console.log("=== FormData Contents ===");

  requestData.forEach((value, key) => {
    console.log(key, value);
  });

  try {
    const response = await axios.post(
      "https://cpi-assistant-2-0.onrender.com/VM/process", 
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

     const blob = new Blob([response.data]);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    link.setAttribute(
  "download",
  `${formData.field5}_${formData.field6}.csv`
);

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    alert("File Downloaded Successfully");
  } catch (error) {
    console.error("Error:", error);
    alert("Upload Failed");
  }
};

  return (
    
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">
    <div className="w-full max-w-3xl">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
          <h2 className="text-3xl font-bold text-white">
            Value Mapping Automation Portal
          </h2>
          <p className="text-blue-100 mt-2">
            Configure source and target mappings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Source Agency
              </label>
              <input
                type="text"
                name="field1"
                value={formData.field1}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Source Identifier
              </label>
              <input
                type="text"
                name="field2"
                value={formData.field2}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Agency
              </label>
              <input
                type="text"
                name="field3"
                value={formData.field3}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Identifier
              </label>
              <input
                type="text"
                name="field4"
                value={formData.field4}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Key Field
              </label>
              <input
                type="text"
                name="field5"
                value={formData.field5}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Value Field
              </label>
              <input
                type="text"
                name="field6"
                value={formData.field6}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
            </div>

          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload CSV / Excel File
            </label>

            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 bg-blue-50 hover:bg-blue-100 transition">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                required
                className="w-full text-gray-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg shadow-lg hover:scale-[1.01] hover:shadow-xl transition-all duration-300"
          >
            Generate CSV
          </button>

        </form>
      </div>
    </div>
  </div>

  );
}

export default UploadForm;
