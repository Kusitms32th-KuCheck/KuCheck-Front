// hooks/useNativeDeviceInfo.ts
import { useEffect, useState, useRef } from 'react';

interface DeviceInfo {
  deviceId: string;
  platform: 'ios' | 'android';
  timestamp: number;
}

export const useNativeDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestSentRef = useRef(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        if (message.deviceId && !message.type) {
          setDeviceInfo(message as DeviceInfo);
          setIsLoading(false);
        }

        if (message.type === 'deviceInfo') {
          setDeviceInfo({
            deviceId: message.deviceId,
            platform: message.platform,
            timestamp: message.timestamp || Date.now(),
          });
          setIsLoading(false);
        }
      } catch (err) {
        setError('디바이스 정보를 받을 수 없습니다');
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    const timeout = setTimeout(() => {
      if (!deviceInfo && !requestSentRef.current) {
        console.log('⏱️ 타임아웃 - deviceInfo 요청 중...');
        requestDeviceInfo();
        requestSentRef.current = true;
      } else if (deviceInfo) {
        setIsLoading(false);
      } else if (!deviceInfo) {
        console.warn('⚠️ 웹뷰에서 메시지를 받지 못했습니다');
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, []); // ✅ 의존성 배열 비움

  const requestDeviceInfo = () => {
    if ((window as any).ReactNativeWebView) {
      console.log('🔄 앱에 deviceInfo 요청 전송');
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'needsDeviceInfo' })
      );
    } else {
      console.warn('⚠️ React Native WebView가 감지되지 않음');
    }
  };

  return {
    deviceInfo,
    isLoading,
    error,
    requestDeviceInfo,
  };
};

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
