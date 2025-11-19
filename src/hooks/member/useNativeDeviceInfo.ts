// hooks/useNativeDeviceInfo.ts
import { useEffect, useState } from 'react';

interface DeviceInfo {
  deviceId: string;
  platform: 'ios' | 'android';
  timestamp: number;
}

export const useNativeDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        // React Native에서 보낸 초기 메시지
        if (message.deviceId) {
          setDeviceInfo(message as DeviceInfo);
          setIsLoading(false);
        }

        // 요청에 대한 응답
        if (message.type === 'deviceInfo') {
          setDeviceInfo({
            deviceId: message.deviceId,
            platform: message.platform,
            timestamp: message.timestamp || Date.now(),
          });
          setIsLoading(false);
        }
      } catch (err) {
        console.error('메시지 파싱 오류:', err);
        setError('디바이스 정보를 받을 수 없습니다');
      }
    };

    // ✅ 웹뷰에서 보낸 메시지 리스너
    window.addEventListener('message', handleMessage);

    // ✅ 필요시 장치 정보 요청 (만약 아직 안 받았다면)
    const timeout = setTimeout(() => {
      if (!deviceInfo) {
        requestDeviceInfo();
      }
    }, 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, []);

  // ✅ React Native 앱에 정보 요청
  const requestDeviceInfo = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'needsDeviceInfo' })
      );
    }
  };

  return {
    deviceInfo,
    isLoading,
    error,
    requestDeviceInfo,
  };
};

// 타입 선언 추가 (window 객체에 ReactNativeWebView 추가)
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
