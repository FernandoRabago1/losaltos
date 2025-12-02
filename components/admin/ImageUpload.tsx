'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Check, AlertCircle, Eye, Edit3 } from 'lucide-react';
import Image from 'next/image';
import ImagePreview from './ImagePreview';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  label: string;
  currentImage?: string;
  aspectRatio?: 'original' | '16:9' | '4:3' | '1:1' | '3:2';
  showFullPreview?: boolean;
}

export default function ImageUpload({
  onUploadComplete,
  label,
  currentImage,
  aspectRatio = 'original',
  showFullPreview = true,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Solo se permiten archivos PNG, JPG, JPEG y WebP');
      return;
    }

    // Validate file size (15MB)
    if (file.size > 15 * 1024 * 1024) {
      setError('El tamaño del archivo debe ser menor a 15MB');
      return;
    }

    setError(null);
    setSuccess(false);

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      const previewUrl = reader.result as string;
      setPreview(previewUrl);
      // Auto-open preview modal for adjustment
      if (showFullPreview) {
        setShowPreviewModal(true);
      }
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al subir archivo');
      }

      const data = await response.json();
      onUploadComplete(data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir archivo');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </label>

      {preview ? (
        <div className="space-y-3">
          {/* Image Preview Card */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-lg border-2 border-zinc-200"
              style={{
                height: '500px',
                width: '100%',
              }}
            >
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute right-2 top-2 flex gap-2">
              {success && (
                <div className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white shadow-lg">
                  <Check className="h-4 w-4" />
                  ¡Subido!
                </div>
              )}
              {showFullPreview && (
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="rounded-full bg-white p-2.5 text-zinc-700 shadow-lg transition-all hover:bg-zinc-100"
                  title="Ver y ajustar imagen"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-full bg-red-500 p-2.5 text-white shadow-lg transition-all hover:bg-red-600"
                title="Eliminar imagen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-2 left-2 rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-xl backdrop-blur-sm">
              <Eye className="mr-1.5 inline h-4 w-4" />
              Click <Edit3 className="mx-1 inline h-4 w-4 text-blue-400" /> para ajustar zoom y posición
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50"
            >
              <Upload className="h-4 w-4" />
              Cambiar imagen
            </button>
            {showFullPreview && (
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800"
              >
                <Edit3 className="h-4 w-4" />
                Ajustar Zoom y Encuadre
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 transition-all hover:border-zinc-900 hover:bg-zinc-100"
        >
          {uploading ? (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-zinc-600" />
              <p className="mt-4 text-sm font-medium text-zinc-600">
                Subiendo imagen...
              </p>
              <p className="mt-1 text-xs text-zinc-500">Por favor espera</p>
            </>
          ) : (
            <>
              <div className="rounded-full bg-zinc-200 p-4">
                <Upload className="h-8 w-8 text-zinc-600" />
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-900">
                Click para subir imagen
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                PNG, JPG, JPEG o WebP (máx 5MB)
              </p>
              <p className="mt-3 text-xs text-zinc-600">
                Podrás ajustar y previsualizar después de subir
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Full Screen Preview Modal */}
      {showPreviewModal && preview && (
        <ImagePreview
          imageUrl={preview}
          onClose={() => setShowPreviewModal(false)}
          aspectRatio={aspectRatio}
          showEditor={true}
        />
      )}
    </div>
  );
}
