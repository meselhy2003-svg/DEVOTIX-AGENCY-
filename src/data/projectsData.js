export const SOFTWARE_PROJECTS = [
  {
    id: 'car-hub',
    title: 'CAR HUB',
    category: 'AUTOMOTIVE PLATFORM & DIGITAL DEALERSHIP',
    description: 'High-performance luxury automotive web application & interactive car dealership platform featuring 360-degree vehicle showcases and real-time inventory management.',
    image: '/assets/projects/car-hub/cover.png',
    logo: '/assets/projects/car-hub/logo.png',
    shot: '/assets/projects/car-hub/shot.jpg',
    tags: ['React', 'Automotive', 'Web App'],
    status: 'COMPLETED',
    subtitle: 'Interactive automotive dealership portal with live inventory streaming and luxury vehicle showcase.',
    problem: 'Traditional automotive dealership platforms lacked interactive visual engagement and mobile responsiveness, slowing down customer inquiry conversion rates.',
    solution: 'Engineered a high-performance web platform featuring 360-degree interactive vehicle showcases, direct test-drive booking engine, and instant lead management.',
    details: 'A custom software solution built for automotive sales and inventory management. Designed to provide instant load speeds, responsive mobile browsing, and intuitive UI for vehicle inquiries.',
    link: 'https://carhub.devotix.io'
  },
  {
    id: 'aselectric',
    title: 'ASELECTRIC',
    category: 'AUTOMOTIVE PLATFORM & DIGITAL DEALERSHIP',
    description: 'High-performance luxury automotive web application & interactive car dealership platform featuring 360-degree vehicle showcases and real-time inventory management.',
    image: '/assets/projects/aselectric/cover.png',
    logo: '/assets/projects/aselectric/logo.png',
    shot: '/assets/projects/aselectric/shot.jpg',
    tags: ['React', 'Automotive', 'Web App'],
    status: 'COMPLETED',
    subtitle: 'Interactive automotive dealership portal with live inventory streaming and luxury vehicle showcase.',
    problem: 'Traditional automotive dealership platforms lacked interactive visual engagement and mobile responsiveness, slowing down customer inquiry conversion rates.',
    solution: 'Engineered a high-performance web platform featuring 360-degree interactive vehicle showcases, direct test-drive booking engine, and instant lead management.',
    details: 'A custom software solution built for automotive sales and inventory management. Designed to provide instant load speeds, responsive mobile browsing, and intuitive UI for vehicle inquiries.',
    link: 'https://aselectriceg.org/ar'
  },
  {
    id: 'egy-color',
    title: 'EGY COLOR',
    category: 'COLOR & COATINGS E-COMMERCE PLATFORM',
    description: 'Industrial paint, color solutions platform, and digital architectural coating customization system.',
    image: '/assets/projects/egy-color/cover.jpg',
    logo: '/assets/projects/egy-color/logo.png',
    shot: '/assets/projects/egy-color/shot.png',
    tags: ['E-Commerce', 'Branding', 'UI/UX'],
    status: 'COMPLETED',
    subtitle: 'Bespoke digital color catalog and custom order system engineered for architectural paint distribution.',
    problem: 'Architectural and industrial clients struggled with online color accuracy, formula calculations, and bulk order management across regions.',
    solution: 'Designed and deployed a precision digital color matcher, live quantity estimator, and streamlined distributor purchasing engine.',
    details: 'Full-stack e-commerce and catalog web platform engineered for paint manufacturers and distributors with custom shade mixing algorithms and B2B portal.',
    link: 'https://egycolor.devotix.io'
  },
  {
    id: 'meltix-burger',
    title: 'MELTIX BURGER',
    category: 'RESTAURANT & ONLINE ORDERING SYSTEM',
    description: 'Interactive food ordering web application and dynamic restaurant experience with live kitchen dispatch.',
    image: '/assets/projects/meltix-burger/cover.png',
    logo: '/assets/projects/meltix-burger/logo.jpg',
    shot: '/assets/projects/meltix-burger/shot.png',
    tags: ['Web App', 'Food & Tech', 'UI/UX'],
    status: 'COMPLETED',
    subtitle: 'Vibrant direct-to-consumer digital menu and seamless multi-branch online ordering engine.',
    problem: 'High customer drop-off rates on third-party aggregators and fragmented POS system integrations across branch locations.',
    solution: 'Developed an ultra-fast custom digital menu with one-click checkout, customer loyalty rewards, and direct kitchen POS synchronization.',
    details: 'Direct-to-consumer web platform built for high volume restaurant operations, eliminating aggregator commissions and providing real-time order tracking.',
    link: 'https://meltixburger.devotix.io'
  }
];

export const getProjectById = (id) => {
  return SOFTWARE_PROJECTS.find((p) => p.id === id) || SOFTWARE_PROJECTS[0];
};
