import { useEffect, useState } from 'react';

interface DeviceMessage {
  deviceId: string;
  platform: 'ios' | 'android';
  fcmToken: string | null;
  timestamp: number;
}

export function useNativeMessage() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceMessage | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const message: DeviceMessage = JSON.parse(event.data);
        console.log('📨 네이티브에서 수신:', message);

        setDeviceInfo(message);

        // FCM 토큰을 백엔드에 저장
        if (message.fcmToken) {
          saveFCMTokenToBackend(message.fcmToken, message.deviceId);
        }
      } catch (error) {
        console.error('❌ 메시지 파싱 실패:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return deviceInfo;
}

// 백엔드에 FCM 토큰 저장
const saveFCMTokenToBackend = async (
  fcmToken: string,
  deviceId: string
) => {
  try {
    const response = await fetch('/api/devices/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceToken: fcmToken,
        deviceId,
        deviceType: 'mobile',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save FCM token');
    }

    console.log('✅ FCM 토큰 저장 완료');
  } catch (error) {
    console.error('❌ FCM 토큰 저장 실패:', error);
  }
};
