/**
 * SectionLabel — "01 / THE STREETS"
 * Small editorial uppercase label with a leading rule.
 * `variant` maps to a color accent (gold | ember | moon).
 */
export default function SectionLabel({ children, variant = 'gold', center = false }) {
  const classes = [
    'ed-label',
    center ? 'ed-label--center' : '',
    variant ? `ed-label--${variant}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} data-label>
      {children}
    </span>
  )
}