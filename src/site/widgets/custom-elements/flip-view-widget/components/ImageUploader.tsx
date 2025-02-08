import React from 'react';
import { FileUpload, ImageViewer } from '@wix/design-system';

interface ImageUploaderProps {
  imageUrl: string;
  onImageUpload: (file: File) => void;
  onRemoveImage: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, onImageUpload, onRemoveImage }) => {
  return (
    <FileUpload accept=".jpeg,.jpg,.png,.svg" onChange={async (myFile: any) => {
      if (myFile?.[0]) {
        onImageUpload(myFile[0]);
      }
    }}>
      {({ openFileUploadDialog }) => (
        <ImageViewer
          onAddImage={openFileUploadDialog}
          showUpdateButton={false}
          imageUrl={imageUrl}
          onRemoveImage={onRemoveImage}
        />
      )}
    </FileUpload>
  );
};

export default ImageUploader;