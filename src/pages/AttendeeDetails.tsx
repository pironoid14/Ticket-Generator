import  { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import Header from '../components/header';
import { attendeeSchema, type AttendeeFormData } from '../utils/zodschema';
import { uploadToCloudinary } from '../utils/cloudinary';
import { saveToIndexedDB, saveToLocalStorage } from '../utils/storage';

const AttendeeDetails = () => {
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema)
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setPhotoUrl(url);
      setValue('photoUrl', url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const onSubmit = async (data: AttendeeFormData) => {
    try {
      await saveToIndexedDB(data);
      saveToLocalStorage(data);
      // Handle successful submission (e.g., generate ticket, show success message)
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="absolute flex flex-col items-center gap-20 py-[112px] left-1/2 top-[34px] -translate-x-1/2 px-0 w-full min-h-screen "
    style={{ background: "radial-gradient(52.52% 32.71% at 50% 97.66%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), #02191D", }}
    >
      <Header />
      <div className="border-2 rounded-[24px] px-12 py-12 w-[700px] h-auto scale-x-[370px] gap-y-8 text-left">
        <section className="align-text-top flex justify-between text-left">
          <h2 className="text-2xl font-bold text-white">Attendee Details</h2>
          <p className="text-white">Step 2/3</p>
        </section>
        
        <div className="border-2 rounded-lg p-6 w-[604px] mt-8 bg-[#07373F] text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Photo Upload Dropzone */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Photo</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-blue-500 bg-blue-50/10' : 'border-gray-300 hover:border-blue-400'}`}
              >
                <input {...getInputProps()} />
                {photoUrl ? (
                  <div className="relative">
                    <img src={photoUrl} alt="Preview" className="w-32 h-32 mx-auto rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoUrl('');
                        setValue('photoUrl', '');
                      }}
                      className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8" />
                    <p>{isUploading ? 'Uploading...' : 'Drag & drop your photo here or click to select'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">Enter your name</label>
              <input
                {...register('name')}
                className="border border-gray-600 bg-transparent p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold">Enter your email *</label>
              <input
                {...register('email')}
                className="border border-gray-600 bg-transparent p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Special Request */}
            <div className="flex flex-col gap-2">
              <label htmlFor="specialRequest" className="font-semibold">Special request?</label>
              <textarea
                {...register('specialRequest')}
                className="border border-gray-600 bg-transparent p-3 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition"
              >
                Get my free ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;