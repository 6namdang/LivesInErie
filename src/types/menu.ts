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
      {label : 'Companies Directory', to : '/community'},
      { label: 'Events', to: '/events' },
      { label: 'Housing', to: '/housing' },
      { label: 'Hike & Trails', to: '/hikes' },
      { label : "Student Life", to : '/students'}
    ]
  },
  {
    label : 'Startup',
    subItems : [
      {label : "Create a startup", to : '/startup'}
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


