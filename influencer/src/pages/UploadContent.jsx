import React, { useState } from "react";
import axios from "axios";

const UploadContent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: [],
    previewUrls: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    let newImages = [];
    let video = null;
    let previewUrls = [...formData.previewUrls];

    files.forEach((file) => {
      if (file.type.startsWith("image")) {
        newImages.push(file);
      } else if (file.type.startsWith("video")) {
        video = file;
      }
    });

    if (video) {
      setFormData({ media: [video], previewUrls: [URL.createObjectURL(video)] });
    } else {
      const totalImages = [...formData.media.filter((file) => file.type.startsWith("image")), ...newImages];
      if (totalImages.length > 10) {
        alert("You can upload a maximum of 10 images.");
      } else {
        const updatedPreviewUrls = [
          ...formData.previewUrls.filter((_, idx) => formData.media[idx]?.type.startsWith("image")),
          ...newImages.map((file) => URL.createObjectURL(file)),
        ];
        setFormData({ media: totalImages, previewUrls: updatedPreviewUrls });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    formData.media.forEach((file) => data.append("media", file));

    try {
      const response = await axios.post("http://localhost:4000/api/content/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload Success:", response.data);
      alert("Content Uploaded Successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload content.");
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Promotional Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter promotion title"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter detailed promotion message"
            rows="4"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Media (1 Video OR up to 10 Images)</label>
          <input
            type="file"
            multiple
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {formData.previewUrls.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="grid grid-cols-3 gap-2">
              {formData.previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  {formData.media[index].type.startsWith("video") ? (
                    <video src={url} controls className="w-full h-auto rounded-md" />
                  ) : (
                    <img src={url} alt="Preview" className="w-full h-auto rounded-md" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadContent;
