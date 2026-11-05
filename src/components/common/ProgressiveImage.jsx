import { useState, useEffect, useRef } from "react";

/**
 * ProgressiveImage
 * Prevents jarring pop-in of images during network load.
 * Displays a silky shimmer skeleton while fetching, then smoothly reveals the image.
 */
export default function ProgressiveImage({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  placeholderClassName = "",
  aspectRatio,
  loading = "lazy",
  style = {},
  draggable = false,
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Sync with image cache: if browser has already cached the image, reveal immediately
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    if (imgRef.current?.complete && imgRef.current?.naturalWidth !== 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio, ...style } : style}
    >
      {/* Skeleton Shimmer Background Placeholder */}
      <div
        className={`absolute inset-0 z-0 bg-slate-200/90 transition-opacity duration-500 ease-out overflow-hidden ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        } ${placeholderClassName}`}
      >
        <div className="image-shimmer" />
      </div>

      {/* Image with buttery fade-in & subtle unblur transition */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        draggable={draggable}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={(e) => {
          setHasError(true);
          if (onError) onError(e);
        }}
        className={`relative z-10 transition-all duration-500 ease-out ${
          isLoaded
            ? "opacity-100 scale-100 filter-none"
            : "opacity-0 scale-[1.015] filter blur-[2px]"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
