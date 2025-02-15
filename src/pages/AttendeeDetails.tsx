import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import Header from '../components/header';
import { attendeeSchema, type AttendeeFormData } from '../utils/zodschema';
import { uploadToCloudinary } from '../utils/cloudinary';
import { saveToIndexedDB, saveToLocalStorage } from '../utils/storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

const AttendeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTicket, selectedOption } = location.state || {};

  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [ticket, setTicket] = useState<AttendeeFormData | null>(null);

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
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1
  });

  const onSubmit = async (data: AttendeeFormData) => {
    try {
      const ticketData = { ...data, selectedTicket, selectedOption };
      await saveToIndexedDB(ticketData);
      saveToLocalStorage(ticketData);
      setTicket(ticketData); // Store ticket details for display

      // Navigate to TicketReady page with ticket data
      navigate('/TicketReady', { state: { ticketData } });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const captureTicket = async () => {
    const ticketElement = document.getElementById('ticket');
    if (ticketElement) {
      const canvas = await html2canvas(ticketElement);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'ticket.png';
      link.click();
    }
  };

  return (
    <div className="absolute flex flex-col items-center gap-20 py-28 left-1/2 top-10 -translate-x-1/2 px-4 w-full min-h-screen bg-gradient-to-b from-[#02191d] to-[#12464E]">
      <Header />
      <div className="border-2 border-gray-700 rounded-2xl px-6 md:px-12 py-8 md:py-12 w-full max-w-3xl text-left bg-[#02191d] shadow-lg">
        <div className="flex flex-col md:flex-row justify-between">
          <h2 className="text-2xl md:text-3xl font-bold font-JejuMyeongjo text-white">Attendee Details</h2>
          <p className="text-white mt-2 font-JejuMyeongjo text-xl md:mt-0">Step 2/3</p>
        </div>
        <div className="border-2 border-gray-700 rounded-lg p-4 md:p-6 w-full mt-8 bg-[#08252B] text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold font-JejuMyeongjo">Photo</label>
              <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50/10' : 'border-gray-500 hover:border-blue-400'}`}>
                <input {...getInputProps()} />
                {photoUrl ? (
                  <div className="relative">
                    <img src={photoUrl} alt="Preview" className="w-32 h-32 mx-auto rounded-lg object-cover" />
                    <button type="button" onClick={(e) => { e.stopPropagation(); setPhotoUrl(''); setValue('photoUrl', ''); }} className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white">
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
            <div className="flex md:flex-col gap-2">
              <label htmlFor="name" className="font-semibold font-JejuMyeongjo">Enter your name</label>
              <input {...register('name')} className="border border-gray-600 bg-transparent p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold font-JejuMyeongjo">Enter your email *</label>
              <input {...register('email')} className="border border-gray-600 bg-transparent p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="specialRequest" className="font-semibold">Special request?</label>
              <textarea
                {...register('specialRequest')}
                className="border border-gray-600 bg-transparent p-3 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
            <button type="submit" className="bg-[#24A0B5] text-white py-3 px-6 rounded-md  transition">Get My free TICKET</button>
          <Link to={"/SelectTicket"}><button type="submit" className="border-2 border-[#24A0B5] text-white py-3 px-6 rounded-md hover:bg-[#24A0B5] transition">Back</button></Link>
            </div>
          </form>
        </div>
      </div>

      {ticket && (
        <div id="ticket" className="border-2 border-gray-700 rounded-lg p-6 mt-8 bg-white text-black w-full max-w-xs text-center shadow-lg">
          <h3 className="text-xl font-bold">Conference Ticket</h3>
          <img src={ticket.photoUrl} alt="Avatar" className="w-24 h-24 mx-auto rounded-full mt-4" />
          <p className="text-lg font-semibold mt-2">{ticket.name}</p>
          <p className="text-sm text-gray-700">{ticket.email}</p>
          <button onClick={captureTicket} className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition">Download Ticket</button>
        </div>
      )}
    </div>
  );
};

export default AttendeeDetails;
