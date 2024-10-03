import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function FileUpload({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const result = await uploadData({
        key: `media/${file.name}`,
        data: file,
        options: {
          accessLevel: 'guest',
        }
      }).result;
      console.log('Upload successful:', result);
      onUploadComplete(`productsImage/${file.name}`);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="space-y-4">
      <Input type="file" onChange={handleChange} disabled={uploading} />
      <Button 
        onClick={handleUpload} 
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
}

export default FileUpload;