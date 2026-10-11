import React from 'react';
import './Button.css';

/**
 * Reusable Button component implementing the Drape design system
 *
 * @param {'primary' | 'olive' | 'accent' | 'neutral' | 'tint-primary' | 'tint-accent' | 'outline' | 'ghost'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {'soft' | 'pill' | 'sm'} radius
 * @param {boolean} fullWidth
 * @param {React.ReactNode} iconLeft
 * @param {React.ReactNode} iconRight
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  radius = 'soft',
  fullWidth = false,
  iconLeft,
  iconRight,
  onClick,
  className = '',
  disabled = false,
  id,
  type = 'button',
  ...props
}) {
  const classes = [
    'drape-button',
    `btn-${variant}`,
    `btn-${size}`,
    `radius-${radius}`,
    fullWidth ? 'btn-full-width' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      id={id}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <span className="btn-icon btn-icon-left">{iconLeft}</span>}
      <span className="btn-text">{children}</span>
      {iconRight && <span className="btn-icon btn-icon-right">{iconRight}</span>}
    </button>
  );
}
