import { Tooltip } from './Tooltip'

interface MovieCardProps {
  name: string
  description: string
  link: string
}

export default function MovieCard({ name, description, link }: MovieCardProps) {
  return (
    <Tooltip message={description}>
      <div className=" cursor-pointer bg-foreground overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 hover:border-base">
        <img src={link} alt="" />
        <div className="p-3">
          <div className="text-sm text-base">{name}</div>
        </div>
      </div>
    </Tooltip>
  )
}
