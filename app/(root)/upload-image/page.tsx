"use client";

import React, { useState, useEffect } from "react";
import { uploadData, getUrl, list } from "aws-amplify/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ key: string; url: string }[]>([]);
  const [imageCache, setImageCache] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { items } = await list({
        prefix: "images/",
      });
      const imagePromises = items.map(async (item) => {
        if (imageCache[item.key]) {
          return { key: item.key, url: imageCache[item.key] };
        } else {
          const { url } = await getUrl({ key: item.key });
          const imageUrl = url.toString();
          setImageCache(prevCache => ({ ...prevCache, [item.key]: imageUrl }));
          return { key: item.key, url: imageUrl };
        }
      });
      const imageData = await Promise.all(imagePromises);
      setImages(imageData);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const result = await uploadData({
        key: `images/${file.name}`,
        data: file,
        options: {
          contentType: "image/png",
        },
      }).result;
      console.log("Upload successful:", result.key);
      alert("File uploaded successfully!");
      fetchImages(); // Refresh the list after upload
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <Input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
        className="mb-4"
      />
      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full mb-4"
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      <h2 className="text-xl font-semibold mb-2">Stored Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.key} className="border rounded-lg p-2">
            <Image 
              src={image.url} 
              alt={image.key.split('/').pop() || ''} 
              width={200} 
              height={200} 
              className="w-full h-40 object-cover mb-2"
            />
            <p className="text-sm text-center truncate">{image.key.split('/').pop()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
