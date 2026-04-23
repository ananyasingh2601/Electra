// src/components/ui/Button.jsx
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  icon,
  disabled = false,
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-electra-500 to-electra-600 hover:from-electra-400 hover:to-electra-500 text-white shadow-lg shadow-electra-500/25',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    ghost: 'hover:bg-white/10 text-white/70 hover:text-white',
    danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30',
    success: 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium 
        transition-all duration-200 backdrop-blur-sm
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
}
