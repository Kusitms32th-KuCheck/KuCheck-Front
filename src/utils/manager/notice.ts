// 카테고리 타입 정의
export interface Category {
  id: string
  name: string
  color: string
}

// 색상 옵션 정의
export const COLOR_OPTIONS = [
  { value: '', tailwind: '', circle: 'bg-[#D4DFFF] border-[#94AEFF]', nameKr: '색상' },
  { value: 'brown', tailwind: 'bg-[#FFF4EE] text-[#9F5816]', circle: 'bg-[#FFF4EE] border-[#9F5816]', nameKr: '갈색' },
  { value: 'green', tailwind: 'bg-[#E2F9E7] text-[#14712B]', circle: 'bg-[#E2F9E7] border-[#14712B]', nameKr: '초록' },
  { value: 'purple', tailwind: 'bg-[#EFEAFF] text-[#6B42E0]', circle: 'bg-[#EFEAFF] border-[#6B42E0]', nameKr: '보라' },
  { value: 'blue', tailwind: 'bg-[#E5F3FE] text-[#467BE3]', circle: 'bg-[#E5F3FE] border-[#467BE3]', nameKr: '파랑' },
  { value: 'yellow', tailwind: 'bg-[#FCF5D8] text-[#995629]', circle: 'bg-[#FCF5D8] border-[#995629]', nameKr: '노랑' },
  { value: 'red', tailwind: 'bg-[#FDEFEC] text-[#B4493E]', circle: 'bg-[#FDEFEC] border-[#B4493E]', nameKr: '빨강' },
  { value: 'cyan', tailwind: 'bg-[#E5FEFC] text-[#00B9B0]', circle: 'bg-[#E5FEFC] border-[#00B9B0]', nameKr: '청록' },
  { value: 'pink', tailwind: 'bg-[#FEE5FE] text-[#F45AD5]', circle: 'bg-[#FEE5FE] border-[#F45AD5]', nameKr: '분홍' },
  { value: 'orange', tailwind: 'bg-[#FFF4EE] text-[#FF9C49]', circle: 'bg-[#FFF4EE] border-[#FF9C49]', nameKr: '주황' },
  { value: 'lime', tailwind: 'bg-[#F8FFE6] text-[#29A051]', circle: 'bg-[#F8FFE6] border-[#29A051]', nameKr: '연두' },
]

// 카테고리 관련 상수
export const MAX_CATEGORIES = 7
export const MAX_CATEGORY_LENGTH = 7
export const DEFAULT_COLOR = ''

// 카테고리 색상 클래스 가져오기
export const getCategoryColorClasses = (color: string): string => {
  const option = COLOR_OPTIONS.find((c) => c.value === color)
  return option ? option.tailwind : COLOR_OPTIONS[0].tailwind
}

// 카테고리 유효성 검증
export const validateCategoryName = (name: string, existingCategories: Category[], excludeId?: string): string => {
  const trimmedName = name.trim()

  if (existingCategories.length >= MAX_CATEGORIES) {
    return `최대 ${MAX_CATEGORIES}개까지 등록할 수 있어요`
  }

  if (trimmedName.length > MAX_CATEGORY_LENGTH) {
    return `최대 ${MAX_CATEGORY_LENGTH}자까지 등록할 수 있어요`
  }

  if (!trimmedName) {
    return '카테고리 이름을 입력해주세요'
  }

  const isDuplicate = existingCategories.some(
    (category) => category.id !== excludeId && category.name.toLowerCase() === trimmedName.toLowerCase()
  )

  if (isDuplicate) {
    return '이미 같은 이름의 카테고리가 있어요'
  }

  return ''
}

// 카테고리 ID 생성
export const generateCategoryId = (categories: Category[]): string => {
  return (categories.length + 1).toString()
}

// 색상 드롭다운용 옵션 생성 (JSX 제외한 데이터만)
export const createColorDropdownData = () => {
  return COLOR_OPTIONS.map((option) => ({
    label: option.nameKr,
    value: option.value,
    circleClass: option.circle,
  }))
}

// 카테고리 CRUD 헬퍼 함수들
export const categoryHelpers = {
  // 카테고리 추가
  addCategory: (categories: Category[], newCategory: Omit<Category, 'id'>): Category[] => {
    const newId = generateCategoryId(categories)
    return [...categories, { ...newCategory, id: newId }]
  },

  // 카테고리 삭제
  deleteCategory: (categories: Category[], categoryId: string): Category[] => {
    return categories.filter((cat) => cat.id !== categoryId)
  },

  // 카테고리 수정
  editCategory: (categories: Category[], categoryId: string, updatedCategory: Omit<Category, 'id'>): Category[] => {
    return categories.map((cat) => (cat.id === categoryId ? { ...cat, ...updatedCategory } : cat))
  },

  // 카테고리 찾기
  findCategory: (categories: Category[], categoryId: string): Category | undefined => {
    return categories.find((cat) => cat.id === categoryId)
  },
}
