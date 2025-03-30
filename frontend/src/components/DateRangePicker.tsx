'use client'
import { DateRange, DayPicker } from 'react-day-picker'
import { format, parse, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import 'react-day-picker/style.css'
import { Input } from '@/components/ui/input'
import React from 'react'

interface DateRangePickerProps {
  selectedRange?: DateRange
  onSelect: (range: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({
  selectedRange,
  onSelect,
  className,
}: DateRangePickerProps) {
  const [inputStart, setInputStart] = React.useState<string>(
    selectedRange?.from ? format(selectedRange.from, 'dd/MM/yyyy') : '',
  )
  const [inputEnd, setInputEnd] = React.useState<string>(
    selectedRange?.to ? format(selectedRange.to, 'dd/MM/yyyy') : '',
  )
  const [tempStart, setTempStart] = React.useState<string>(inputStart)
  const [tempEnd, setTempEnd] = React.useState<string>(inputEnd)

  // Atualiza os inputs quando o selectedRange muda
  React.useEffect(() => {
    setInputStart(
      selectedRange?.from ? format(selectedRange.from, 'dd/MM/yyyy') : '',
    )
    setInputEnd(selectedRange?.to ? format(selectedRange.to, 'dd/MM/yyyy') : '')
    setTempStart(
      selectedRange?.from ? format(selectedRange.from, 'dd/MM/yyyy') : '',
    )
    setTempEnd(selectedRange?.to ? format(selectedRange.to, 'dd/MM/yyyy') : '')
  }, [selectedRange])

  const handleApplyDates = () => {
    try {
      let fromDate: Date | undefined
      let toDate: Date | undefined

      if (tempStart) {
        const parsedStart = parse(tempStart, 'dd/MM/yyyy', new Date())
        if (isValid(parsedStart)) {
          fromDate = parsedStart
        }
      }

      if (tempEnd) {
        const parsedEnd = parse(tempEnd, 'dd/MM/yyyy', new Date())
        if (isValid(parsedEnd)) {
          toDate = parsedEnd
        }
      }

      if (fromDate || toDate) {
        onSelect({ from: fromDate, to: toDate })
      }
    } catch (error) {
      console.error('Erro ao aplicar datas', error)
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !selectedRange?.from && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedRange?.from ? (
              selectedRange.to ? (
                <>
                  {format(selectedRange.from, 'dd/MM/yyyy', { locale: ptBR })} -{' '}
                  {format(selectedRange.to, 'dd/MM/yyyy', { locale: ptBR })}
                </>
              ) : (
                format(selectedRange.from, 'dd/MM/yyyy', { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex gap-2 justify-center items-center p-2">
            <Input
              placeholder="dd/mm/aaaa"
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
              className="w-32"
            />
            <span>até</span>
            <Input
              placeholder="dd/mm/aaaa"
              value={tempEnd}
              onChange={(e) => setTempEnd(e.target.value)}
              className="w-32"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleApplyDates}
              disabled={!tempStart && !tempEnd}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <DayPicker
            animate
            mode="range"
            defaultMonth={selectedRange?.from}
            selected={selectedRange}
            onSelect={onSelect}
            locale={ptBR}
            className="rounded-md border gap-1 p-4"
            weekStartsOn={0}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
