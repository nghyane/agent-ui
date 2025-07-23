import React from 'react'

const SessionBlankState = () => {
  return (
    <div className="mt-4 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50/50 py-8">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-sm font-medium text-gray-900">
            Chưa có lịch sử tư vấn
          </h3>
          <p className="max-w-[200px] text-center text-xs text-gray-500">
            Bắt đầu cuộc trò chuyện để tạo lịch sử tư vấn đầu tiên
          </p>
        </div>
      </div>
    </div>
  )
}

export default SessionBlankState
