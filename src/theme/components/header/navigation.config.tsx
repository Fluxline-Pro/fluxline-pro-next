/**
 * Navigation Configuration
 * Defines the main navigation menu items for the application
 */

import { NavItem } from './navigation.types';

export const navItems: NavItem[] = [
  {
    label: 'home',
    path: '/',
    view: 'home',
    iconName: 'HomeSolid',
    description: 'Return to homepage',
  },
  {
    label: 'about',
    path: '/about',
    view: 'about',
    iconName: 'TextDocumentShared',
    description: 'Learn about Fluxline',
  },
  {
    label: 'services',
    path: '/services',
    view: 'services',
    iconName: 'ProductList',
    description: 'View our services',
  },
  {
    label: 'content',
    path: '/content',
    view: 'content',
    iconName: 'Documentation',
    description: 'Explore our blog, portfolio, and more',
    children: [
      {
        label: 'blog',
        path: '/blog',
        view: 'blog',
        iconName: 'TextDocumentShared',
        description: 'Insights and articles',
      },
      {
        label: 'portfolio',
        path: '/portfolio',
        view: 'portfolio',
        iconName: 'FolderList',
        description: 'Our work and projects',
      },
      {
        label: 'press releases',
        path: '/press-release',
        view: 'press-release',
        iconName: 'News',
        description: 'Latest announcements',
      },
      {
        label: 'case studies',
        path: '/case-studies',
        view: 'case-studies',
        iconName: 'ReadingMode',
        description: 'In-depth project analyses',
      },
    ],
  },
  {
    label: 'scrolls',
    path: '/services/scrolls',
    view: 'scrolls',
    iconName: 'DocumentSet',
    description: 'Explore strategic insights',
  },
  // {
  //   label: 'events',
  //   path: '/events',
  //   view: 'events',
  //   iconName: 'Calendar',
  //   description: 'Upcoming events',
  // },
  {
    label: 'contact',
    path: '/contact',
    view: 'contact',
    iconName: 'PublicContactCard',
    description: 'Get in touch',
  },
];
