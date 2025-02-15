const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvtdhmwpp/upload';
const UPLOAD_PRESET = 'pironoidic';

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.secure_url) {
      throw new Error('Cloudinary response did not contain a secure URL');
    }

    return data.secure_url;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error uploading to Cloudinary:', error.message);
      throw new Error(`Failed to upload image: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Failed to upload image due to an unexpected error');
    }
  }
};