import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectChannelProps {
  onKey: (value: string) => void
  value: string
}

export function SelectChannel({ onKey, value }: SelectChannelProps) {
  return (
    <Select value={value} onValueChange={onKey}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Todos os canais" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Canais</SelectLabel>
          <SelectItem value="all">Todos os canais</SelectItem>
          <SelectItem value="wpp">WhatsApp</SelectItem>
          <SelectItem value="mobile">Mobile</SelectItem>
          <SelectItem value="email">Email</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
