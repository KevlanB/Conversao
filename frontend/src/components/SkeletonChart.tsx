'use client'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonChart() {
  return (
    <div className="w-full h-[400px] space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[150px]" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
      <Skeleton className="w-full h-[300px]" />
    </div>
  )
}
