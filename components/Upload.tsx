import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import React, { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { useOutletContext } from "react-router";
import {
  PROGRESS_INCREMENT,
  PROGRESS_INTERVAL_MS,
  REDIRECT_DELAY_MS,
} from "lib/constants";

interface UploadProps {
  setImageData: (data: string) => void;
  onComplete?: (base64Image: string) => void;
}

const Upload: React.FC<UploadProps> = ({ setImageData, onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isSignedIn } = useOutletContext<AuthContext>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<number | null>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSignedIn) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!isSignedIn) {
      return;
    }

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isSignedIn) {
      return;
    }

    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (fileToProcess: File) => {
    // Block upload if not signed in
    if (!isSignedIn) {
      return;
    }

    setFile(fileToProcess);
    setProgress(0);

    // Use FileReader to get Base64 string
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;

      // Use setInterval to increment progress using constants
      intervalRef.current = window.setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + PROGRESS_INCREMENT;
          
          if (newProgress >= 100) {
            // Clear the interval when progress reaches 100
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            // Call onComplete (setImageData) with the Base64 data after REDIRECT_DELAY_MS delay
            setTimeout(() => {
              setImageData(base64String);
            if (onComplete) onComplete(base64String);
            }, REDIRECT_DELAY_MS);

            return 100;
          }
          
          return newProgress;
        });
      }, PROGRESS_INTERVAL_MS);
    };

    reader.readAsDataURL(fileToProcess);
  };

  const handleDropzoneClick = () => {
    if (isSignedIn && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload">
      {!file ? (
        <div
          className={`dropzone ${isDragging ? "is-dragging" : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropzoneClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="drop-input"
            accept=".jpg,.jpeg,.png"
            disabled={!isSignedIn}
            onChange={handleOnChange}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size="20" />
            </div>
            <p>
              {isSignedIn
                ? "Click to upload or just drag and drop"
                : "Sign in or sign up with Puter to upload "}
            </p>
            <p className="help">Maximum file size 50MB.</p>
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress == 100 ? (
                <CheckCircle2 className="check" />
              ) : (
                <ImageIcon className="image" />
              )}
            </div>
            <h3>{file.name}</h3>
            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />
              <div className="status-text">
                {progress < 100 ? "Analyzing plan..." : "Rendering..."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
