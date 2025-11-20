// hooks/useNativeDeviceInfo.ts
import { useEffect, useState, useRef } from 'react';

interface DeviceInfo {
  deviceId: string;
  platform: 'ios' | 'android';
  pushToken: string | null;
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

        // deviceId가 있으면 기기 정보로 인식
        if (message.deviceId) {
          const deviceData: DeviceInfo = {
            deviceId: message.deviceId,
            platform: message.platform || 'ios',
            pushToken: message.pushToken || null,
            timestamp: message.timestamp || Date.now(),
          };

          console.log('📱 기기 정보 수신:', deviceData);
          setDeviceInfo(deviceData);

          // 로컬스토리지에도 저장
          localStorage.setItem('nativeDeviceInfo', JSON.stringify(deviceData));

          setIsLoading(false);
        }

        if (message.type === 'deviceInfo') {
          const deviceData: DeviceInfo = {
            deviceId: message.deviceId,
            platform: message.platform,
            pushToken: message.pushToken || null,
            timestamp: message.timestamp || Date.now(),
          };

          console.log('📱 deviceInfo 타입 메시지 수신:', deviceData);
          setDeviceInfo(deviceData);

          // 로컬스토리지에도 저장
          localStorage.setItem('nativeDeviceInfo', JSON.stringify(deviceData));

          setIsLoading(false);
        }
      } catch (err) {
        console.error('❌ 메시지 파싱 에러:', err);
        setError('디바이스 정보를 받을 수 없습니다');
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // 저장된 기기 정보 복원
    try {
      const saved = localStorage.getItem('nativeDeviceInfo');
      if (saved) {
        const parsed = JSON.parse(saved) as DeviceInfo;
        setDeviceInfo(parsed);
        console.log('💾 저장된 기기 정보 복원:', parsed);
      }
    } catch (err) {
      console.error('저장된 기기 정보 복원 실패:', err);
    }

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
