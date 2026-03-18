'use client';

import React from 'react';
import {
    AcademicCapIcon,
    AdjustmentsHorizontalIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowTopRightOnSquareIcon,
    BeakerIcon,
    BookOpenIcon,
    BoltIcon,
    BriefcaseIcon,
    BuildingLibraryIcon,
    BuildingOffice2Icon,
    ChartBarIcon,
    ChartBarSquareIcon,
    CheckCircleIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CircleStackIcon,
    ClipboardDocumentIcon,
    ClockIcon,
    CloudIcon,
    CodeBracketIcon,
    CodeBracketSquareIcon,
    CpuChipIcon,
    CurrencyRupeeIcon,
    DevicePhoneMobileIcon,
    DocumentArrowUpIcon,
    DocumentCheckIcon,
    EnvelopeIcon,
    ExclamationCircleIcon,
    GlobeAltIcon,
    HeartIcon,
    HomeIcon,
    InformationCircleIcon,
    LightBulbIcon,
    ListBulletIcon,
    MagnifyingGlassIcon,
    MapIcon,
    MapPinIcon,
    PaperAirplaneIcon,
    PaintBrushIcon,
    PencilSquareIcon,
    PhoneIcon,
    QuestionMarkCircleIcon,
    RocketLaunchIcon,
    ServerStackIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon,
    UsersIcon,
    WindowIcon,
    WrenchScrewdriverIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

type IconVariant = 'outline' | 'solid';

interface IconProps {
    name: string; // Changed to string to accept dynamic values
    variant?: IconVariant;
    size?: number;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    [key: string]: any;
}

const OUTLINE_ICONS = {
    AcademicCapIcon,
    AdjustmentsHorizontalIcon,
    AirplaneIcon: PaperAirplaneIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowTopRightOnSquareIcon,
    BeakerIcon,
    BookOpenIcon,
    BoltIcon,
    BriefcaseIcon,
    BuildingLibraryIcon,
    BuildingOffice2Icon,
    ChartBarIcon,
    ChartBarSquareIcon,
    CheckCircleIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CircleStackIcon,
    ClipboardDocumentIcon,
    ClockIcon,
    CloudIcon,
    CodeBracketIcon,
    CodeBracketSquareIcon,
    CpuChipIcon,
    CurrencyRupeeIcon,
    DevicePhoneMobileIcon,
    DocumentArrowUpIcon,
    DocumentCheckIcon,
    EnvelopeIcon,
    ExclamationCircleIcon,
    GlobeAltIcon,
    HeartIcon,
    HomeIcon,
    InformationCircleIcon,
    LightBulbIcon,
    ListBulletIcon,
    MagnifyingGlassIcon,
    MapIcon,
    MapPinIcon,
    PaperAirplaneIcon,
    PaintBrushIcon,
    PencilSquareIcon,
    PhoneIcon,
    QuestionMarkCircleIcon,
    RocketLaunchIcon,
    ServerStackIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon,
    UsersIcon,
    WindowIcon,
    WrenchScrewdriverIcon,
    XMarkIcon,
} as const;

const SOLID_ICONS = {
    StarIcon: StarIconSolid,
} as const;

function Icon({
    name,
    variant = 'outline',
    size = 24,
    className = '',
    onClick,
    disabled = false,
    ...props
}: IconProps) {
    const iconSet = variant === 'solid' ? SOLID_ICONS : OUTLINE_ICONS;
    const IconComponent = iconSet[name as keyof typeof iconSet] as React.ComponentType<any>;

    if (!IconComponent) {
        return (
            <QuestionMarkCircleIcon
                width={size}
                height={size}
                className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                onClick={disabled ? undefined : onClick}
                {...props}
            />
        );
    }

    return (
        <IconComponent
            width={size}
            height={size}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
            onClick={disabled ? undefined : onClick}
            {...props}
        />
    );
}

export default Icon; 
