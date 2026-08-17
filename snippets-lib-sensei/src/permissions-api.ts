function IS_BROWSER(): boolean {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined';
}

// ─── Media Devices (Cámara y Micrófono) ────────────────────────────

/**
 * Solicita permiso y acceso a la cámara y/o micrófono.
 * Retorna el Stream nativo de JS o null si falla/deniega.
 */
export async function GET_MEDIA_STREAM(constraints: MediaStreamConstraints = { video: true, audio: true }): Promise<MediaStream | null> {
  if (!IS_BROWSER() || !navigator.mediaDevices?.getUserMedia) {
    console.warn('[GET_MEDIA_STREAM] API no soportada en este entorno.');
    return null;
  }
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.error('[GET_MEDIA_STREAM] Permiso denegado o error:', error);
    return null;
  }
}

/**
 * Detiene todos los tracks de un stream (apaga la luz de la cámara/micrófono).
 * Es CRÍTICO llamar a esto cuando terminas de usar la cámara para liberar memoria.
 */
export function STOP_MEDIA_STREAM(stream: MediaStream | null): void {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

// ─── Geolocation API ───────────────────────────────────────────────

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

/**
 * Obtiene la ubicación actual del dispositivo (GPS).
 */
export async function GET_GEOLOCATION(options?: PositionOptions): Promise<GeoPosition | null> {
  if (!IS_BROWSER() || !navigator.geolocation) return null;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        console.error('[GET_GEOLOCATION] Error:', error.message);
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 10000, ...options }
    );
  });
}

// ─── Device Motion / Gyroscope API ─────────────────────────────────

/**
 * En iOS 13+, el giroscopio requiere pedir permiso explícito al usuario.
 * Esta función maneja ese requerimiento de Apple.
 */
export async function REQUEST_MOTION_PERMISSION(): Promise<boolean> {
  if (!IS_BROWSER()) return false;
  
  // @ts-ignore - DeviceOrientationEvent.requestPermission es exclusivo de iOS
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      const response = await DeviceOrientationEvent.requestPermission();
      return response === 'granted';
    } catch (error) {
      console.error('[REQUEST_MOTION_PERMISSION] Error:', error);
      return false;
    }
  }
  // Android y otros navegadores no requieren este paso explícito
  return true; 
}

/**
 * Escucha el giroscopio/acelerómetro.
 * Retorna una función para DETENER la escucha (cleanup).
 */
export function ON_DEVICE_ORIENTATION(callback: (event: DeviceOrientationEvent) => void): (() => void) | null {
  if (!IS_BROWSER()) return null;

  window.addEventListener('deviceorientation', callback);
  
  // Retornamos una función "cleanup" para quitar el event listener cuando ya no se necesite
  return () => {
    window.removeEventListener('deviceorientation', callback);
  };
}

// ─── Vibration (Refuerzo de la anterior) ───────────────────────────
export function VIBRATE(pattern: number | number[]): boolean {
  if (IS_BROWSER() && 'vibrate' in navigator) {
    return navigator.vibrate(pattern);
  }
  return false;
}