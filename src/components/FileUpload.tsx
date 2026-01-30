import React, {useState} from 'react';

interface FileUploadProps {
  onImageUpload: (imageUrl: string) => void;
}
const storedToken = localStorage.getItem("authToken");

function FileUpload({ onImageUpload }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleFileUpload = async (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que envíe el formulario
    
    const formData = new FormData();
    if (!file) {
      console.warn('No file selected');
      return;
    }
    formData.append('file', file);

    try {
      const response = await fetch('/api/fileupload/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData.imageUrl);
      
      // Llamar a la función para añadir la imagen
      onImageUpload(responseData.imageUrl);

    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div className="file-upload">
      <h1>File Upload Example</h1>
      <input type="file" onChange={handleFileChange} />
      <button type="button" className='btn btn-secondary' onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;