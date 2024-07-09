import { ButtonHTMLAttributes } from 'react';

import { textStyle } from './styles';

interface ActiveGiftButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const ActiveGiftButton = ({
  label,
  isActive,
  onClick,
  ...props
}: ActiveGiftButtonProps) => {
  return (
    <button onClick={onClick} css={textStyle(isActive)} {...props}>
      {label}
    </button>
  );
};
