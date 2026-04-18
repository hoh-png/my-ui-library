// 作用：让用户把本地文件（图片、文档等）上传到网站
// ┌─────────────────────────────────────┐
// │                                     │
// │           📁 点击或拖拽文件到此区域   │
// │                                     │
// │      支持 .jpg, .png, .pdf 格式      │
// │                                     │
// └─────────────────────────────────────┘
import React, { useState } from 'react';
import './Upload.scss';

export interface UploadProps {
    onChange?: (file: File) => void;
    onError?: (error: Error, file: File) => void;
    onSuccess?: (response: any, file: File) => void;
    action?: string; 
    accept?: string;
    multiple?: boolean;
    buttonText?: string;
    disabled?: boolean;
}

export const Upload: React.FC<UploadProps> = ({
    onChange,
    onError,
    onSuccess,
    action,
    accept = "*",
    multiple = false,
    disabled = false,
    buttonText = "点击上传",
}) => {
    const [uploading, setUploading] = useState(false); 
    const [fileList, setFileList] = useState<File[]>([]);

    buttonText = uploading ? "上传中..." : "点击上传";
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files) return; 

        setFileList(files);
        onChange?.(files[0]);

        if (action) {
            uploadFiles(files);
        }
    }
    const uploadFiles = async (files: File[]) => {
        setUploading(true);
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(action!, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                onSuccess?.(data, file);
            } catch (error) {
                onError?.(error as Error, file);
            }
        }
        setUploading(false);
    };

    return (
        <div className={"upload"}>
            <label className={`upload__button ${disabled ? 'upload__button--disabled' : ''}`}>
                {buttonText}
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    disabled={disabled}
                    style= {{ display: 'none' }}
                />
            </label>

            {fileList.length > 0 && (
                <ul className="upload__list">
                    {fileList.map((file, index) => (
                        <div key={index} className="upload__file-item">
                            <span>{file.name}</span>
                            <span>{(file.size / 1024).toFixed(2)} KB</span>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

    