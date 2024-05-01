const navItems = [
  { href: '/', active: false, label: 'Home', children: [], icon: 'HomeIcon' },
  {
    href: '#',
    active: false,
    label: 'Posts',
    children: [
      { href: '/about', active: false, label: 'All Posts', children: [], icon: null },
      { href: '/problems', active: false, label: 'Add New', children: [], icon: null },
      { href: '#', active: false, label: 'Categories', children: [], icon: null }
    ],
    icon: 'NewspaperIcon'
  },
  {
    href: '#',
    active: false,
    label: 'Media',
    children: [
      { href: '/Library', active: false, label: 'Library', children: [], icon: null },
      {
        href: '#',
        active: false,
        label: 'Add New',
        children: [{ href: '/add', active: true, label: 'Third Level', children: [], icon: null }],
        icon: 'HomeIcon'
      }
    ],
    icon: 'PhotoIcon'
  }
]

export default navItems
