export type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    label: 'Overview',
    items: [{ href: '/dashboard', label: 'Dashboard', shortLabel: 'Home' }],
  },
  {
    label: 'Sales',
    items: [{ href: '/leads/contact-inquiries', label: 'Business Leads', shortLabel: 'Leads' }],
  },
  {
    label: 'Recruitment',
    items: [
      { href: '/recruitment/job-applications', label: 'Job Applications', shortLabel: 'Applications' },
      { href: '/recruitment/resume-bank', label: 'Talent Pool', shortLabel: 'Talent' },
      { href: '/recruitment/jobs', label: 'Open Roles', shortLabel: 'Roles' },
      { href: '/jobs/new', label: 'Create Role', shortLabel: 'New Role' },
    ],
  },
];

export const navItems = navSections.flatMap((section) => section.items);

export const mobileQuickNav = [
  navSections[0].items[0],
  navSections[1].items[0],
  navSections[2].items[0],
  navSections[2].items[1],
  navSections[2].items[2],
];
