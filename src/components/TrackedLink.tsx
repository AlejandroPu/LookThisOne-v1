'use client';

interface Props {
  href: string;
  linkId: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TrackedLink({
  href,
  linkId,
  children,
  className,
  style,
}: Props) {
  function track() {
    const data = new FormData();
    data.append('linkId', linkId);
    navigator.sendBeacon('/api/track/click', data);
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={track}
    >
      {children}
    </a>
  );
}
