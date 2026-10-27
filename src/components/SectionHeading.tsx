export default function SectionHeading({
  subheading,
  title,
  intro,
  align = 'center',
  light = false,
}: {
  subheading: string
  title: string
  intro?: string
  align?: 'center' | 'left'
  light?: boolean
}) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <span className="subheading">{subheading}</span>
      <h2
        className={`mt-2 text-2xl sm:text-3xl lg:text-4xl ${
          light ? 'text-white' : 'text-black/80'
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-sm sm:text-base ${light ? 'text-white/80' : 'text-gray-600'}`}>
          {intro}
        </p>
      ) : null}
    </div>
  )
}
