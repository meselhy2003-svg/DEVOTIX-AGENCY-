import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, Twitter, Youtube, Facebook, MessageCircle, Send } from 'lucide-react';
import { getSocialLinks } from '../data/socialLinks';

export default function SocialIconsGroup({
  className = '',
  itemClassName = '',
  showAll = false,
  size = 'md' // 'sm' | 'md' | 'lg'
}) {
  const [links, setLinks] = useState(getSocialLinks());

  useEffect(() => {
    const handleUpdate = () => {
      setLinks(getSocialLinks());
    };
    window.addEventListener('devotix_social_links_updated', handleUpdate);
    return () => window.removeEventListener('devotix_social_links_updated', handleUpdate);
  }, []);

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  }[size] || 'w-8 h-8 text-sm';

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size] || 'w-4 h-4';

  const defaultItems = [
    {
      key: 'instagram',
      name: 'Instagram',
      href: links.instagram,
      icon: <Instagram className={iconSizes} />,
      hoverClass: 'hover:bg-[#E1306C] hover:text-white'
    },
    {
      key: 'facebook',
      name: 'Facebook',
      href: links.facebook,
      icon: <Facebook className={iconSizes} />,
      hoverClass: 'hover:bg-[#1877F2] hover:text-white'
    },
    {
      key: 'youtube',
      name: 'YouTube',
      href: links.youtube,
      icon: <Youtube className={iconSizes} />,
      hoverClass: 'hover:bg-[#FF0000] hover:text-white'
    }
  ];

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {defaultItems.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className={`${sizeClasses} rounded-full bg-neutral-100 dark:bg-[#121218] text-neutral-700 dark:text-neutral-300 flex items-center justify-center transition-all duration-300 shadow-sm border border-neutral-200/80 dark:border-white/10 hover:scale-110 active:scale-95 ${item.hoverClass} ${itemClassName}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
