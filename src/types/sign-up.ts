export interface SignUpDataType {
  name?: string
  school?: string
  major?: string
  part?: PartType
  phoneNumber?: string
}
export type PartType = 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLANNING'
