import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import html2canvas from "html2canvas";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  text: z.string().optional(),
  photo: z.any().optional(),
});

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload";
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

const AttendeeDetails = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { register, handleSubmit, setValue } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) setImageUrl(storedImage);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue("photo", file);
      localStorage.setItem("uploadedImage", URL.createObjectURL(file));
      setImageUrl(URL.createObjectURL(file));
    }
  }, [setValue]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      const data = await res.json();
      setImageUrl(data.secure_url);
      localStorage.setItem("uploadedImage", data.secure_url);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const generateAndDownload = () => {
    const attendeeData = {
      name: (document.getElementById("name") as HTMLInputElement)?.value,
      email: (document.getElementById("email") as HTMLInputElement)?.value,
      text: (document.getElementById("text") as HTMLTextAreaElement)?.value,
      imageUrl,
    };
    const blob = new Blob([JSON.stringify(attendeeData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendee_details.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const captureScreenshot = () => {
    const element = document.getElementById("attendee-details");
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "attendee_details.png";
        link.click();
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (data.photo) await uploadToCloudinary(data.photo);
    console.log("Form submitted", data);
  };

  return (
    <div id="attendee-details" className="absolute flex flex-col items-center gap-20 py-[112px] left-1/2 top-[34px] -translate-x-1/2 px-0 w-full min-h-screen bg-[radial-gradient(circle,_rgba(36,160,181,0.2)_0%,_rgba(36,160,181,0)_100%)] bg-[#02191D]">
      <div className="border-2 rounded-[24px] px-12 py-12 w-[700px] h-[1083px] text-left bg-[#07373F] text-[#ffffff]">
        <h2>Attendee Details</h2>
        <p>Step 2/3</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-[#07373F] shadow-md rounded-lg">
          <div {...getRootProps()} className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer">
            <input {...getInputProps()} />
            {imageUrl ? (
              <img src={imageUrl} alt="Uploaded" className="w-full h-32 object-cover" />
            ) : (
              <p>Drag & drop a photo or click to select</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold mb-1">Enter your name</label>
            <input {...register("name")} id="name" className="border border-gray-300 p-2 rounded-md" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-1">Enter your email *</label>
            <input {...register("email")} id="email" type="email" className="border border-gray-300 p-2 rounded-md" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="text" className="font-semibold mb-1">Special request?</label>
            <textarea {...register("text")} id="text" className="border border-gray-300 p-3 rounded-md h-24 resize-none" />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">Submit</button>
            <button type="button" onClick={generateAndDownload} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition">Download JSON</button>
            <button type="button" onClick={captureScreenshot} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">Download Screenshot</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendeeDetails;
