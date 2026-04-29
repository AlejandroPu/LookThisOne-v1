/**
 * BrandName — official typographic rule for LookThis.One
 *
 * 2-colour system:
 *   Uppercase + dot (L, T, ., O) → brand colour
 *   Lowercase (ook, his, ne)     → context colour via baseClass
 *
 * Never use inside `text-transform: uppercase/lowercase` — the component
 * forces `normal-case` to prevent LOOKTHIS.ONE / lookthis.one.
 */
type Props = {
  /** Tailwind class for the lowercase letter colour */
  baseClass?: string;
};

export default function BrandName({ baseClass = '' }: Props) {
  return (
    <span className="normal-case">
      <span className="text-brand">L</span>
      <span className={baseClass}>ook</span>
      <span className="text-brand">T</span>
      <span className={baseClass}>his</span>
      <span className="text-brand">.</span>
      <span className="text-brand">O</span>
      <span className={baseClass}>ne</span>
    </span>
  );
}
