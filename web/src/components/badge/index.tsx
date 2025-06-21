import { Badge } from '@chakra-ui/react'

type BadgeProps = {
  result: string
}

const BADGE_STYLES: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  Benigno: {
    bg: 'badgeBenign',
    color: 'success',
    border: '1px solid #48bb78',
  },
  Maligno: {
    bg: 'badgeMalignant',
    color: 'error',
    border: '1px solid #e53e3e',
  },
}

export const ResultBadge = ({ result }: BadgeProps) => {
  const { bg, color, border } = BADGE_STYLES[result] || BADGE_STYLES.Maligno
  return (
    <Badge fontSize="1rem" p="0.25rem" bg={bg} color={color} border={border}>
      {result}
    </Badge>
  )
}
