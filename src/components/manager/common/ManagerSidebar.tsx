import React from 'react'
import Link from 'next/link'
import {
  ManagerOnIcon,
  AttendanceIcon,
  AttendanceOnIcon,
  DocumentIcon,
  DocumentOnIcon,
  ManagerIcon,
  MemberIcon,
  MemberOnIcon,
  NoticeIcon,
  NoticeOnIcon,
  PointIcon,
  PointOnIcon,
  ScheduleIcon,
  ScheduleOnIcon,
} from '@/assets/svgComponents/manager'

const managerSidebarItems = [
  {
    title: '출석체크',
    href: '/attendance',
    icon: AttendanceIcon,
    activeIcon: AttendanceOnIcon,
  },
  {
    title: '상벌점 조회',
    href: '/point',
    icon: PointIcon,
    activeIcon: PointOnIcon,
  },
  {
    title: '공지 등록',
    href: '/create-notice',
    icon: NoticeIcon,
    activeIcon: NoticeOnIcon,
  },
  {
    title: '세션 일정',
    href: '/session-schedule',
    icon: ScheduleIcon,
    activeIcon: ScheduleOnIcon,
  },
  {
    title: '큐픽 서류 확인',
    href: '/check-document',
    icon: DocumentIcon,
    activeIcon: DocumentOnIcon,
  },
  {
    title: '학회원 관리',
    href: '/member-management',
    icon: MemberIcon,
    activeIcon: MemberOnIcon,
  },
  {
    title: '운영진 관리',
    href: '/staff-management',
    icon: ManagerIcon,
    activeIcon: ManagerOnIcon,
  },
]

interface ManagerSidebarProps {
  currentPath?: string
}

export default function ManagerSidebar({ currentPath }: ManagerSidebarProps) {
  return (
    <aside className="w-[240px] bg-white p-[24px] shadow-lg">
      <nav className="h-[52px] w-[192px]">
        {managerSidebarItems.map((item) => {
          const isActive = currentPath === item.href
          const IconComponent = isActive ? item.activeIcon : item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-[8px] rounded-[8px] px-[12px] py-[14px] transition-colors ${
                isActive ? 'bg-primary-50 text-primary-500' : 'text-gray-500'
              }`}
            >
              <IconComponent width={16} height={16} />
              <p className="body-md-semibold">{item.title}</p>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
