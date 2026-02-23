import React from 'react';
import {
  siReact,
  siNodedotjs,
  siNextdotjs,
  siPython,
  siFlutter,
  siAndroid,
  siApple,
  siGooglecloud,
  siKubernetes,
  siDocker,
  siTerraform,
} from 'simple-icons';

export type BrandName =
  | 'aws'
  | 'google-cloud'
  | 'microsoft-azure'
  | 'kubernetes'
  | 'docker'
  | 'terraform'
  | 'react'
  | 'nodejs'
  | 'nextjs'
  | 'python'
  | 'flutter'
  | 'android'
  | 'ios';

const SIMPLE_ICONS = {
  react: siReact,
  nodejs: siNodedotjs,
  nextjs: siNextdotjs,
  python: siPython,
  flutter: siFlutter,
  android: siAndroid,
  ios: siApple,
  'google-cloud': siGooglecloud,
  kubernetes: siKubernetes,
  docker: siDocker,
  terraform: siTerraform,
} as const;

const IMAGE_ICONS: Partial<Record<BrandName, string>> = {
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'microsoft-azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
};

interface BrandIconProps {
  name: BrandName;
  size?: number;
  className?: string;
}

export function resolveBrandName(label: string): BrandName | null {
  const key = label.trim().toLowerCase();
  const aliases: Record<string, BrandName> = {
    aws: 'aws',
    'google cloud': 'google-cloud',
    gcp: 'google-cloud',
    azure: 'microsoft-azure',
    'microsoft azure': 'microsoft-azure',
    kubernetes: 'kubernetes',
    docker: 'docker',
    terraform: 'terraform',
    react: 'react',
    'react.js': 'react',
    'react native': 'react',
    node: 'nodejs',
    'node.js': 'nodejs',
    next: 'nextjs',
    'next.js': 'nextjs',
    python: 'python',
    flutter: 'flutter',
    android: 'android',
    ios: 'ios',
    'ios app development': 'ios',
    'android app development': 'android',
  };
  return aliases[key] ?? null;
}

export default function BrandIcon({ name, size = 16, className = '' }: BrandIconProps) {
  const imageIcon = IMAGE_ICONS[name];
  if (imageIcon) {
    return (
      <img
        src={imageIcon}
        alt={name}
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain' }}
      />
    );
  }

  const icon = SIMPLE_ICONS[name as keyof typeof SIMPLE_ICONS];
  if (!icon) return null;

  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
}
