//upload profile images to cloudinary
export const handleFileUpload = async(uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "ConnectU-SocialMediaApp");

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_ID}/image/upload`, {
    method: 'POST',
    body: formData
    });
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    const data = await response.json();
    console.log(data)
    return data.secure_url;
  } catch (error) {
      console.log(error);
  }
};