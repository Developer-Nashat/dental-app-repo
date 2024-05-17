const navItems = [
  { href: '/', active: false, label: 'Home', children: [], icon: null },
  {
    href: '#',
    active: false,
    label: 'الجانب الإداري',
    children: [
      {
        href: '#',
        active: false,
        label: 'الإدخالات',
        children: [
          {
            href: '/problems',
            active: false,
            label: 'تصنيف المشاكل',
            children: [],
            icon: 'problem'
          },
          {
            href: '/treatments',
            active: false,
            label: 'تصنيف العلاجات',
            children: [],
            icon: 'treatment'
          }
        ],
        icon: 'mainEntry'
      }
    ],
    icon: null
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
        icon: null
      }
    ],
    icon: null
  }
]

export default navItems
