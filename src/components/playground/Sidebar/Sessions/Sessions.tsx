'use client'

import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { usePlaygroundStore } from '@/store'
import { useQueryState } from 'nuqs'
import SessionItem from './SessionItem'
import SessionBlankState from './SessionBlankState'
import useSessionLoader from '@/hooks/useSessionLoader'

import { cn } from '@/lib/utils'
import { FC } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonListProps {
  skeletonCount: number
}

const SkeletonList: FC<SkeletonListProps> = ({ skeletonCount }) => {
  const skeletons = useMemo(
    () => Array.from({ length: skeletonCount }, (_, i) => i),
    [skeletonCount]
  )

  return skeletons.map((skeleton, index) => (
    <Skeleton
      key={skeleton}
      className={cn('mb-1 h-11 rounded px-3 py-2', index > 0 && 'bg-accent')}
    />
  ))
}

dayjs.extend(utc)

const formatDate = (
  timestamp: number,
  format: 'natural' | 'full' = 'full'
): string => {
  const date = dayjs.unix(timestamp).utc()
  return format === 'natural'
    ? date.format('HH:mm')
    : date.format('YYYY-MM-DD HH:mm:ss')
}

const Sessions = () => {
  const [agentId] = useQueryState('agent', {
    parse: (value) => value || undefined,
    history: 'push'
  })
  const [sessionId] = useQueryState('session')
  const { isEndpointLoading, sessionsData, hydrated, setSessionsData } =
    usePlaygroundStore()
  const [isScrolling, setIsScrolling] = useState(false)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  )
  const { getSession, getSessions } = useSessionLoader()
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const { isSessionsLoading } = usePlaygroundStore()

  const handleScroll = () => {
    setIsScrolling(true)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 1500)
  }

  // Cleanup the scroll timeout when component unmounts
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Load a session on render if a session id exists in url
  useEffect(() => {
    if (sessionId && hydrated) {
      getSession(sessionId, agentId || 'default')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  useEffect(() => {
    if (!isEndpointLoading) {
      setSessionsData(() => null)
      getSessions(agentId || 'default')
    }
  }, [getSessions, isEndpointLoading, setSessionsData, agentId])

  useEffect(() => {
    if (sessionId) {
      setSelectedSessionId(sessionId)
    }
  }, [sessionId])

  const formattedSessionsData = useMemo(() => {
    if (!sessionsData || !Array.isArray(sessionsData)) return []

    return sessionsData.map((entry) => ({
      ...entry,
      created_at: entry.created_at,
      formatted_time: formatDate(entry.created_at, 'natural')
    }))
  }, [sessionsData])

  const handleSessionClick = useCallback(
    (id: string) => () => setSelectedSessionId(id),
    []
  )

  if (isSessionsLoading || isEndpointLoading)
    return (
      <div className="w-full">
        <div className="mb-3 text-sm font-semibold text-gray-900">
          Lịch sử tư vấn
        </div>
        <div className="mt-4 h-[calc(100vh-280px)] w-full overflow-y-auto">
          <SkeletonList skeletonCount={5} />
        </div>
      </div>
    )
  return (
    <div className="w-full">
      <div className="mb-3 w-full text-sm font-semibold text-gray-900">
        Lịch sử tư vấn
      </div>
      <div
        className={`h-[calc(100vh-280px)] overflow-y-auto font-inter transition-all duration-300 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:transition-opacity [&::-webkit-scrollbar]:duration-300 ${isScrolling ? '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:opacity-0' : '[&::-webkit-scrollbar]:opacity-100'}`}
        onScroll={handleScroll}
        onMouseOver={() => setIsScrolling(true)}
        onMouseLeave={handleScroll}
      >
        {!isSessionsLoading && (!sessionsData || sessionsData.length === 0) ? (
          <SessionBlankState />
        ) : (
          <div className="flex flex-col gap-y-1 pr-1">
            {formattedSessionsData.map((entry, index) => (
              <SessionItem
                key={`${entry.session_id}-${index}`}
                {...entry}
                isSelected={selectedSessionId === entry.session_id}
                onSessionClick={handleSessionClick(entry.session_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sessions
