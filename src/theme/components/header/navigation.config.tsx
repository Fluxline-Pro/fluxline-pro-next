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
    label: 'scrolls',
    path: '/services/scrolls',
    view: 'scrolls',
    iconName: 'DocumentSet',
    description: 'Explore strategic insights',
  },
  // {
  //   label: 'portfolio',
  //   path: '/portfolio',
  //   view: 'portfolio',
  //   iconName: 'FolderQuery',
  //   description: 'View our work',
  // },
  // {
  //   label: 'blog',
  //   path: '/blog',
  //   view: 'blog',
  //   iconName: 'TextDocumentShared',
  //   description: 'Read our blog',
  // },
  {
    label: 'events',
    path: '/events',
    view: 'events',
    iconName: 'Calendar',
    description: 'Upcoming events',
  },
  {
    label: 'contact',
    path: '/contact',
    view: 'contact',
    iconName: 'PublicContactCard',
    description: 'Get in touch',
  },
];
