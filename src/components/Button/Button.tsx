'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'filter' | 'switcher';
  className?: string;
  fullWidth?: boolean;
  value?: 'list' | 'kanban';
  onSwitchChange?: (value: 'list' | 'kanban') => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  children,
  variant = 'primary',
  className,
  fullWidth,
  value,
  onSwitchChange,
  ...rest
}: Props) => {
  const classNames = {
    base: 'flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] w-[170px] text-sm font-medium transition shadow-md cursor-pointer',
    fullWidth: 'w-full',
    variants: {
      primary:
        'border border-transparent bg-primary text-basicText hover:bg-primaryHover',
      secondary:
        'border border-primary bg-basicText text-primary hover:bg-primary hover:text-basicText',
      filter: 'border border-greyMedium bg-basicText text-greyMedium',
    },
    switcher: {
      wrapper:
        'flex rounded-[10px] overflow-hidden border border-primary w-[170px]',
      buttonBase:
        'px-4 py-2 text-sm font-medium transition w-[85px] cursor-pointer',
      active: 'bg-primary text-basicText',
      inactive: 'bg-basicText text-primary',
      getButtonClass: (isActive: boolean) =>
        clsx(
          classNames.switcher.buttonBase,
          isActive ? classNames.switcher.active : classNames.switcher.inactive
        ),
    },
  };

  const variantClass =
    variant === 'primary' || variant === 'secondary' || variant === 'filter'
      ? classNames.variants[variant]
      : '';

  const buttonStyles = clsx(
    classNames.base,
    variantClass,
    className,
    fullWidth && classNames.fullWidth
  );

  if (variant === 'switcher') {
    const active = value ?? 'list';

    const handleClick = (val: 'list' | 'kanban') => {
      if (val !== active) {
        onSwitchChange?.(val);
      }
    };

    const listButtonStyles = classNames.switcher.getButtonClass(
      active === 'list'
    );

    const canbanButtonStyles = classNames.switcher.getButtonClass(
      active === 'kanban'
    );

    return (
      <div className={classNames.switcher.wrapper}>
        <button
          className={listButtonStyles}
          onClick={() => handleClick('list')}
        >
          Список
        </button>
        <button
          className={canbanButtonStyles}
          onClick={() => handleClick('kanban')}
        >
          Канбан
        </button>
      </div>
    );
  }

  return (
    <button className={buttonStyles} {...rest}>
      {children}
    </button>
  );
};
