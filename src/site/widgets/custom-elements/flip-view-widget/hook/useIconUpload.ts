import { useState, useEffect } from 'react';
import { widget } from '@wix/editor';

interface UseFileUpload {
  icon: string;
  handleFileUpload: (files: FileList | null) => Promise<void>;
  setIcon: (value: string) => void;
}

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // SVG dosyaları için farklı işlem
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      return;
    }

    // Diğer resim formatları için mevcut sıkıştırma işlemi
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        const MAX_WIDTH = 140;
        const MAX_HEIGHT = 140;
        
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.2);
        resolve(compressedBase64);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

const useFileUpload = (defaultValue: string = ''): UseFileUpload => {
  const [icon, setIcon] = useState<string>(defaultValue);

  useEffect(() => {
    widget.getProp('handle-icon').then(async (savedIcon) => {
      if (!savedIcon) {
        await widget.setProp('handle-icon', defaultValue);
        setIcon(defaultValue);
      } else {
        setIcon(savedIcon);
      }
    });
  }, [defaultValue]);

  const handleFileUpload = async (files: FileList | null) => {
    if (files && files[0]) {
      try {
        const compressedImage = await compressImage(files[0]);
        await widget.setProp('handle-icon', compressedImage);
        setIcon(compressedImage);
      } catch (error) {
        console.error('Error handling file upload:', error);
      }
    }
  };

  return { icon, handleFileUpload, setIcon };
};

export default useFileUpload;