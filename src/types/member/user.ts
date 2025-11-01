import { PartType } from '@/types/common'

export interface UserSummaryType {
  name: string | undefined
  part: PartType | undefined
  totalPoints: number | undefined
  profileImage: string | undefined
}
