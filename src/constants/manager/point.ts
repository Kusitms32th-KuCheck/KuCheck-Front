export const monthGroups: Record<string, string[]> = {
  '8월': ['8/9', '8/16', '8/23', '8/30'],
  '9월': ['9/6', '9/13', '9/20', '9/27'],
  '10월': ['10/4', '10/11', '10/18', '10/25'],
  '11월': ['11/1', '11/8', '11/15', '11/22', '11/29'],
  '12월': ['12/6'],
}

export const allDates = Object.values(monthGroups).flat()

export const ATTENDANCE_OPTIONS = [
  { label: '출석(0)', value: '출석 (-0)' },
  { label: '결석(인정)', value: '결석(인정)' },
  { label: '결석(사유 -1)', value: '결석(사유 -1)' },
  { label: '결석(무단 -2)', value: '결석(무단 -2)' },
  { label: '결석(미제출 -3)', value: '결석(미제출 -3)' },
  { label: '지각(-1)', value: '지각 (-1)' },
  { label: '조퇴(-1)', value: '조퇴(-1)' },
  { label: '출석(1)', value: '출석 (1)' },
]

// 그리드 레이아웃 설정
export const GRID_CONFIG = {
  baseColumns: '100px 60px 70px',
  statsColumns: '50px 50px 50px 50px 50px 50px 50px 50px 50px 40px 40px 40px 40px 100px 100px 100px',
  dateColumnWidth: '90px',
}
