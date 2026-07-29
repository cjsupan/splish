import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label:    string;
  variant?: Variant;
  loading?: boolean;
  size?:    'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const CONTAINER: Record<Variant, string> = {
  primary:   'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-surface border-2 border-primary-500 active:bg-primary-50',
  ghost:     'bg-transparent active:bg-muted',
  danger:    'bg-error active:bg-red-700',
};

const LABEL: Record<Variant, string> = {
  primary:   'text-white',
  secondary: 'text-primary-500',
  ghost:     'text-ink',
  danger:    'text-white',
};

const SIZE_CONTAINER: Record<string, string> = {
  sm: 'py-2.5 px-4 rounded-xl',
  md: 'py-3.5 px-6 rounded-2xl',
  lg: 'py-4 px-8 rounded-2xl',
};

const SIZE_TEXT: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  label,
  variant    = 'primary',
  loading    = false,
  size       = 'md',
  fullWidth  = true,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      className={[
        'flex-row items-center justify-center gap-2',
        CONTAINER[variant],
        SIZE_CONTAINER[size],
        fullWidth ? 'w-full' : 'self-start',
        isDisabled ? 'opacity-50' : '',
      ].join(' ')}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? '#fff' : '#0EA5DC'}
        />
      )}
      <Text
        className={[
          'font-semibold text-center',
          LABEL[variant],
          SIZE_TEXT[size],
        ].join(' ')}
      >
        {label}
      </Text>
    </Pressable>
  );
}
