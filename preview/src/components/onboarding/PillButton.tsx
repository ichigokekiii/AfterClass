type PillButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
};

export function PillButton({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
}: PillButtonProps) {
  return (
    <button
      type={type}
      className={`pill-button pill-button--${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}>
      {loading ? <span className="pill-button__spinner" aria-hidden /> : label}
    </button>
  );
}
