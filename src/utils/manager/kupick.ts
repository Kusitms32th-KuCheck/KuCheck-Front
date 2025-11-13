/**
 * 현재 날짜를 기준으로 큐픽 가능한 월들을 반환합니다.
 * 7~12월: [8, 9, 10, 11, 12]
 * 1~6월: [2, 3, 4, 5, 6]
 */
export function getKupickMonths(): number[] {
  const currentMonth = new Date().getMonth() + 1 // 1-12

  if (currentMonth >= 7 && currentMonth <= 12) {
    return [8, 9, 10, 11, 12]
  } else {
    return [2, 3, 4, 5, 6]
  }
}
