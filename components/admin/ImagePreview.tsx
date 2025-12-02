'use client';

import { useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Check } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
  imageUrl: string;
  onClose: () => void;
  onConfirm?: (adjustments: ImageAdjustments) => void;
  aspectRatio?: 'original' | '16:9' | '4:3' | '1:1' | '3:2';
  showEditor?: boolean;
}

export interface ImageAdjustments {
  objectFit: 'cover' | 'contain' | 'fill';
  objectPosition: string;
  zoom: number;
}

const aspectRatioOptions = [
  { value: 'original', label: 'Original', ratio: null },
  { value: '16:9', label: '16:9', ratio: 16 / 9 },
  { value: '4:3', label: '4:3', ratio: 4 / 3 },
  { value: '1:1', label: '1:1', ratio: 1 },
  { value: '3:2', label: '3:2', ratio: 3 / 2 },
];

const fitOptions: Array<{ value: 'cover' | 'contain' | 'fill'; label: string; description: string }> = [
  { value: 'cover', label: 'Cubrir', description: 'Llena el espacio, puede recortar' },
  { value: 'contain', label: 'Contener', description: 'Muestra toda la imagen' },
  { value: 'fill', label: 'Llenar', description: 'Estira para llenar' },
];

export default function ImagePreview({
  imageUrl,
  onClose,
  onConfirm,
  aspectRatio = 'original',
  showEditor = true,
}: ImagePreviewProps) {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatio);
  const [objectFit, setObjectFit] = useState<'cover' | 'contain' | 'fill'>('cover');
  const [zoom, setZoom] = useState(100);
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);

  const currentAspectRatio = aspectRatioOptions.find((opt) => opt.value === selectedAspectRatio);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm({
        objectFit,
        objectPosition: `${positionX}% ${positionY}%`,
        zoom,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative h-full w-full max-w-7xl p-4 md:p-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Previsualización de Imagen
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[calc(100%-120px)] flex-col gap-4 lg:flex-row">
          {/* Image Preview */}
          <div className="flex flex-1 items-center justify-center">
            <div
              className="relative overflow-hidden rounded-lg bg-zinc-900 shadow-2xl"
              style={{
                width: '100%',
                maxWidth: currentAspectRatio?.ratio ? '800px' : 'auto',
                aspectRatio: currentAspectRatio?.ratio || 'auto',
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="transition-transform duration-200"
                  style={{
                    objectFit,
                    objectPosition: `${positionX}% ${positionY}%`,
                    transform: `scale(${zoom / 100})`,
                  }}
                  unoptimized
                />
              </div>

              {/* Grid Overlay for positioning */}
              <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-white/10" />
                ))}
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          {showEditor && (
            <div className="w-full space-y-6 rounded-lg bg-zinc-900/50 p-6 lg:w-80">
              {/* Aspect Ratio */}
              <div>
                <label className="mb-3 block text-sm font-medium text-white">
                  Relación de Aspecto
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {aspectRatioOptions.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => setSelectedAspectRatio(option.value as typeof aspectRatio)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        selectedAspectRatio === option.value
                          ? 'bg-white text-zinc-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Object Fit */}
              <div>
                <label className="mb-3 block text-sm font-medium text-white">
                  Ajuste de Imagen
                </label>
                <div className="space-y-2">
                  {fitOptions.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => setObjectFit(option.value)}
                      className={`w-full rounded-lg px-4 py-3 text-left transition-all ${
                        objectFit === option.value
                          ? 'bg-white text-zinc-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs opacity-70">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom Control */}
              <div>
                <label className="mb-3 flex items-center justify-between text-sm font-medium text-white">
                  <span className="flex items-center gap-2">
                    <ZoomIn className="h-4 w-4" />
                    Zoom
                  </span>
                  <span className="text-xs text-white/70">{zoom}%</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${(zoom - 50) / 1.5}%, rgba(255,255,255,0.2) ${(zoom - 50) / 1.5}%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20"
                  >
                    <ZoomOut className="mx-auto h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(100)}
                    className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20"
                  >
                    <Maximize2 className="mx-auto h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20"
                  >
                    <ZoomIn className="mx-auto h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Position Controls */}
              <div>
                <label className="mb-3 block text-sm font-medium text-white">
                  Posición
                </label>
                <div className="space-y-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs text-white/70">
                      <span>Horizontal</span>
                      <span>{positionX}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={positionX}
                      onChange={(e) => setPositionX(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20"
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs text-white/70">
                      <span>Vertical</span>
                      <span>{positionY}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={positionY}
                      onChange={(e) => setPositionY(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPositionX(50);
                    setPositionY(50);
                  }}
                  className="mt-2 w-full rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20"
                >
                  Centrar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Cancelar
          </button>
          {showEditor && (
            <button
              type="button"
              onClick={handleConfirm}
              className="flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white/90"
            >
              <Check className="h-4 w-4" />
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
