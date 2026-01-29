export interface College {
  name: string;
  type: string;
  students: string;
  highlight: string;
  image: string;
  website: string;
}


export const images = [
    "https://www.goerie.com/gcdn/authoring/authoring-images/2026/01/23/NETN/88318777007-p-2-coldwork-012326.jpg?crop=4904,2759,x0,y0&width=3200&height=1801&format=pjpg&auto=webp",
    "https://www.luxuryapartmentserie.com/wp-content/uploads/2017/06/070707-DIDmuseum-010.jpg",
    "https://images.squarespace-cdn.com/content/v1/64890c08b14f8044b088a7db/a908c826-d199-4289-ba8a-475d84f7afe4/NPR.jpg",
    "https://www.goerie.com/gcdn/authoring/2020/02/18/NETN/ghows-PA-3922dd5d-ffb8-4679-a672-82e5b1a86d31-e7dcc66b.jpeg?width=700&height=294&fit=crop&format=pjpg&auto=webp",
    "https://www.nwpapride.org/assets/img/erie-pride-parade.webp"
  ];

export const colleges: College[] = [
    { 
        name: "Gannon University", 
        type: "Private Catholic", 
        students: "4,600+", 
        highlight: "Engineering & Health",
        image: "https://pxl-gannonedu.terminalfour.net/fit-in/900x598/filters:quality(50)/filters:format(webp)/prod01/gannon/media/gannon-university/content-assets/images/campus/erie/arch/DuskCampus_20180326_0002.jpg",
        website: "https://www.gannon.edu"
    },
    { 
        name: "Penn State Behrend", 
        type: "Public Research", 
        students: "4,000+", 
        highlight: "Applied Sciences",
        image: "https://behrend.psu.edu/sites/behrend/files/bd-website-hero-summer-4-still.png",
        website: "https://behrend.psu.edu"
    },
    { 
        name: "Mercyhurst University", 
        type: "Private Catholic", 
        students: "3,000+", 
        highlight: "Intelligence Studies",
        image: "https://www.mercyhurst.edu/sites/default/files/styles/hero_home_page_huge/public/2023-10/guidetofinancialaid_web%20%281%29.jpg?h=cd3bb837&itok=Wyupbzlj",
        website: "https://www.mercyhurst.edu"
    },
    { 
        name: "Edinboro University", 
        type: "Public University", 
        students: "3,500+", 
        highlight: "Fine Arts & Education",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbWMJ_XspV3pu88RasR78nVzRMqvBzMP1nQ&s",
        website: "https://www.edinboro.edu"
    }
  ];
