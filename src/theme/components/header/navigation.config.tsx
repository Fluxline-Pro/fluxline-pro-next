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
    description: 'Explore video, podcasts, and more',
    children: [
      {
        label: 'video',
        path: '/video',
        view: 'video',
        iconName: 'Video',
        description: 'Videos from YouTube',
      },
      {
        label: 'podcasts',
        path: '/podcasts',
        view: 'podcasts',
        iconName: 'Microphone',
        description: 'A+ In FLUX Mythmaker podcast',
      },
      {
        label: 'my content',
        path: '/content',
        view: 'content',
        iconName: 'Documentation',
        description: 'All content hub',
      },
      {
        label: 'books',
        path: '/books',
        view: 'books',
        iconName: 'BookAnswers',
        description: 'Browse our published books',
      },
      {
        label: 'github',
        path: '/github',
        view: 'github',
        iconName: 'BranchMerge',
        description: 'Open-source repositories',
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
    label: 'contact us',
    path: '/contact',
    view: 'contact',
    iconName: 'PublicContactCard',
    description: 'Get in touch',
  },
];
