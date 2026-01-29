interface SubMenu {
  label: string;
  to: string;
}

interface Menu {
  label: string;
  to?: string;
  subItems?: SubMenu[];
}

export const navItems: Menu[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Live',
    subItems: [
      { label: 'Events & Activities Right Now', to: '/events' },
      { label: 'Housing/Rent near me', to: '/housing' },
      { label: 'Hike & Trails', to: '/hikes' },
      { label : "Student Life", to : '/students'}
    ]
  },
  {
    label: 'Work',
    subItems: [
      { label: 'Jobs', to: '/jobs' },
      { label : 'Internships & Volunteer', to : '/internships'}
    ]
  }
];


