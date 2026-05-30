import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Delete existing data in correct order to respect FK constraints
  console.log('🗑️  Clearing existing data...');
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Existing data cleared');

  // --- College 1: IIT Bombay ---
  await prisma.college.create({
    data: {
      name: 'IIT Bombay',
      slug: 'iit-bombay',
      location: 'Mumbai, Maharashtra',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'Government',
      established: 1958,
      rating: 4.9,
      fees: 200000,
      description:
        'Indian Institute of Technology Bombay is one of the premier engineering institutions in India, consistently ranked among the top universities globally. Known for its rigorous academic programs and cutting-edge research, IIT Bombay attracts the brightest minds from across the country.',
      website: 'https://www.iitb.ac.in',
      imageUrl: '/images/colleges/iit-bombay.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 200000,
            seats: 110,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Electrical Engineering',
            duration: 4,
            fees: 200000,
            seats: 140,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Mechanical Engineering',
            duration: 4,
            fees: 200000,
            seats: 140,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'M.Tech Computer Science',
            duration: 2,
            fees: 210000,
            seats: 60,
            eligibility: 'GATE qualified with B.Tech/BE degree',
          },
          {
            name: 'PhD Engineering',
            duration: 5,
            fees: 100000,
            seats: 200,
            eligibility: 'M.Tech/MS degree with valid GATE score or institutional test',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 2100000,
            highestPackage: 31200000,
            placementPercent: 95,
            topRecruiters: '["Google","Microsoft","Goldman Sachs","Uber","Apple","Adobe"]',
          },
          {
            year: 2024,
            avgPackage: 2300000,
            highestPackage: 34500000,
            placementPercent: 96,
            topRecruiters: '["Google","Microsoft","JP Morgan","Uber","Meta","Amazon"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Arjun Mehta',
            rating: 5.0,
            content:
              'IIT Bombay transformed my career. The exposure to world-class research, peer learning, and industry connections is unmatched. Placement season was incredible with offers from top global firms.',
            pros: 'Outstanding faculty, excellent placements, vibrant campus life, strong alumni network',
            cons: 'Intense academic pressure, competitive environment can be stressful',
          },
          {
            authorName: 'Priya Sharma',
            rating: 4.8,
            content:
              'The curriculum is demanding but incredibly rewarding. Professors are leaders in their fields and the research opportunities are abundant. Powai campus is beautiful and well-maintained.',
            pros: 'Research opportunities, beautiful campus, great hostel facilities, diverse student body',
            cons: 'Mumbai heat can be challenging, limited space in popular electives',
          },
          {
            authorName: 'Rohan Deshmukh',
            rating: 4.7,
            content:
              'Four years at IITB gave me skills and friendships for life. The tech clubs and fest culture are phenomenal. However, the grading system is quite strict and GPAs tend to be lower than other IITs.',
            pros: 'Excellent clubs and societies, Techfest and Mood Indigo are amazing, strong coding culture',
            cons: 'Strict grading, some departments have outdated labs, food quality varies',
          },
          {
            authorName: 'Sneha Iyer',
            rating: 4.9,
            content:
              'Best decision of my life to join IITB. The placement support, career counseling, and entrepreneurship ecosystem are top-notch. I started my own venture with support from the SINE incubator.',
            pros: 'Startup ecosystem, placement cell support, international exchange programs',
            cons: 'High cost of living in Mumbai, competitive peer group',
          },
        ],
      },
    },
  });
  console.log('Created: IIT Bombay');

  // --- College 2: IIT Delhi ---
  await prisma.college.create({
    data: {
      name: 'IIT Delhi',
      slug: 'iit-delhi',
      location: 'New Delhi, Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      established: 1961,
      rating: 4.8,
      fees: 200000,
      description:
        'IIT Delhi is a leading technical university in the heart of India\'s capital, renowned for its impactful research and strong industry linkages. The institute offers comprehensive programs across engineering, sciences, and humanities.',
      website: 'https://home.iitd.ac.in',
      imageUrl: '/images/colleges/iit-delhi.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 200000,
            seats: 75,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Electrical Engineering',
            duration: 4,
            fees: 200000,
            seats: 120,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'M.Tech Artificial Intelligence',
            duration: 2,
            fees: 215000,
            seats: 40,
            eligibility: 'GATE qualified with B.Tech/BE degree',
          },
          {
            name: 'MBA (DMS)',
            duration: 2,
            fees: 956000,
            seats: 60,
            eligibility: 'CAT score with graduation degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 2050000,
            highestPackage: 28000000,
            placementPercent: 94,
            topRecruiters: '["Microsoft","Google","Goldman Sachs","Samsung","Qualcomm"]',
          },
          {
            year: 2024,
            avgPackage: 2250000,
            highestPackage: 32000000,
            placementPercent: 95,
            topRecruiters: '["Google","Microsoft","Adobe","Flipkart","McKinsey"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Vikram Singh',
            rating: 4.9,
            content:
              'IIT Delhi has an amazing academic environment with world-class faculty. The location in Delhi gives easy access to corporate offices and startup events. Rendezvous fest is legendary.',
            pros: 'Prime location in Delhi, excellent faculty, strong placement record',
            cons: 'Campus is smaller compared to other IITs, metro construction nearby causes noise',
          },
          {
            authorName: 'Ananya Gupta',
            rating: 4.7,
            content:
              'The computer science department is exceptional. Research labs are well-equipped and professors actively mentor students. Internship opportunities are plentiful thanks to Delhi\'s corporate hub.',
            pros: 'Top-tier CS department, industry connections, good research infrastructure',
            cons: 'Delhi pollution affects quality of life, limited greenery on campus',
          },
          {
            authorName: 'Karthik Reddy',
            rating: 4.6,
            content:
              'Solid education with great return on investment. The alumni network is incredibly helpful during placements. Some older hostels need renovation but new ones are excellent.',
            pros: 'Strong alumni network, good hostel food, accessible public transport',
            cons: 'Some hostels are outdated, administrative processes can be slow',
          },
        ],
      },
    },
  });
  console.log('Created: IIT Delhi');

  // --- College 3: IIT Madras ---
  await prisma.college.create({
    data: {
      name: 'IIT Madras',
      slug: 'iit-madras',
      location: 'Chennai, Tamil Nadu',
      city: 'Chennai',
      state: 'Tamil Nadu',
      type: 'Government',
      established: 1959,
      rating: 4.9,
      fees: 200000,
      description:
        'IIT Madras has been ranked the number one engineering institute in India by NIRF for multiple consecutive years. Set within the Guindy National Park, the campus is home to deer and other wildlife, offering a unique learning environment.',
      website: 'https://www.iitm.ac.in',
      imageUrl: '/images/colleges/iit-madras.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 200000,
            seats: 90,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Engineering Design',
            duration: 4,
            fees: 200000,
            seats: 40,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'Dual Degree Data Science',
            duration: 5,
            fees: 200000,
            seats: 30,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'M.Tech Machine Learning',
            duration: 2,
            fees: 210000,
            seats: 35,
            eligibility: 'GATE qualified with relevant undergraduate degree',
          },
          {
            name: 'MS by Research',
            duration: 2,
            fees: 180000,
            seats: 80,
            eligibility: 'B.Tech/BE degree with valid GATE score',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 2150000,
            highestPackage: 30000000,
            placementPercent: 96,
            topRecruiters: '["Google","Microsoft","Amazon","Qualcomm","Texas Instruments","Oracle"]',
          },
          {
            year: 2024,
            avgPackage: 2400000,
            highestPackage: 35000000,
            placementPercent: 97,
            topRecruiters: '["Google","Apple","Microsoft","Goldman Sachs","Uber","DE Shaw"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Arun Kumar',
            rating: 5.0,
            content:
              'IIT Madras is paradise for anyone who loves research and technology. The campus inside a national park with deer roaming around is surreal. Academic rigor is top-class.',
            pros: 'Beautiful green campus, top NIRF ranking, excellent research culture',
            cons: 'Chennai weather is extremely hot and humid, campus is far from city center',
          },
          {
            authorName: 'Meera Nair',
            rating: 4.8,
            content:
              'The data science program here is cutting-edge. Professors are approachable and encourage independent research. The Robert Bosch Centre for Data Science is a great resource.',
            pros: 'Strong data science ecosystem, supportive faculty, great library',
            cons: 'Limited nightlife around campus, some courses have steep learning curves',
          },
          {
            authorName: 'Rahul Venkatesh',
            rating: 4.9,
            content:
              'Saarang and Shaastra are incredible experiences that develop leadership and organizational skills. The startup culture here is booming with the research park right on campus.',
            pros: 'IIT Madras Research Park, vibrant fest culture, strong peer group',
            cons: 'Food options outside campus are limited, some hostels lack AC',
          },
        ],
      },
    },
  });
  console.log('Created: IIT Madras');

  // --- College 4: IIT Kanpur ---
  await prisma.college.create({
    data: {
      name: 'IIT Kanpur',
      slug: 'iit-kanpur',
      location: 'Kanpur, Uttar Pradesh',
      city: 'Kanpur',
      state: 'Uttar Pradesh',
      type: 'Government',
      established: 1959,
      rating: 4.7,
      fees: 200000,
      description:
        'IIT Kanpur is one of the original five IITs established with the assistance of a consortium of American universities. It pioneered computer science education in India and continues to be a leader in academic innovation.',
      website: 'https://www.iitk.ac.in',
      imageUrl: '/images/colleges/iit-kanpur.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 200000,
            seats: 80,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Aerospace Engineering',
            duration: 4,
            fees: 200000,
            seats: 50,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'M.Tech Cyber Security',
            duration: 2,
            fees: 210000,
            seats: 25,
            eligibility: 'GATE qualified with B.Tech/BE degree',
          },
          {
            name: 'MSc Mathematics and Scientific Computing',
            duration: 5,
            fees: 190000,
            seats: 35,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1900000,
            highestPackage: 27000000,
            placementPercent: 90,
            topRecruiters: '["Microsoft","Samsung","Qualcomm","Goldman Sachs","Tower Research"]',
          },
          {
            year: 2024,
            avgPackage: 2050000,
            highestPackage: 30000000,
            placementPercent: 92,
            topRecruiters: '["Google","Microsoft","Deutsche Bank","Flipkart","Adobe"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Amit Tiwari',
            rating: 4.8,
            content:
              'IIT Kanpur has a unique academic freedom that few institutes offer. The flexibility in choosing courses and the emphasis on self-learning made me a much better engineer.',
            pros: 'Academic flexibility, strong programming culture, affordable fees',
            cons: 'Kanpur city is not very developed, air quality can be poor in winter',
          },
          {
            authorName: 'Deepa Agarwal',
            rating: 4.5,
            content:
              'The aerospace department is one of the best in Asia. Campus is sprawling and well-maintained. The wing culture in hostels creates lifelong bonds.',
            pros: 'Unique aerospace program, huge campus, great hostel wing culture',
            cons: 'Limited recreational options in the city, summers are brutal',
          },
          {
            authorName: 'Saurabh Jain',
            rating: 4.7,
            content:
              'IITK gave me the analytical thinking that has been invaluable in my career. The galaxy and astronomy club is fantastic. Antaragni fest brings incredible artists to campus.',
            pros: 'Analytical rigor, diverse clubs, good sports facilities',
            cons: 'City connectivity is average, campus feels isolated',
          },
        ],
      },
    },
  });
  console.log('Created: IIT Kanpur');

  // --- College 5: IIT Kharagpur ---
  await prisma.college.create({
    data: {
      name: 'IIT Kharagpur',
      slug: 'iit-kharagpur',
      location: 'Kharagpur, West Bengal',
      city: 'Kharagpur',
      state: 'West Bengal',
      type: 'Government',
      established: 1951,
      rating: 4.7,
      fees: 200000,
      description:
        'IIT Kharagpur is the oldest and largest IIT, established in 1951 as the first Indian Institute of Technology. Its sprawling campus houses over 20 academic departments and is known for the Spring Fest and Kshitij techno-management festival.',
      website: 'https://www.iitkgp.ac.in',
      imageUrl: '/images/colleges/iit-kharagpur.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 200000,
            seats: 70,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Electronics and Electrical Communication',
            duration: 4,
            fees: 200000,
            seats: 90,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'Dual Degree Architecture',
            duration: 5,
            fees: 200000,
            seats: 30,
            eligibility: 'JEE Advanced qualified with AAT clearance',
          },
          {
            name: 'MBA',
            duration: 2,
            fees: 1200000,
            seats: 55,
            eligibility: 'CAT qualified with graduation degree',
          },
          {
            name: 'LLB (Rajiv Gandhi School of IP Law)',
            duration: 5,
            fees: 250000,
            seats: 40,
            eligibility: 'Class XII with minimum 60% marks',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1850000,
            highestPackage: 28000000,
            placementPercent: 91,
            topRecruiters: '["Google","Amazon","Microsoft","JP Morgan","McKinsey"]',
          },
          {
            year: 2024,
            avgPackage: 2000000,
            highestPackage: 31000000,
            placementPercent: 93,
            topRecruiters: '["Microsoft","Google","Flipkart","BCG","Goldman Sachs"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Subhajit Banerjee',
            rating: 4.8,
            content:
              'IIT Kharagpur is a mini city in itself. The 2100-acre campus has everything — from a hospital to a shopping center. The diversity of programs is unmatched among IITs.',
            pros: 'Largest IIT campus, diverse programs including law and MBA, excellent infrastructure',
            cons: 'Kharagpur town has limited amenities, campus can feel isolated',
          },
          {
            authorName: 'Ritika Das',
            rating: 4.6,
            content:
              'The breadth of departments allows incredible interdisciplinary learning. Kshitij is Asia\'s largest techno-management fest. The sense of community among KGPians is strong.',
            pros: 'Interdisciplinary opportunities, strong alumni bond, massive fest culture',
            cons: 'Weather is extreme, some labs need modernization',
          },
          {
            authorName: 'Manish Prasad',
            rating: 4.5,
            content:
              'Academic quality is top-notch, but what makes KGP special is the hall culture. Each hall has its own traditions and identity. The General Championship competitions are fiercely contested.',
            pros: 'Hall culture, competitive sports scene, strong placement cell',
            cons: 'Far from major cities, internet connectivity can be patchy',
          },
        ],
      },
    },
  });
  console.log('Created: IIT Kharagpur');

  // --- College 6: IIT Roorkee ---
  await prisma.college.create({
    data: {
      name: 'IIT Roorkee',
      slug: 'iit-roorkee',
      location: 'Roorkee, Uttarakhand',
      city: 'Roorkee',
      state: 'Uttarakhand',
      type: 'Government',
      established: 1847,
      rating: 4.6,
      fees: 195000,
      description:
        'IIT Roorkee, originally established as the Thomason College of Civil Engineering in 1847, is the oldest technical institution in Asia. Converted to an IIT in 2001, it combines its rich heritage with modern research capabilities.',
      website: 'https://www.iitr.ac.in',
      imageUrl: '/images/colleges/iit-roorkee.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 195000,
            seats: 75,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Civil Engineering',
            duration: 4,
            fees: 195000,
            seats: 100,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Arch Architecture',
            duration: 5,
            fees: 195000,
            seats: 40,
            eligibility: 'JEE Advanced qualified with AAT clearance',
          },
          {
            name: 'M.Tech Earthquake Engineering',
            duration: 2,
            fees: 200000,
            seats: 30,
            eligibility: 'GATE qualified with relevant B.Tech/BE degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1750000,
            highestPackage: 24000000,
            placementPercent: 88,
            topRecruiters: '["Microsoft","Samsung","Amazon","Uber","Goldman Sachs"]',
          },
          {
            year: 2024,
            avgPackage: 1900000,
            highestPackage: 26000000,
            placementPercent: 90,
            topRecruiters: '["Google","Microsoft","Qualcomm","Deutsche Bank","Adobe"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Harsh Vardhan',
            rating: 4.7,
            content:
              'The heritage of IIT Roorkee is palpable in every corridor. Being the oldest technical institute in Asia gives you a sense of pride. The civil engineering department is outstanding.',
            pros: 'Rich heritage, excellent civil engineering, beautiful campus with colonial architecture',
            cons: 'Roorkee is a small town with limited entertainment, some infrastructure needs upgrades',
          },
          {
            authorName: 'Nisha Rawat',
            rating: 4.5,
            content:
              'The earthquake engineering department is world-renowned. Thomso cultural fest and Cognizance tech fest are fantastic. Proximity to Rishikesh makes for great weekend getaways.',
            pros: 'Proximity to hills, unique earthquake engineering program, affordable mess food',
            cons: 'Limited corporate exposure in the town, slow administrative processes',
          },
          {
            authorName: 'Rajat Sharma',
            rating: 4.4,
            content:
              'Good academic environment with a calm, focused atmosphere. The Solani Aqueduct and campus grounds are beautiful. Placement scene has improved significantly in recent years.',
            pros: 'Peaceful environment, improving placements, good sports facilities',
            cons: 'Town lacks good restaurants and cafes, winters are cold',
          },
        ],
      },
    },
  });
  console.log('Created: IIT Roorkee');

  // --- College 7: IIT Guwahati ---
  await prisma.college.create({
    data: {
      name: 'IIT Guwahati',
      slug: 'iit-guwahati',
      location: 'Guwahati, Assam',
      city: 'Guwahati',
      state: 'Assam',
      type: 'Government',
      established: 1994,
      rating: 4.5,
      fees: 195000,
      description:
        'IIT Guwahati sits on the north bank of the Brahmaputra river with a picturesque 700-acre campus. As the sixth IIT to be established, it has rapidly grown to become a center of excellence in engineering and technology education in Northeast India.',
      website: 'https://www.iitg.ac.in',
      imageUrl: '/images/colleges/iit-guwahati.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 195000,
            seats: 80,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 195000,
            seats: 70,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Des Design',
            duration: 4,
            fees: 195000,
            seats: 30,
            eligibility: 'UCEED qualified with valid rank',
          },
          {
            name: 'M.Tech Signal Processing',
            duration: 2,
            fees: 200000,
            seats: 25,
            eligibility: 'GATE qualified with B.Tech/BE degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1650000,
            highestPackage: 22000000,
            placementPercent: 87,
            topRecruiters: '["Microsoft","Amazon","Samsung","Cisco","Goldman Sachs"]',
          },
          {
            year: 2024,
            avgPackage: 1800000,
            highestPackage: 25000000,
            placementPercent: 89,
            topRecruiters: '["Google","Microsoft","Flipkart","Oracle","JP Morgan"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Ankur Borah',
            rating: 4.6,
            content:
              'IIT Guwahati has one of the most scenic campuses in India. Studying with the Brahmaputra on one side and hills on the other is an experience in itself. The design department is unique among IITs.',
            pros: 'Stunning campus, unique B.Des program, good hostel facilities',
            cons: 'Connectivity to major cities is limited, monsoons can disrupt campus life',
          },
          {
            authorName: 'Pooja Hazarika',
            rating: 4.4,
            content:
              'Alcheringa, our cultural fest, is the biggest college fest in Northeast India. The faculty in the CSE department is excellent. Placement numbers have been growing steadily.',
            pros: 'Growing placement record, vibrant cultural fest, supportive faculty',
            cons: 'Guwahati lacks tech companies nearby, some labs need better equipment',
          },
          {
            authorName: 'Siddharth Mahajan',
            rating: 4.3,
            content:
              'The campus biodiversity is amazing — you can spot deer and even elephants sometimes. Academic pressure is manageable compared to other IITs. Great place for nature lovers.',
            pros: 'Natural beauty, manageable academics, strong community feel',
            cons: 'Internet speed could be better, far from corporate hubs',
          },
        ],
      },
    },
  });
  console.log('Created: IIT Guwahati');

  // --- College 8: IIT Hyderabad ---
  await prisma.college.create({
    data: {
      name: 'IIT Hyderabad',
      slug: 'iit-hyderabad',
      location: 'Hyderabad, Telangana',
      city: 'Hyderabad',
      state: 'Telangana',
      type: 'Government',
      established: 2008,
      rating: 4.5,
      fees: 190000,
      description:
        'IIT Hyderabad is one of the new generation IITs that has quickly risen in rankings through its innovative curriculum and strong research output. Located in Kandi, it benefits from Hyderabad\'s thriving tech ecosystem.',
      website: 'https://www.iith.ac.in',
      imageUrl: '/images/colleges/iit-hyderabad.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 190000,
            seats: 60,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Artificial Intelligence',
            duration: 4,
            fees: 190000,
            seats: 30,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'B.Tech Biomedical Engineering',
            duration: 4,
            fees: 190000,
            seats: 35,
            eligibility: 'JEE Advanced qualified with valid rank',
          },
          {
            name: 'M.Tech Data Science',
            duration: 2,
            fees: 200000,
            seats: 20,
            eligibility: 'GATE qualified with relevant degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1550000,
            highestPackage: 20000000,
            placementPercent: 86,
            topRecruiters: '["Microsoft","Amazon","Samsung","Qualcomm","Micron"]',
          },
          {
            year: 2024,
            avgPackage: 1750000,
            highestPackage: 24000000,
            placementPercent: 88,
            topRecruiters: '["Google","Microsoft","Intel","Amazon","Nvidia"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Teja Reddy',
            rating: 4.6,
            content:
              'IIT Hyderabad is the best among new IITs. The AI department is pioneering and the curriculum is very industry-aligned. Hyderabad\'s tech scene means plenty of internship opportunities.',
            pros: 'Innovative AI program, proximity to tech hub, modern campus',
            cons: 'Campus is still developing, Kandi is remote from city center',
          },
          {
            authorName: 'Fatima Khan',
            rating: 4.4,
            content:
              'The fractal academic system here is unique and encourages deep learning. New buildings are being constructed regularly. Faculty are young, energetic, and very research-oriented.',
            pros: 'Unique academic system, young faculty, growing research output',
            cons: 'Limited public transport to campus, fewer alumni for networking',
          },
          {
            authorName: 'Venkat Subramaniam',
            rating: 4.3,
            content:
              'Good infrastructure for a new IIT. The climate control in hostels is a blessing in Hyderabad summers. Placement cell is proactive and always bringing new companies.',
            pros: 'AC hostels, proactive placement cell, good food in mess',
            cons: 'Small batch sizes mean fewer peer interactions, campus under construction',
          },
        ],
      },
    },
  });
  console.log('Created: IIT Hyderabad');

  // --- College 9: BITS Pilani ---
  await prisma.college.create({
    data: {
      name: 'BITS Pilani',
      slug: 'bits-pilani',
      location: 'Pilani, Rajasthan',
      city: 'Pilani',
      state: 'Rajasthan',
      type: 'Deemed',
      established: 1964,
      rating: 4.6,
      fees: 500000,
      description:
        'Birla Institute of Technology and Science, Pilani is India\'s leading private engineering institution known for its Practice School program and flexible academic system. The institute allows students to take dual degrees and switch branches based on merit.',
      website: 'https://www.bits-pilani.ac.in',
      imageUrl: '/images/colleges/bits-pilani.jpg',
      courses: {
        create: [
          {
            name: 'B.E. Computer Science',
            duration: 4,
            fees: 500000,
            seats: 90,
            eligibility: 'BITSAT score with Class XII minimum 75%',
          },
          {
            name: 'B.E. Electronics and Instrumentation',
            duration: 4,
            fees: 500000,
            seats: 70,
            eligibility: 'BITSAT score with Class XII minimum 75%',
          },
          {
            name: 'M.Sc. Economics',
            duration: 4,
            fees: 450000,
            seats: 40,
            eligibility: 'BITSAT score with Class XII minimum 75%',
          },
          {
            name: 'B.E. + M.Sc. Dual Degree',
            duration: 5,
            fees: 520000,
            seats: 60,
            eligibility: 'BITSAT score with Class XII minimum 75%',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1800000,
            highestPackage: 25000000,
            placementPercent: 88,
            topRecruiters: '["Google","Microsoft","Goldman Sachs","Sprinklr","Uber"]',
          },
          {
            year: 2024,
            avgPackage: 2000000,
            highestPackage: 28000000,
            placementPercent: 90,
            topRecruiters: '["Google","Amazon","DE Shaw","Microsoft","Atlassian"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Ishaan Birla',
            rating: 4.7,
            content:
              'BITS Pilani\'s Practice School is a game-changer. Two semesters of mandatory industry internship gave me real-world experience that no classroom could. The flexibility to do dual degrees is amazing.',
            pros: 'Practice School program, dual degree option, no attendance requirements',
            cons: 'High fees compared to IITs, Pilani is a very small town',
          },
          {
            authorName: 'Shruti Agarwal',
            rating: 4.5,
            content:
              'The zero attendance policy means you can focus on what truly interests you. BITS culture encourages entrepreneurship and self-learning. APOGEE and OASIS fests are phenomenal.',
            pros: 'Academic freedom, entrepreneurship culture, vibrant fest scene',
            cons: 'Pilani town has nothing to offer, nearest city is 3 hours away',
          },
          {
            authorName: 'Varun Mittal',
            rating: 4.4,
            content:
              'Strong coding culture and competitive programming community. The open test system allows you to study at your own pace. Alumni network in silicon valley is very strong.',
            pros: 'Strong alumni network, open test system, good mess food',
            cons: 'Desert climate is harsh, limited recreational facilities in town',
          },
        ],
      },
    },
  });
  console.log('Created: BITS Pilani');

  // --- College 10: NIT Trichy ---
  await prisma.college.create({
    data: {
      name: 'NIT Trichy',
      slug: 'nit-trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      type: 'Government',
      established: 1964,
      rating: 4.4,
      fees: 150000,
      description:
        'National Institute of Technology Tiruchirappalli is the highest-ranked NIT in India and competes with many older IITs in placement statistics. Known for its strong academic culture and the annual Pragyan tech fest.',
      website: 'https://www.nitt.edu',
      imageUrl: '/images/colleges/nit-trichy.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 150000,
            seats: 65,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 150000,
            seats: 90,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Instrumentation and Control',
            duration: 4,
            fees: 150000,
            seats: 50,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'M.Tech VLSI Design',
            duration: 2,
            fees: 160000,
            seats: 20,
            eligibility: 'GATE qualified with relevant degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1450000,
            highestPackage: 18000000,
            placementPercent: 92,
            topRecruiters: '["Microsoft","Amazon","Qualcomm","Cisco","Oracle"]',
          },
          {
            year: 2024,
            avgPackage: 1600000,
            highestPackage: 21000000,
            placementPercent: 93,
            topRecruiters: '["Google","Microsoft","Samsung","Goldman Sachs","Adobe"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Manoj Krishnan',
            rating: 4.5,
            content:
              'NIT Trichy punches well above its weight. The placement stats rival many IITs. The CSE department is excellent and the competitive coding culture is very strong.',
            pros: 'Best NIT in India, excellent placements, strong coding culture',
            cons: 'Tiruchirappalli city is not very cosmopolitan, campus could use more greenery',
          },
          {
            authorName: 'Divya Lakshmi',
            rating: 4.3,
            content:
              'Pragyan tech fest brings national attention to our campus. Faculty in core departments are very experienced. The hostel food has improved significantly in recent years.',
            pros: 'Good tech fest, experienced faculty, improving infrastructure',
            cons: 'Hot weather most of the year, limited public transport options',
          },
          {
            authorName: 'Ravi Shankar',
            rating: 4.2,
            content:
              'Solid education at a fraction of the cost of private institutions. The alumni network helps during placements. Some departments have better labs than others.',
            pros: 'Affordable fees, good ROI, active alumni network',
            cons: 'Uneven lab quality across departments, bureaucratic administration',
          },
        ],
      },
    },
  });
  console.log('Created: NIT Trichy');

  // --- College 11: NIT Warangal ---
  await prisma.college.create({
    data: {
      name: 'NIT Warangal',
      slug: 'nit-warangal',
      location: 'Warangal, Telangana',
      city: 'Warangal',
      state: 'Telangana',
      type: 'Government',
      established: 1959,
      rating: 4.3,
      fees: 145000,
      description:
        'NIT Warangal is one of the first Regional Engineering Colleges established in India and is consistently ranked among the top NITs. Known for its strong technical programs and the popular Technozion tech fest.',
      website: 'https://www.nitw.ac.in',
      imageUrl: '/images/colleges/nit-warangal.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 145000,
            seats: 70,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 145000,
            seats: 80,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Chemical Engineering',
            duration: 4,
            fees: 145000,
            seats: 55,
            eligibility: 'JEE Main qualified with valid rank',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1350000,
            highestPackage: 16000000,
            placementPercent: 88,
            topRecruiters: '["Amazon","Microsoft","Infosys","TCS","Deloitte"]',
          },
          {
            year: 2024,
            avgPackage: 1500000,
            highestPackage: 19000000,
            placementPercent: 90,
            topRecruiters: '["Google","Amazon","Samsung","Cisco","Goldman Sachs"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Praveen Rao',
            rating: 4.4,
            content:
              'NIT Warangal has a strong academic reputation in the south. The CSE department placements are on par with lower-ranked IITs. Campus has been undergoing major infrastructure upgrades.',
            pros: 'Strong academics, improving infrastructure, good placement record',
            cons: 'Warangal is a small city, campus internet is sometimes unreliable',
          },
          {
            authorName: 'Kavitha Reddy',
            rating: 4.2,
            content:
              'The campus is beautiful, especially during monsoon season. Faculty in the ECE department are very knowledgeable. Technozion fest brings a good mix of technical and cultural events.',
            pros: 'Beautiful campus, knowledgeable faculty, active club culture',
            cons: 'Some hostels need renovation, limited off-campus food options',
          },
          {
            authorName: 'Ajay Chandra',
            rating: 4.1,
            content:
              'Decent college with good return on investment. The alumni are spread across top tech companies which helps during referrals. Could improve on research opportunities for undergrads.',
            pros: 'Good ROI, helpful alumni, affordable fees',
            cons: 'Limited research for undergrads, administration is slow',
          },
        ],
      },
    },
  });
  console.log('Created: NIT Warangal');

  // --- College 12: NIT Surathkal ---
  await prisma.college.create({
    data: {
      name: 'NIT Surathkal',
      slug: 'nit-surathkal',
      location: 'Mangalore, Karnataka',
      city: 'Mangalore',
      state: 'Karnataka',
      type: 'Government',
      established: 1960,
      rating: 4.4,
      fees: 150000,
      description:
        'National Institute of Technology Karnataka, Surathkal is located on the Arabian Sea coast and is one of the top-ranked NITs in India. Its beachside campus and strong technical education make it a preferred choice for engineering aspirants.',
      website: 'https://www.nitk.ac.in',
      imageUrl: '/images/colleges/nit-surathkal.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 150000,
            seats: 60,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Information Technology',
            duration: 4,
            fees: 150000,
            seats: 60,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Mechanical Engineering',
            duration: 4,
            fees: 150000,
            seats: 80,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'M.Tech Computer Science',
            duration: 2,
            fees: 155000,
            seats: 25,
            eligibility: 'GATE qualified with relevant degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1400000,
            highestPackage: 17000000,
            placementPercent: 90,
            topRecruiters: '["Oracle","Cisco","Samsung","Amazon","Flipkart"]',
          },
          {
            year: 2024,
            avgPackage: 1550000,
            highestPackage: 20000000,
            placementPercent: 91,
            topRecruiters: '["Microsoft","Google","Goldman Sachs","Qualcomm","Adobe"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Akshay Shetty',
            rating: 4.5,
            content:
              'NITK Surathkal is a dream campus with the beach literally inside the college. The IT and CSE departments produce some of the best engineers. Engineer fest is a highlight every year.',
            pros: 'Beach campus, strong IT/CSE departments, great weather',
            cons: 'Campus is isolated from Mangalore city, limited nightlife',
          },
          {
            authorName: 'Rashmi Bhat',
            rating: 4.3,
            content:
              'The coastal location makes for an incredible study environment. Sunsets on the campus beach are unforgettable. Placement cell has been bringing better companies each year.',
            pros: 'Scenic location, improving placements, good hostel life',
            cons: 'Humidity can be uncomfortable, some classrooms lack AC',
          },
          {
            authorName: 'Nikhil Pai',
            rating: 4.2,
            content:
              'Value for money education with decent placements. The mechanical department has good lab facilities. Competition among students pushes everyone to do better.',
            pros: 'Affordable education, good mechanical labs, healthy competition',
            cons: 'Transportation to Mangalore is infrequent, canteen variety is limited',
          },
        ],
      },
    },
  });
  console.log('Created: NIT Surathkal');

  // --- College 13: IIIT Hyderabad ---
  await prisma.college.create({
    data: {
      name: 'IIIT Hyderabad',
      slug: 'iiit-hyderabad',
      location: 'Hyderabad, Telangana',
      city: 'Hyderabad',
      state: 'Telangana',
      type: 'Deemed',
      established: 1998,
      rating: 4.5,
      fees: 350000,
      description:
        'International Institute of Information Technology Hyderabad is a research-intensive university focused on computing and information technology. Its research centers in AI, machine learning, and NLP are highly regarded nationally and internationally.',
      website: 'https://www.iiit.ac.in',
      imageUrl: '/images/colleges/iiit-hyderabad.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 350000,
            seats: 200,
            eligibility: 'JEE Main or institute-specific exam (UGEE)',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 350000,
            seats: 60,
            eligibility: 'JEE Main or institute-specific exam (UGEE)',
          },
          {
            name: 'M.Tech Computer Science (Research)',
            duration: 2,
            fees: 370000,
            seats: 40,
            eligibility: 'GATE qualified or institute entrance test',
          },
          {
            name: 'MS by Research in AI/ML',
            duration: 2,
            fees: 350000,
            seats: 30,
            eligibility: 'B.Tech/BE degree with research aptitude',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1850000,
            highestPackage: 24000000,
            placementPercent: 93,
            topRecruiters: '["Google","Microsoft","Amazon","Uber","Sprinklr","Adobe"]',
          },
          {
            year: 2024,
            avgPackage: 2100000,
            highestPackage: 28000000,
            placementPercent: 95,
            topRecruiters: '["Google","Microsoft","Nvidia","Apple","Goldman Sachs"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Sai Prasad',
            rating: 4.6,
            content:
              'IIIT Hyderabad is the best place in India for AI and machine learning research. The research centers are world-class and many students publish papers in top conferences during their undergrad.',
            pros: 'World-class AI research, strong publication culture, excellent placements',
            cons: 'Very research-focused may not suit everyone, high fees for a public institute',
          },
          {
            authorName: 'Neha Verma',
            rating: 4.4,
            content:
              'The computer science curriculum is intense but very relevant to industry needs. Professors are active researchers who bring real-world problems to the classroom. Gachibowli location is perfect.',
            pros: 'Industry-relevant curriculum, location near IT hub, active professors',
            cons: 'Small campus, limited sports facilities, narrow focus on CS/IT',
          },
          {
            authorName: 'Aditya Reddy',
            rating: 4.3,
            content:
              'Felicity fest is compact but fun. The peer group here is incredibly talented — many batchmates go on to top PhD programs. The startup ecosystem on campus is growing.',
            pros: 'Talented peer group, startup support, strong industry connections',
            cons: 'Limited course diversity outside CS, campus is compact',
          },
        ],
      },
    },
  });
  console.log('Created: IIIT Hyderabad');

  // --- College 14: VIT Vellore ---
  await prisma.college.create({
    data: {
      name: 'VIT Vellore',
      slug: 'vit-vellore',
      location: 'Vellore, Tamil Nadu',
      city: 'Vellore',
      state: 'Tamil Nadu',
      type: 'Private',
      established: 1984,
      rating: 4.1,
      fees: 400000,
      description:
        'Vellore Institute of Technology is one of India\'s largest private engineering universities, known for its international collaborations and VITEEE entrance exam. The campus hosts students from over 60 countries, creating a diverse learning environment.',
      website: 'https://vit.ac.in',
      imageUrl: '/images/colleges/vit-vellore.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 400000,
            seats: 600,
            eligibility: 'VITEEE qualified or JEE Main score',
          },
          {
            name: 'B.Tech Information Technology',
            duration: 4,
            fees: 380000,
            seats: 300,
            eligibility: 'VITEEE qualified or JEE Main score',
          },
          {
            name: 'B.Tech CSE with Specialization in AI/ML',
            duration: 4,
            fees: 420000,
            seats: 120,
            eligibility: 'VITEEE qualified or JEE Main score',
          },
          {
            name: 'M.Tech Software Engineering',
            duration: 2,
            fees: 250000,
            seats: 40,
            eligibility: 'GATE qualified or VIT entrance test',
          },
          {
            name: 'MBA',
            duration: 2,
            fees: 700000,
            seats: 120,
            eligibility: 'CAT/XAT/GMAT score with graduation degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 850000,
            highestPackage: 12000000,
            placementPercent: 78,
            topRecruiters: '["TCS","Infosys","Wipro","Cognizant","Amazon","Microsoft"]',
          },
          {
            year: 2024,
            avgPackage: 950000,
            highestPackage: 14400000,
            placementPercent: 80,
            topRecruiters: '["Microsoft","Amazon","Flipkart","Zoho","TCS","Deloitte"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Aakash Patel',
            rating: 4.2,
            content:
              'VIT has excellent infrastructure — smart classrooms, well-equipped labs, and a massive library. The international student community adds diversity. Riviera fest is one of the biggest in south India.',
            pros: 'Great infrastructure, international exposure, large campus',
            cons: 'Large batch sizes reduce individual attention, fees are high',
          },
          {
            authorName: 'Megha Sundaram',
            rating: 3.9,
            content:
              'Campus life is vibrant with numerous clubs and events. The FFCS system for choosing courses is flexible. However, placement statistics include mass recruiters which inflate numbers.',
            pros: 'Flexible course system, vibrant campus life, good hostel facilities',
            cons: 'Mass recruiters dominate placements, some faculty lack industry experience',
          },
          {
            authorName: 'Rahul Joshi',
            rating: 4.0,
            content:
              'Decent private college with good exposure. The AI/ML specialization is well-structured. WiFi coverage is excellent across campus. Location in Vellore is the biggest downside.',
            pros: 'Good WiFi, well-structured specializations, diverse student body',
            cons: 'Vellore town is small, strict campus rules, expensive compared to government colleges',
          },
        ],
      },
    },
  });
  console.log('Created: VIT Vellore');

  // --- College 15: SRM Institute ---
  await prisma.college.create({
    data: {
      name: 'SRM Institute',
      slug: 'srm-institute',
      location: 'Chennai, Tamil Nadu',
      city: 'Chennai',
      state: 'Tamil Nadu',
      type: 'Private',
      established: 1985,
      rating: 3.9,
      fees: 450000,
      description:
        'SRM Institute of Science and Technology is a major private university in Chennai known for its large student body and SRMJEE entrance exam. The university has international collaborations with MIT, Carnegie Mellon, and other global institutions.',
      website: 'https://www.srmist.edu.in',
      imageUrl: '/images/colleges/srm-institute.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 450000,
            seats: 800,
            eligibility: 'SRMJEE qualified or JEE Main score',
          },
          {
            name: 'B.Tech Mechanical Engineering',
            duration: 4,
            fees: 400000,
            seats: 300,
            eligibility: 'SRMJEE qualified or JEE Main score',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 420000,
            seats: 250,
            eligibility: 'SRMJEE qualified or JEE Main score',
          },
          {
            name: 'M.Tech Cloud Computing',
            duration: 2,
            fees: 300000,
            seats: 30,
            eligibility: 'B.Tech/BE degree with minimum 60%',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 750000,
            highestPackage: 10000000,
            placementPercent: 72,
            topRecruiters: '["TCS","Infosys","Cognizant","Wipro","HCL","Zoho"]',
          },
          {
            year: 2024,
            avgPackage: 820000,
            highestPackage: 12000000,
            placementPercent: 75,
            topRecruiters: '["Amazon","Zoho","TCS","Infosys","Cognizant","Accenture"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Kiran Kumar',
            rating: 4.0,
            content:
              'SRM has improved a lot in recent years. The new campus buildings are world-class. International exchange programs with MIT and Stanford are available for top performers.',
            pros: 'International collaborations, modern campus, diverse clubs',
            cons: 'Very large batches, inconsistent faculty quality, expensive',
          },
          {
            authorName: 'Priya Menon',
            rating: 3.8,
            content:
              'Campus facilities are good but the sheer number of students means resources are stretched. Top 10% students get great placements while others rely on mass recruiters.',
            pros: 'Good facilities, active placement cell, Chennai location',
            cons: 'Disparity in placement quality, attendance strictly enforced',
          },
          {
            authorName: 'Arun Srinivasan',
            rating: 3.7,
            content:
              'Average experience overall. The curriculum is decent but not cutting-edge. Good for students who are self-motivated and can leverage the resources available.',
            pros: 'Many workshop opportunities, decent library, good sports facilities',
            cons: 'Faculty quality varies widely, management-dominated decisions, high fees',
          },
        ],
      },
    },
  });
  console.log('Created: SRM Institute');

  // --- College 16: Manipal Institute of Technology ---
  await prisma.college.create({
    data: {
      name: 'Manipal Institute of Technology',
      slug: 'manipal-institute-of-technology',
      location: 'Manipal, Karnataka',
      city: 'Manipal',
      state: 'Karnataka',
      type: 'Private',
      established: 1957,
      rating: 4.2,
      fees: 500000,
      description:
        'Manipal Institute of Technology is one of India\'s most respected private engineering colleges, located in the university town of Manipal. Known for its cosmopolitan student community, excellent infrastructure, and strong alumni presence in Silicon Valley.',
      website: 'https://manipal.edu/mit.html',
      imageUrl: '/images/colleges/manipal-mit.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 500000,
            seats: 180,
            eligibility: 'MET qualified with minimum 50% in PCM',
          },
          {
            name: 'B.Tech Information Technology',
            duration: 4,
            fees: 480000,
            seats: 120,
            eligibility: 'MET qualified with minimum 50% in PCM',
          },
          {
            name: 'B.Tech Mechatronics',
            duration: 4,
            fees: 490000,
            seats: 60,
            eligibility: 'MET qualified with minimum 50% in PCM',
          },
          {
            name: 'B.Tech Biomedical Engineering',
            duration: 4,
            fees: 470000,
            seats: 40,
            eligibility: 'MET qualified with minimum 50% in PCM/PCB',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1050000,
            highestPackage: 14000000,
            placementPercent: 82,
            topRecruiters: '["Amazon","Microsoft","Goldman Sachs","Cisco","VMware"]',
          },
          {
            year: 2024,
            avgPackage: 1200000,
            highestPackage: 16500000,
            placementPercent: 85,
            topRecruiters: '["Google","Microsoft","Amazon","Flipkart","Oracle","SAP"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Aryan Kapoor',
            rating: 4.3,
            content:
              'Manipal is more than a college — it\'s a lifestyle. The town is built around the university. Student life is incredible with so many clubs, events, and the beach nearby. Techtatva fest is amazing.',
            pros: 'University town experience, incredible campus life, beach nearby',
            cons: 'Very expensive, Manipal is isolated from major cities',
          },
          {
            authorName: 'Simran Kaur',
            rating: 4.1,
            content:
              'The infrastructure is top-notch with excellent labs and classrooms. Faculty quality in CSE and IT is good. The cosmopolitan student body means you make friends from all over India.',
            pros: 'Excellent infrastructure, diverse student body, active clubs',
            cons: 'High living costs, limited corporate exposure in the town itself',
          },
          {
            authorName: 'Vivek Nambiar',
            rating: 4.0,
            content:
              'Good education but the fees are steep. The Silicon Valley alumni network is a hidden gem for those wanting to go abroad. Revels cultural fest brings in huge crowds.',
            pros: 'Strong alumni network abroad, cultural diversity, good hostel food',
            cons: 'Fees are very high, academic pressure is moderate, some courses lack depth',
          },
        ],
      },
    },
  });
  console.log('Created: Manipal Institute of Technology');

  // --- College 17: DTU Delhi ---
  await prisma.college.create({
    data: {
      name: 'DTU Delhi',
      slug: 'dtu-delhi',
      location: 'New Delhi, Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      established: 1941,
      rating: 4.3,
      fees: 170000,
      description:
        'Delhi Technological University, formerly known as Delhi College of Engineering, is one of the oldest and most prestigious engineering colleges in Delhi. Its location in the national capital and strong alumni network make it a top choice for Delhi-based students.',
      website: 'https://www.dtu.ac.in',
      imageUrl: '/images/colleges/dtu-delhi.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Engineering',
            duration: 4,
            fees: 170000,
            seats: 110,
            eligibility: 'JEE Main qualified (Delhi/Outside Delhi quota)',
          },
          {
            name: 'B.Tech Information Technology',
            duration: 4,
            fees: 170000,
            seats: 70,
            eligibility: 'JEE Main qualified (Delhi/Outside Delhi quota)',
          },
          {
            name: 'B.Tech Software Engineering',
            duration: 4,
            fees: 170000,
            seats: 60,
            eligibility: 'JEE Main qualified (Delhi/Outside Delhi quota)',
          },
          {
            name: 'MBA',
            duration: 2,
            fees: 280000,
            seats: 60,
            eligibility: 'CAT/MAT score with graduation degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1350000,
            highestPackage: 15000000,
            placementPercent: 88,
            topRecruiters: '["Microsoft","Amazon","Adobe","Goldman Sachs","Flipkart"]',
          },
          {
            year: 2024,
            avgPackage: 1500000,
            highestPackage: 18000000,
            placementPercent: 90,
            topRecruiters: '["Google","Microsoft","Uber","Samsung","Paytm"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Mohit Aggarwal',
            rating: 4.4,
            content:
              'DTU in Delhi gives you the best of both worlds — strong academics and access to Delhi\'s corporate scene. The coding culture is very competitive. Engifest is one of Delhi\'s biggest college fests.',
            pros: 'Delhi location, competitive coding culture, strong brand name',
            cons: 'Campus is not as large as IITs, some departments have dated infrastructure',
          },
          {
            authorName: 'Shreya Malhotra',
            rating: 4.2,
            content:
              'The transition from DCE to DTU brought university status and more autonomy. CSE placements are excellent. However, non-CS branches still struggle to match the same numbers.',
            pros: 'Excellent CSE placements, university autonomy, active student startups',
            cons: 'Disparity between branches, parking is chaotic, canteen is crowded',
          },
          {
            authorName: 'Tarun Sharma',
            rating: 4.1,
            content:
              'Good college for Delhi students. The seniors are very helpful during placement prep. Many successful startups like Zomato have DTU alumni in key positions.',
            pros: 'Helpful seniors, startup alumni, affordable fees for Delhi students',
            cons: 'Administration can be rigid, some labs need upgrades',
          },
        ],
      },
    },
  });
  console.log('Created: DTU Delhi');

  // --- College 18: NSUT Delhi ---
  await prisma.college.create({
    data: {
      name: 'NSUT Delhi',
      slug: 'nsut-delhi',
      location: 'New Delhi, Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      established: 1983,
      rating: 4.2,
      fees: 165000,
      description:
        'Netaji Subhas University of Technology, formerly NSIT, is a state university in Dwarka, Delhi. Known for its strong computer science program and competitive student body, NSUT produces top-tier software engineers year after year.',
      website: 'https://www.nsut.ac.in',
      imageUrl: '/images/colleges/nsut-delhi.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 165000,
            seats: 90,
            eligibility: 'JEE Main qualified (Delhi/Outside Delhi quota)',
          },
          {
            name: 'B.Tech Information Technology',
            duration: 4,
            fees: 165000,
            seats: 60,
            eligibility: 'JEE Main qualified (Delhi/Outside Delhi quota)',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 165000,
            seats: 80,
            eligibility: 'JEE Main qualified (Delhi/Outside Delhi quota)',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1250000,
            highestPackage: 14000000,
            placementPercent: 85,
            topRecruiters: '["Microsoft","Amazon","Samsung","Flipkart","Paytm"]',
          },
          {
            year: 2024,
            avgPackage: 1400000,
            highestPackage: 17000000,
            placementPercent: 87,
            topRecruiters: '["Google","Microsoft","Adobe","Uber","Goldman Sachs"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Aman Verma',
            rating: 4.3,
            content:
              'NSUT is rapidly improving and competing strongly with DTU. The Dwarka campus is well-connected by metro. CSE placement stats have been impressive in recent batches.',
            pros: 'Metro connectivity, improving placements, competitive peer group',
            cons: 'New campus still settling in, fewer traditions than DTU',
          },
          {
            authorName: 'Nikita Choudhary',
            rating: 4.1,
            content:
              'The coding culture here is intense with many students excelling at competitive programming. Infrastructure has improved significantly after the transition from NSIT to NSUT.',
            pros: 'Strong coding culture, new infrastructure, affordable fees',
            cons: 'Campus is still developing, limited faculty in newer departments',
          },
          {
            authorName: 'Gaurav Saxena',
            rating: 4.0,
            content:
              'Solid choice for Delhi students who narrowly miss IIT cutoffs. The IT and CSAI branches have great placements. Moksha fest is growing in popularity.',
            pros: 'Good alternative to IITs, improving brand value, decent hostel',
            cons: 'Limited research opportunities, some professors lack PhD',
          },
        ],
      },
    },
  });
  console.log('Created: NSUT Delhi');

  // --- College 19: Jadavpur University ---
  await prisma.college.create({
    data: {
      name: 'Jadavpur University',
      slug: 'jadavpur-university',
      location: 'Kolkata, West Bengal',
      city: 'Kolkata',
      state: 'West Bengal',
      type: 'Government',
      established: 1955,
      rating: 4.4,
      fees: 50000,
      description:
        'Jadavpur University is one of India\'s most affordable and prestigious state universities, famous for its engineering and science programs. Located in the cultural heart of Kolkata, it offers world-class education at minimal fees.',
      website: 'http://www.jaduniv.edu.in',
      imageUrl: '/images/colleges/jadavpur-university.jpg',
      courses: {
        create: [
          {
            name: 'B.E. Computer Science and Engineering',
            duration: 4,
            fees: 50000,
            seats: 60,
            eligibility: 'WBJEE qualified with valid rank',
          },
          {
            name: 'B.E. Electronics and Telecommunication',
            duration: 4,
            fees: 50000,
            seats: 80,
            eligibility: 'WBJEE qualified with valid rank',
          },
          {
            name: 'B.E. Mechanical Engineering',
            duration: 4,
            fees: 50000,
            seats: 75,
            eligibility: 'WBJEE qualified with valid rank',
          },
          {
            name: 'M.E. Computer Science',
            duration: 2,
            fees: 30000,
            seats: 20,
            eligibility: 'GATE qualified with relevant undergraduate degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1200000,
            highestPackage: 14000000,
            placementPercent: 82,
            topRecruiters: '["TCS","Cognizant","Amazon","Microsoft","Infosys"]',
          },
          {
            year: 2024,
            avgPackage: 1350000,
            highestPackage: 16000000,
            placementPercent: 84,
            topRecruiters: '["Google","Microsoft","Amazon","Flipkart","Goldman Sachs"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Debanjan Mukherjee',
            rating: 4.6,
            content:
              'Jadavpur University is a hidden gem. The education quality rivals IITs at a fraction of the cost. Kolkata\'s cultural richness adds so much to the college experience.',
            pros: 'Incredibly affordable, excellent academics, Kolkata culture',
            cons: 'Infrastructure needs modernization, no proper hostel for many students',
          },
          {
            authorName: 'Ishita Roy',
            rating: 4.3,
            content:
              'The intellectual environment at JU is unmatched. Debates, discussions, and political awareness are as much a part of JU as engineering. Faculty are genuinely passionate about teaching.',
            pros: 'Intellectual atmosphere, passionate faculty, diverse extracurriculars',
            cons: 'Political activities sometimes disrupt campus, outdated facilities',
          },
          {
            authorName: 'Sourav Ghosh',
            rating: 4.2,
            content:
              'Best value education in India. The CSE department produces excellent coders. The alumni network in Kolkata is very supportive. However, companies from Bangalore and Hyderabad rarely visit.',
            pros: 'Best ROI in India, strong CSE alumni, vibrant campus culture',
            cons: 'Limited top-tier company visits, lab equipment is dated, commuter campus',
          },
        ],
      },
    },
  });
  console.log('Created: Jadavpur University');

  // --- College 20: IIM Ahmedabad ---
  await prisma.college.create({
    data: {
      name: 'IIM Ahmedabad',
      slug: 'iim-ahmedabad',
      location: 'Ahmedabad, Gujarat',
      city: 'Ahmedabad',
      state: 'Gujarat',
      type: 'Government',
      established: 1961,
      rating: 4.9,
      fees: 2300000,
      description:
        'Indian Institute of Management Ahmedabad is India\'s premier business school, consistently ranked as the top management institute in the country. Its iconic Louis Kahn-designed campus and rigorous case-study pedagogy produce leaders who shape Indian and global business.',
      website: 'https://www.iima.ac.in',
      imageUrl: '/images/colleges/iim-ahmedabad.jpg',
      courses: {
        create: [
          {
            name: 'Post Graduate Programme in Management (MBA)',
            duration: 2,
            fees: 2300000,
            seats: 400,
            eligibility: 'CAT score with graduation degree and work experience preferred',
          },
          {
            name: 'Post Graduate Programme in Food and Agri-business Management',
            duration: 2,
            fees: 2100000,
            seats: 50,
            eligibility: 'CAT score with graduation degree',
          },
          {
            name: 'Executive MBA (PGPX)',
            duration: 1,
            fees: 3200000,
            seats: 80,
            eligibility: 'GMAT score with minimum 5 years work experience',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 3250000,
            highestPackage: 48000000,
            placementPercent: 100,
            topRecruiters: '["McKinsey","BCG","Bain","Goldman Sachs","Google","Amazon"]',
          },
          {
            year: 2024,
            avgPackage: 3500000,
            highestPackage: 52000000,
            placementPercent: 100,
            topRecruiters: '["McKinsey","BCG","Bain","Morgan Stanley","Google","Uber"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Aditya Bansal',
            rating: 5.0,
            content:
              'IIM Ahmedabad is in a league of its own. The case-study method transforms how you think about business. The Louis Kahn campus is architectural poetry. Every second spent here is worth it.',
            pros: 'Best B-school in India, iconic campus, 100% placements, incredible peer group',
            cons: 'Extremely intense workload, high fees, Ahmedabad summers are brutal',
          },
          {
            authorName: 'Radhika Goel',
            rating: 4.8,
            content:
              'The WAC (Written Analysis and Communication) and case study approach build real business thinking. Alumni network is the strongest in India. Chaos fest is phenomenal.',
            pros: 'Unmatched brand value, strong WAC training, global alumni network',
            cons: 'Intense competition among students, limited work-life balance during studies',
          },
          {
            authorName: 'Suresh Menon',
            rating: 4.9,
            content:
              'Two years at IIMA were the most transformative period of my life. The diversity of thought, global exposure through exchange programs, and mentorship from seniors is exceptional.',
            pros: 'Transformative experience, global exchange, excellent mentorship',
            cons: 'High living costs, academic pressure can affect mental health',
          },
        ],
      },
    },
  });
  console.log('Created: IIM Ahmedabad');

  // --- College 21: IIM Bangalore ---
  await prisma.college.create({
    data: {
      name: 'IIM Bangalore',
      slug: 'iim-bangalore',
      location: 'Bangalore, Karnataka',
      city: 'Bangalore',
      state: 'Karnataka',
      type: 'Government',
      established: 1973,
      rating: 4.9,
      fees: 2350000,
      description:
        'IIM Bangalore is one of India\'s top three management institutes, renowned for its analytics focus, entrepreneurship ecosystem, and the NSRCEL incubation center. Located in India\'s startup capital, it offers unmatched exposure to the tech industry.',
      website: 'https://www.iimb.ac.in',
      imageUrl: '/images/colleges/iim-bangalore.jpg',
      courses: {
        create: [
          {
            name: 'Post Graduate Programme in Management (MBA)',
            duration: 2,
            fees: 2350000,
            seats: 400,
            eligibility: 'CAT score with graduation degree',
          },
          {
            name: 'Post Graduate Programme in Enterprise Management',
            duration: 2,
            fees: 2200000,
            seats: 50,
            eligibility: 'CAT score with graduation and work experience',
          },
          {
            name: 'Executive Post Graduate Programme',
            duration: 1,
            fees: 2800000,
            seats: 120,
            eligibility: 'GMAT/GRE with minimum 5 years work experience',
          },
          {
            name: 'PhD in Management',
            duration: 4,
            fees: 500000,
            seats: 25,
            eligibility: 'CAT/GMAT with master\'s degree and research aptitude',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 3400000,
            highestPackage: 50000000,
            placementPercent: 100,
            topRecruiters: '["Amazon","McKinsey","BCG","Google","Microsoft","Goldman Sachs"]',
          },
          {
            year: 2024,
            avgPackage: 3600000,
            highestPackage: 54000000,
            placementPercent: 100,
            topRecruiters: '["Amazon","BCG","Bain","Google","Flipkart","Morgan Stanley"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Nandini Rao',
            rating: 5.0,
            content:
              'IIM Bangalore\'s location in India\'s startup capital gives an unbeatable advantage. The NSRCEL incubator has launched several successful startups. The analytics curriculum is world-class.',
            pros: 'Bangalore startup ecosystem, analytics focus, NSRCEL incubator',
            cons: 'Bangalore traffic impacts commutes, high accommodation costs in the city',
          },
          {
            authorName: 'Vikash Kumar',
            rating: 4.8,
            content:
              'The campus is lush green and the academic rigor is intense. Industry interaction is fantastic — CEOs and founders regularly visit for guest lectures. Unmaad fest is a blast.',
            pros: 'Beautiful campus, strong industry interaction, great placements',
            cons: 'Very competitive environment, limited hostel rooms for partners',
          },
          {
            authorName: 'Snehal Desai',
            rating: 4.7,
            content:
              'PGP program at IIMB is well-structured with good balance of theory and practice. The peer group is incredibly diverse with engineers, doctors, lawyers, and military officers all in one class.',
            pros: 'Diverse peer group, well-structured PGP, strong brand',
            cons: 'Case-study load is heavy, grading curve is strict',
          },
        ],
      },
    },
  });
  console.log('Created: IIM Bangalore');

  // --- College 22: IIM Calcutta ---
  await prisma.college.create({
    data: {
      name: 'IIM Calcutta',
      slug: 'iim-calcutta',
      location: 'Kolkata, West Bengal',
      city: 'Kolkata',
      state: 'West Bengal',
      type: 'Government',
      established: 1961,
      rating: 4.8,
      fees: 2700000,
      description:
        'IIM Calcutta is one of the three original IIMs and Asia\'s oldest business school. Known for its rigorous finance curriculum and strong placement in investment banking, it has produced some of the top business leaders in India.',
      website: 'https://www.iimcal.ac.in',
      imageUrl: '/images/colleges/iim-calcutta.jpg',
      courses: {
        create: [
          {
            name: 'Post Graduate Diploma in Management (MBA)',
            duration: 2,
            fees: 2700000,
            seats: 480,
            eligibility: 'CAT score with graduation degree',
          },
          {
            name: 'Executive MBA (PGDEX)',
            duration: 1,
            fees: 3000000,
            seats: 60,
            eligibility: 'GMAT/GRE with minimum 5 years work experience',
          },
          {
            name: 'Master of Business Administration (MBAEx)',
            duration: 1,
            fees: 3500000,
            seats: 50,
            eligibility: 'GMAT score with minimum 8 years work experience',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 3350000,
            highestPackage: 45000000,
            placementPercent: 100,
            topRecruiters: '["Goldman Sachs","JP Morgan","McKinsey","BCG","Citibank"]',
          },
          {
            year: 2024,
            avgPackage: 3550000,
            highestPackage: 50000000,
            placementPercent: 100,
            topRecruiters: '["Morgan Stanley","Goldman Sachs","BCG","Amazon","Google"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Arnab Chatterjee',
            rating: 4.9,
            content:
              'IIM Calcutta\'s finance program is legendary. The proximity to Park Street and Kolkata\'s food scene is a bonus. The Joka campus has a charming old-world feel. Investment banking placements are the best in India.',
            pros: 'Best finance program, excellent IB placements, Kolkata culture',
            cons: 'Joka campus is far from city center, infrastructure showing age',
          },
          {
            authorName: 'Pallavi Sarkar',
            rating: 4.7,
            content:
              'The rigor at IIMC is no joke — it truly prepares you for the most demanding corporate roles. The alumni network in finance is unrivaled. Kolkata\'s affordable living helps offset the high fees.',
            pros: 'Rigorous academics, finance alumni network, affordable living in Kolkata',
            cons: 'Stressful academic environment, campus needs modernization',
          },
          {
            authorName: 'Rajiv Banerjee',
            rating: 4.6,
            content:
              'The best B-school for anyone serious about investment banking or consulting. The Carpe Diem fest brings amazing performances. However, the campus is being renovated which causes temporary inconvenience.',
            pros: 'IB and consulting focused, great fest, strong peer learning',
            cons: 'Ongoing campus renovation, far from the main city, humid climate',
          },
        ],
      },
    },
  });
  console.log('Created: IIM Calcutta');

  // --- College 23: IIM Lucknow ---
  await prisma.college.create({
    data: {
      name: 'IIM Lucknow',
      slug: 'iim-lucknow',
      location: 'Lucknow, Uttar Pradesh',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      type: 'Government',
      established: 1984,
      rating: 4.6,
      fees: 1950000,
      description:
        'IIM Lucknow is one of the top IIMs in India, known for its beautiful campus architecture inspired by Mughal design. The institute has a strong presence in consulting and FMCG placements and runs a successful IPMX executive program.',
      website: 'https://www.iiml.ac.in',
      imageUrl: '/images/colleges/iim-lucknow.jpg',
      courses: {
        create: [
          {
            name: 'Post Graduate Programme in Management (MBA)',
            duration: 2,
            fees: 1950000,
            seats: 450,
            eligibility: 'CAT score with graduation degree',
          },
          {
            name: 'International Programme in Management for Executives (IPMX)',
            duration: 1,
            fees: 2600000,
            seats: 60,
            eligibility: 'GMAT score with minimum 5 years work experience',
          },
          {
            name: 'Post Graduate Programme in Agri-Business Management',
            duration: 2,
            fees: 1800000,
            seats: 50,
            eligibility: 'CAT score with graduation in any discipline',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 2800000,
            highestPackage: 38000000,
            placementPercent: 100,
            topRecruiters: '["BCG","Bain","Amazon","HUL","P&G","Citibank"]',
          },
          {
            year: 2024,
            avgPackage: 3000000,
            highestPackage: 42000000,
            placementPercent: 100,
            topRecruiters: '["McKinsey","BCG","Amazon","Google","Accenture Strategy"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Apoorv Mishra',
            rating: 4.7,
            content:
              'IIM Lucknow\'s campus is breathtaking with its Mughal-inspired architecture. The academic program is rigorous and well-structured. FMCG and consulting companies recruit heavily here.',
            pros: 'Beautiful campus, strong FMCG placements, well-structured program',
            cons: 'Lucknow city offers limited corporate exposure, cold winters',
          },
          {
            authorName: 'Shivani Tripathi',
            rating: 4.5,
            content:
              'The peer group quality is excellent. Manfest-Varchasva is a fantastic fest. The entrepreneurship cell has been producing quality startups. Lucknow\'s food scene is an added bonus.',
            pros: 'Great peer group, Lucknow food, good entrepreneurship support',
            cons: 'Limited night life, campus is away from the city, some faculty are strict',
          },
          {
            authorName: 'Rohit Srivastava',
            rating: 4.4,
            content:
              'Good ROI compared to ABC IIMs considering the lower fees. The Noida campus for the working professionals program is also well-run. Alumni are helpful and responsive.',
            pros: 'Good value for money, helpful alumni, Noida campus option',
            cons: 'Summers are extremely hot, campus maintenance could improve',
          },
        ],
      },
    },
  });
  console.log('Created: IIM Lucknow');

  // --- College 24: XLRI Jamshedpur ---
  await prisma.college.create({
    data: {
      name: 'XLRI Jamshedpur',
      slug: 'xlri-jamshedpur',
      location: 'Jamshedpur, Jharkhand',
      city: 'Jamshedpur',
      state: 'Jharkhand',
      type: 'Private',
      established: 1949,
      rating: 4.5,
      fees: 2550000,
      description:
        'XLRI - Xavier School of Management is one of India\'s oldest and most prestigious business schools, known for its excellent HR management program. Founded by the Society of Jesus, it emphasizes ethical leadership and social responsibility.',
      website: 'https://www.xlri.ac.in',
      imageUrl: '/images/colleges/xlri-jamshedpur.jpg',
      courses: {
        create: [
          {
            name: 'Post Graduate Diploma in Business Management (BM)',
            duration: 2,
            fees: 2550000,
            seats: 180,
            eligibility: 'XAT score with graduation degree',
          },
          {
            name: 'Post Graduate Diploma in Human Resource Management (HRM)',
            duration: 2,
            fees: 2550000,
            seats: 180,
            eligibility: 'XAT score with graduation degree',
          },
          {
            name: 'General Management Programme (Executive)',
            duration: 1,
            fees: 2800000,
            seats: 60,
            eligibility: 'GMAT/XAT with minimum 5 years work experience',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 2600000,
            highestPackage: 35000000,
            placementPercent: 100,
            topRecruiters: '["BCG","Bain","Goldman Sachs","JP Morgan","HUL","P&G"]',
          },
          {
            year: 2024,
            avgPackage: 2800000,
            highestPackage: 40000000,
            placementPercent: 100,
            topRecruiters: '["McKinsey","BCG","Amazon","Google","Aditya Birla Group"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Anita Singh',
            rating: 4.6,
            content:
              'XLRI\'s HRM program is the gold standard in India. The Jesuit values instill a sense of purpose beyond just placements. The campus community is close-knit and supportive.',
            pros: 'Best HRM program in India, strong values, close-knit community',
            cons: 'Jamshedpur is a small city, limited social life outside campus',
          },
          {
            authorName: 'Prashanth Nair',
            rating: 4.4,
            content:
              'The BM program is extremely well-structured and the case study methodology is effective. MAXI Fair is a unique industry interaction event. Alumni connections are very strong.',
            pros: 'Well-structured program, strong alumni, MAXI Fair',
            cons: 'High fees, limited startup ecosystem, city lacks cosmopolitan feel',
          },
          {
            authorName: 'Neelam Kumari',
            rating: 4.3,
            content:
              'Coming from a non-business background, XLRI gave me a comprehensive understanding of management. The diversity in the batch is good. Ensemble and Valhalla fests are fun.',
            pros: 'Good for career changers, diverse batch, fun fests',
            cons: 'Living costs in Jamshedpur are low but entertainment options are limited',
          },
        ],
      },
    },
  });
  console.log('Created: XLRI Jamshedpur');

  // --- College 25: FMS Delhi ---
  await prisma.college.create({
    data: {
      name: 'FMS Delhi',
      slug: 'fms-delhi',
      location: 'New Delhi, Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      established: 1954,
      rating: 4.5,
      fees: 192000,
      description:
        'Faculty of Management Studies at the University of Delhi is legendary for offering one of the best MBA programs in India at an incredibly low fee of under Rs 2 lakhs. Its ROI is considered the highest among all B-schools in Asia.',
      website: 'https://www.fms.edu',
      imageUrl: '/images/colleges/fms-delhi.jpg',
      courses: {
        create: [
          {
            name: 'Master of Business Administration (MBA)',
            duration: 2,
            fees: 192000,
            seats: 220,
            eligibility: 'CAT score with graduation degree (minimum 50%)',
          },
          {
            name: 'MBA Executive',
            duration: 2,
            fees: 350000,
            seats: 100,
            eligibility: 'CAT score with 5+ years work experience',
          },
          {
            name: 'PhD in Management',
            duration: 4,
            fees: 50000,
            seats: 15,
            eligibility: 'FMS entrance test with master\'s degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 2700000,
            highestPackage: 32000000,
            placementPercent: 100,
            topRecruiters: '["BCG","Bain","Accenture Strategy","Amazon","HUL","ITC"]',
          },
          {
            year: 2024,
            avgPackage: 2900000,
            highestPackage: 36000000,
            placementPercent: 100,
            topRecruiters: '["McKinsey","BCG","Goldman Sachs","Google","P&G"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Pankaj Gupta',
            rating: 4.7,
            content:
              'FMS Delhi offers the best ROI of any MBA program in India — and possibly the world. Where else can you get a top MBA for under 2 lakhs? The Delhi University brand is powerful.',
            pros: 'Unbeatable ROI, Delhi location, strong brand, practically free education',
            cons: 'Very small campus, limited hostel facility, infrastructure is basic',
          },
          {
            authorName: 'Tanvi Bhatt',
            rating: 4.4,
            content:
              'The education quality and placement stats rival IIM ABC at a fraction of the cost. Being part of Delhi University means access to a massive network. Campus is cramped but functional.',
            pros: 'Lowest fees in top B-schools, strong placements, DU network',
            cons: 'Tiny campus, no proper auditorium, limited sports facilities',
          },
          {
            authorName: 'Ramesh Iyer',
            rating: 4.3,
            content:
              'If you can get in (extremely competitive), FMS is a no-brainer. The consulting and FMCG placements are excellent. Class interactions are enriching due to diverse work experience backgrounds.',
            pros: 'Excellent placements, diverse cohort, Delhi location advantage',
            cons: 'Aging infrastructure, limited international exposure compared to IIMs',
          },
        ],
      },
    },
  });
  console.log('Created: FMS Delhi');

  // --- College 26: AIIMS Delhi ---
  await prisma.college.create({
    data: {
      name: 'AIIMS Delhi',
      slug: 'aiims-delhi',
      location: 'New Delhi, Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      established: 1956,
      rating: 4.9,
      fees: 6000,
      description:
        'All India Institute of Medical Sciences, New Delhi is the apex medical institution in India and a symbol of excellence in medical education, research, and patient care. AIIMS Delhi has been the cornerstone of India\'s public health system for decades.',
      website: 'https://www.aiims.edu',
      imageUrl: '/images/colleges/aiims-delhi.jpg',
      courses: {
        create: [
          {
            name: 'MBBS',
            duration: 5,
            fees: 6000,
            seats: 107,
            eligibility: 'NEET-UG qualified with top rank',
          },
          {
            name: 'B.Sc Nursing (Hons)',
            duration: 4,
            fees: 5000,
            seats: 60,
            eligibility: 'AIIMS Nursing entrance exam',
          },
          {
            name: 'MD/MS (Post Graduate)',
            duration: 3,
            fees: 15000,
            seats: 200,
            eligibility: 'NEET-PG/INI-CET qualified with MBBS degree',
          },
          {
            name: 'DM/MCh Super Specialty',
            duration: 3,
            fees: 15000,
            seats: 80,
            eligibility: 'MD/MS degree with INI-SS qualification',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1800000,
            highestPackage: 5000000,
            placementPercent: 100,
            topRecruiters: '["AIIMS Hospitals","Apollo","Fortis","Max Healthcare","Medanta"]',
          },
          {
            year: 2024,
            avgPackage: 2000000,
            highestPackage: 6000000,
            placementPercent: 100,
            topRecruiters: '["AIIMS Network","Apollo","Narayana Health","Manipal Hospitals","WHO"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Dr. Kavita Sharma',
            rating: 5.0,
            content:
              'AIIMS Delhi is the dream of every medical aspirant in India. The clinical exposure from day one is unparalleled. You learn from the best doctors in the country and treat patients from all over India.',
            pros: 'Best clinical exposure in India, legendary faculty, almost free education',
            cons: 'Extremely demanding schedule, high patient load, limited personal time',
          },
          {
            authorName: 'Dr. Rajan Malik',
            rating: 4.8,
            content:
              'The research opportunities at AIIMS are incredible. The hospital sees the most complex cases in the country, giving students unmatched learning. The AIIMS tag opens doors worldwide.',
            pros: 'Complex clinical cases, research opportunities, global recognition',
            cons: 'Hostel conditions are basic, work-life balance is challenging',
          },
          {
            authorName: 'Dr. Priyanka Kaul',
            rating: 4.7,
            content:
              'Six years at AIIMS Delhi shaped me as a doctor and as a person. The camaraderie among students is beautiful. The campus is well-located in central Delhi. Pulsation fest is fun.',
            pros: 'Central Delhi location, strong student bonds, excellent library',
            cons: 'Long duty hours during internship, administrative red tape',
          },
        ],
      },
    },
  });
  console.log('Created: AIIMS Delhi');

  // --- College 27: CMC Vellore ---
  await prisma.college.create({
    data: {
      name: 'CMC Vellore',
      slug: 'cmc-vellore',
      location: 'Vellore, Tamil Nadu',
      city: 'Vellore',
      state: 'Tamil Nadu',
      type: 'Private',
      established: 1900,
      rating: 4.7,
      fees: 60000,
      description:
        'Christian Medical College, Vellore is one of the oldest and most respected medical institutions in India, founded by Dr. Ida S. Scudder. Known for its commitment to serving the underprivileged, CMC combines world-class medical education with a strong service orientation.',
      website: 'https://www.cmch-vellore.edu',
      imageUrl: '/images/colleges/cmc-vellore.jpg',
      courses: {
        create: [
          {
            name: 'MBBS',
            duration: 5,
            fees: 60000,
            seats: 100,
            eligibility: 'NEET-UG qualified with CMC entrance process',
          },
          {
            name: 'B.Sc Nursing',
            duration: 4,
            fees: 45000,
            seats: 80,
            eligibility: 'CMC entrance exam with Class XII (PCB)',
          },
          {
            name: 'MD General Medicine',
            duration: 3,
            fees: 80000,
            seats: 30,
            eligibility: 'NEET-PG qualified with MBBS degree',
          },
          {
            name: 'MS General Surgery',
            duration: 3,
            fees: 80000,
            seats: 25,
            eligibility: 'NEET-PG qualified with MBBS degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1200000,
            highestPackage: 3500000,
            placementPercent: 100,
            topRecruiters: '["CMC Hospital","Apollo","Manipal Hospitals","Narayana Health","WHO"]',
          },
          {
            year: 2024,
            avgPackage: 1400000,
            highestPackage: 4000000,
            placementPercent: 100,
            topRecruiters: '["CMC Hospital","Fortis","Max Healthcare","UNICEF","MSF"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Dr. Sarah Thomas',
            rating: 4.8,
            content:
              'CMC Vellore is not just a medical college — it\'s a mission. The focus on serving underserved communities sets it apart. Clinical training is exceptional with exposure to rare tropical diseases.',
            pros: 'Mission-driven education, rare case exposure, affordable fees',
            cons: 'Vellore is a small town, strict campus rules, limited recreational options',
          },
          {
            authorName: 'Dr. Anand Jacob',
            rating: 4.7,
            content:
              'The hospital is one of the busiest in India, giving students incredible clinical experience. The nursing college and allied health sciences are also top-tier. The CMC bond is for life.',
            pros: 'Busy hospital for learning, excellent clinical skills, lifelong network',
            cons: 'Mandatory rural posting, weather is hot, town has limited amenities',
          },
          {
            authorName: 'Dr. Fatima Ahmed',
            rating: 4.5,
            content:
              'The values instilled at CMC — compassion, integrity, and service — are as important as the medical knowledge. Research opportunities in tropical medicine are unique. Faculty are exceptional mentors.',
            pros: 'Strong values, tropical medicine research, mentoring culture',
            cons: 'Bond period after graduation, limited specialization seats, basic infrastructure',
          },
        ],
      },
    },
  });
  console.log('Created: CMC Vellore');

  // --- College 28: JIPMER Puducherry ---
  await prisma.college.create({
    data: {
      name: 'JIPMER Puducherry',
      slug: 'jipmer-puducherry',
      location: 'Puducherry, Puducherry',
      city: 'Puducherry',
      state: 'Puducherry',
      type: 'Government',
      established: 1823,
      rating: 4.6,
      fees: 10000,
      description:
        'Jawaharlal Institute of Postgraduate Medical Education and Research is one of India\'s oldest and most prestigious medical institutions. An institute of national importance, JIPMER provides almost free medical education while maintaining exceptional academic standards.',
      website: 'https://www.jipmer.edu.in',
      imageUrl: '/images/colleges/jipmer-puducherry.jpg',
      courses: {
        create: [
          {
            name: 'MBBS',
            duration: 5,
            fees: 10000,
            seats: 150,
            eligibility: 'NEET-UG qualified with top rank',
          },
          {
            name: 'MD Pathology',
            duration: 3,
            fees: 15000,
            seats: 15,
            eligibility: 'NEET-PG qualified with MBBS degree',
          },
          {
            name: 'MD Community Medicine',
            duration: 3,
            fees: 15000,
            seats: 12,
            eligibility: 'NEET-PG qualified with MBBS degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1500000,
            highestPackage: 4000000,
            placementPercent: 100,
            topRecruiters: '["JIPMER Hospital","AIIMS Network","Apollo","Fortis","Government Hospitals"]',
          },
          {
            year: 2024,
            avgPackage: 1600000,
            highestPackage: 4500000,
            placementPercent: 100,
            topRecruiters: '["JIPMER Hospital","CMC Vellore","Max Healthcare","PGIMER","WHO"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Dr. Arunkumar S',
            rating: 4.7,
            content:
              'JIPMER is a dream for medical students. The French colonial architecture of Puducherry adds charm to student life. Clinical exposure is phenomenal with patients coming from across South India.',
            pros: 'Virtually free education, excellent clinical exposure, beautiful Puducherry',
            cons: 'Limited specialty departments, infrastructure needs upgrades',
          },
          {
            authorName: 'Dr. Lakshmi Menon',
            rating: 4.5,
            content:
              'The community medicine program here is one of the best in India. Puducherry\'s unique health system provides interesting case studies. The beach is 10 minutes from campus.',
            pros: 'Strong community medicine, beach proximity, affordable living',
            cons: 'Small town limitations, fewer super-specialty options, humid climate',
          },
          {
            authorName: 'Dr. Manoj Kumar',
            rating: 4.4,
            content:
              'JIPMER gives you hands-on clinical experience from the very beginning. The patient volume is high, which means you learn fast. Research output has been growing steadily.',
            pros: 'Hands-on learning, high patient volume, growing research',
            cons: 'Some departments understaffed, limited recreational activities',
          },
        ],
      },
    },
  });
  console.log('Created: JIPMER Puducherry');

  // --- College 29: Maulana Azad Medical College ---
  await prisma.college.create({
    data: {
      name: 'Maulana Azad Medical College',
      slug: 'maulana-azad-medical-college',
      location: 'New Delhi, Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      established: 1958,
      rating: 4.5,
      fees: 50000,
      description:
        'Maulana Azad Medical College is one of the most prestigious medical colleges in Delhi, attached to Lok Nayak Hospital — one of the largest government hospitals in India. The clinical exposure at MAMC is considered among the best in northern India.',
      website: 'https://www.mamc.ac.in',
      imageUrl: '/images/colleges/mamc-delhi.jpg',
      courses: {
        create: [
          {
            name: 'MBBS',
            duration: 5,
            fees: 50000,
            seats: 250,
            eligibility: 'NEET-UG qualified with Delhi state quota or All India quota',
          },
          {
            name: 'MD General Medicine',
            duration: 3,
            fees: 60000,
            seats: 20,
            eligibility: 'NEET-PG qualified with MBBS degree',
          },
          {
            name: 'MS Orthopaedics',
            duration: 3,
            fees: 60000,
            seats: 10,
            eligibility: 'NEET-PG qualified with MBBS degree',
          },
          {
            name: 'MD Paediatrics',
            duration: 3,
            fees: 60000,
            seats: 12,
            eligibility: 'NEET-PG qualified with MBBS degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1400000,
            highestPackage: 3500000,
            placementPercent: 100,
            topRecruiters: '["Lok Nayak Hospital","AIIMS","Apollo","Max Healthcare","Medanta"]',
          },
          {
            year: 2024,
            avgPackage: 1500000,
            highestPackage: 4000000,
            placementPercent: 100,
            topRecruiters: '["Lok Nayak Hospital","Safdarjung Hospital","Apollo","Fortis","BLK"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Dr. Neha Kapoor',
            rating: 4.6,
            content:
              'MAMC attached to Lok Nayak Hospital means you see more patients in a day than many doctors see in a week elsewhere. The clinical training is intense and incredibly valuable.',
            pros: 'Massive patient exposure, central Delhi location, affordable education',
            cons: 'Hospital is always overcrowded, infrastructure is aging, heavy workload',
          },
          {
            authorName: 'Dr. Akash Singh',
            rating: 4.4,
            content:
              'Being in central Delhi gives easy access to Connaught Place, India Gate, and the social scene. The variety of cases at Lok Nayak is incredible — from trauma to rare diseases.',
            pros: 'Case variety, Delhi location, strong senior-junior mentorship',
            cons: 'Hostel rooms are small, campus lacks green space, bureaucratic processes',
          },
          {
            authorName: 'Dr. Pooja Yadav',
            rating: 4.3,
            content:
              'MAMC has produced some of India\'s most renowned doctors. The anatomy museum is historic and the dissection hall is one of the best equipped. Strong NEET-PG results from MAMC graduates.',
            pros: 'Historic institution, strong NEET-PG results, well-equipped anatomy lab',
            cons: 'Competition for PG seats is fierce, limited parking, canteen is small',
          },
        ],
      },
    },
  });
  console.log('Created: Maulana Azad Medical College');

  // --- College 30: AFMC Pune ---
  await prisma.college.create({
    data: {
      name: 'AFMC Pune',
      slug: 'afmc-pune',
      location: 'Pune, Maharashtra',
      city: 'Pune',
      state: 'Maharashtra',
      type: 'Government',
      established: 1948,
      rating: 4.4,
      fees: 55000,
      description:
        'Armed Forces Medical College, Pune is a premier medical institution under the Indian Armed Forces. Known for its discipline, camaraderie, and excellent training, AFMC produces doctors who serve in the military as well as civilian healthcare.',
      website: 'https://afmc.nic.in',
      imageUrl: '/images/colleges/afmc-pune.jpg',
      courses: {
        create: [
          {
            name: 'MBBS',
            duration: 5,
            fees: 55000,
            seats: 150,
            eligibility: 'NEET-UG qualified with AFMC interview and medical fitness',
          },
          {
            name: 'MD General Medicine',
            duration: 3,
            fees: 65000,
            seats: 15,
            eligibility: 'NEET-PG qualified, serving armed forces medical officers',
          },
          {
            name: 'MS General Surgery',
            duration: 3,
            fees: 65000,
            seats: 12,
            eligibility: 'NEET-PG qualified, serving armed forces medical officers',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1200000,
            highestPackage: 2500000,
            placementPercent: 100,
            topRecruiters: '["Indian Army","Indian Navy","Indian Air Force","Military Hospitals","ECHS"]',
          },
          {
            year: 2024,
            avgPackage: 1300000,
            highestPackage: 2800000,
            placementPercent: 100,
            topRecruiters: '["Indian Army","Indian Navy","Indian Air Force","Armed Forces Hospitals","DRDO"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Dr. Capt. Vivek Rana',
            rating: 4.5,
            content:
              'AFMC is not just a medical college — it\'s a way of life. The discipline, physical fitness, and military training alongside medical education create well-rounded individuals. The bond among batch mates is unbreakable.',
            pros: 'Military training, unbreakable bonds, discipline and fitness, free education',
            cons: 'Mandatory service bond, strict rules, limited personal freedom during training',
          },
          {
            authorName: 'Dr. Maj. Swati Patil',
            rating: 4.3,
            content:
              'The unique blend of military and medical training sets AFMC apart from every other medical college. Pune\'s pleasant weather makes the rigorous schedule more bearable.',
            pros: 'Unique military-medical training, Pune weather, excellent sports facilities',
            cons: 'Compulsory service commitment, regimented lifestyle, limited specialization choices',
          },
          {
            authorName: 'Dr. Lt. Arun Thapa',
            rating: 4.2,
            content:
              'AFMC Pune taught me medicine and leadership in equal measure. The parade ground mornings and hospital rounds create a unique rhythm of life. Would not trade this experience for anything.',
            pros: 'Leadership development, camaraderie, comprehensive training',
            cons: 'Strict timings, limited exposure to civilian healthcare trends, bond obligations',
          },
        ],
      },
    },
  });
  console.log('Created: AFMC Pune');

  // --- College 31: College of Engineering Pune ---
  await prisma.college.create({
    data: {
      name: 'College of Engineering Pune',
      slug: 'college-of-engineering-pune',
      location: 'Pune, Maharashtra',
      city: 'Pune',
      state: 'Maharashtra',
      type: 'Government',
      established: 1854,
      rating: 4.2,
      fees: 120000,
      description:
        'College of Engineering Pune (COEP) is one of the oldest engineering colleges in Asia, established by the British in 1854. Now an autonomous university, COEP Technological University has a rich heritage and is located on the banks of the Mula-Mutha river.',
      website: 'https://www.coep.org.in',
      imageUrl: '/images/colleges/coep-pune.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Engineering',
            duration: 4,
            fees: 120000,
            seats: 70,
            eligibility: 'JEE Main or MHT-CET qualified',
          },
          {
            name: 'B.Tech Information Technology',
            duration: 4,
            fees: 120000,
            seats: 60,
            eligibility: 'JEE Main or MHT-CET qualified',
          },
          {
            name: 'B.Tech Mechanical Engineering',
            duration: 4,
            fees: 120000,
            seats: 90,
            eligibility: 'JEE Main or MHT-CET qualified',
          },
          {
            name: 'M.Tech Computer Engineering',
            duration: 2,
            fees: 130000,
            seats: 25,
            eligibility: 'GATE qualified with B.Tech/BE degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1100000,
            highestPackage: 13000000,
            placementPercent: 85,
            topRecruiters: '["Microsoft","Amazon","Veritas","NVIDIA","Cummins","Bajaj Auto"]',
          },
          {
            year: 2024,
            avgPackage: 1250000,
            highestPackage: 15000000,
            placementPercent: 87,
            topRecruiters: '["Google","Microsoft","Persistent","NVIDIA","Goldman Sachs"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Omkar Kulkarni',
            rating: 4.3,
            content:
              'COEP has an incredible heritage — studying in buildings that are over 160 years old is surreal. The boat club on the river is unique among engineering colleges. MindSpark fest is well-organized.',
            pros: 'Rich heritage, boat club, beautiful riverside campus, Pune location',
            cons: 'Some facilities are outdated, administrative processes are slow',
          },
          {
            authorName: 'Aparna Joshi',
            rating: 4.1,
            content:
              'Pune\'s IT hub means plenty of internship and placement opportunities. The alumni network is spread across Pune\'s tech industry. COEP Mindspark is a growing tech fest.',
            pros: 'Pune IT hub access, strong local alumni, affordable fees',
            cons: 'Campus is smaller than expected, non-CS branches have lower placement rates',
          },
          {
            authorName: 'Sagar Pawar',
            rating: 4.0,
            content:
              'Good value for money with a historic brand name. The automotive engineering exposure through BAJA and Formula Student teams is excellent. Pune weather is a huge bonus.',
            pros: 'Automotive engineering clubs, pleasant weather, good brand in Maharashtra',
            cons: 'Limited hostel capacity, some labs need modernization, parking issues',
          },
        ],
      },
    },
  });
  console.log('Created: College of Engineering Pune');

  // --- College 32: PSG College of Technology ---
  await prisma.college.create({
    data: {
      name: 'PSG College of Technology',
      slug: 'psg-college-of-technology',
      location: 'Coimbatore, Tamil Nadu',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      type: 'Private',
      established: 1951,
      rating: 4.0,
      fees: 180000,
      description:
        'PSG College of Technology is a renowned private engineering college in Coimbatore, affiliated with Anna University. Known for its strong industry connections and the PSG industrial group backing, it offers quality technical education with good placement support.',
      website: 'https://www.psgtech.edu',
      imageUrl: '/images/colleges/psg-coimbatore.jpg',
      courses: {
        create: [
          {
            name: 'B.E. Computer Science and Engineering',
            duration: 4,
            fees: 180000,
            seats: 100,
            eligibility: 'TNEA counselling with Class XII marks',
          },
          {
            name: 'B.E. Electronics and Communication',
            duration: 4,
            fees: 170000,
            seats: 80,
            eligibility: 'TNEA counselling with Class XII marks',
          },
          {
            name: 'B.E. Mechanical Engineering',
            duration: 4,
            fees: 160000,
            seats: 120,
            eligibility: 'TNEA counselling with Class XII marks',
          },
          {
            name: 'M.E. Computer Science',
            duration: 2,
            fees: 120000,
            seats: 20,
            eligibility: 'GATE qualified or Anna University entrance',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 700000,
            highestPackage: 8000000,
            placementPercent: 80,
            topRecruiters: '["Zoho","TCS","Infosys","Cognizant","CTS","L&T"]',
          },
          {
            year: 2024,
            avgPackage: 800000,
            highestPackage: 10000000,
            placementPercent: 82,
            topRecruiters: '["Zoho","Amazon","TCS","Wipro","Bosch","Cognizant"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Balaji Ramanathan',
            rating: 4.1,
            content:
              'PSG Tech has the backing of the PSG industrial group which means excellent industry connections. The campus is well-maintained and Coimbatore is a pleasant city to live in.',
            pros: 'Industry backing, well-maintained campus, pleasant Coimbatore weather',
            cons: 'Not as well-known outside Tamil Nadu, average hostel facilities',
          },
          {
            authorName: 'Swathi Narayanan',
            rating: 3.9,
            content:
              'Good college for Tamil Nadu students. Zoho recruits heavily from PSG which is great for those interested in product companies. The robotics club is very active.',
            pros: 'Strong Zoho connection, active technical clubs, affordable fees',
            cons: 'Limited brand recognition nationally, placement gap between branches',
          },
          {
            authorName: 'Kumaran Selvam',
            rating: 3.8,
            content:
              'Decent engineering education with a focus on practical skills. The PSG hospital and other PSG institutions on the same campus create a mini township. Good for a stable career foundation.',
            pros: 'Practical curriculum, PSG ecosystem, stable placement record',
            cons: 'Conservative campus culture, limited nightlife, strict attendance',
          },
        ],
      },
    },
  });
  console.log('Created: PSG College of Technology');

  // --- College 33: Thapar Institute ---
  await prisma.college.create({
    data: {
      name: 'Thapar Institute',
      slug: 'thapar-institute',
      location: 'Patiala, Punjab',
      city: 'Patiala',
      state: 'Punjab',
      type: 'Deemed',
      established: 1956,
      rating: 4.0,
      fees: 380000,
      description:
        'Thapar Institute of Engineering and Technology is a deemed-to-be-university in Patiala, Punjab. Originally established as Thapar Institute of Engineering and Technology, it has grown into one of northern India\'s most respected private engineering institutions.',
      website: 'https://www.thapar.edu',
      imageUrl: '/images/colleges/thapar-patiala.jpg',
      courses: {
        create: [
          {
            name: 'B.E. Computer Engineering',
            duration: 4,
            fees: 380000,
            seats: 120,
            eligibility: 'JEE Main score or Thapar entrance',
          },
          {
            name: 'B.E. Electronics and Communication',
            duration: 4,
            fees: 370000,
            seats: 90,
            eligibility: 'JEE Main score or Thapar entrance',
          },
          {
            name: 'B.E. Mechanical Engineering',
            duration: 4,
            fees: 360000,
            seats: 100,
            eligibility: 'JEE Main score or Thapar entrance',
          },
          {
            name: 'MBA',
            duration: 2,
            fees: 500000,
            seats: 60,
            eligibility: 'CAT/MAT/GMAT score with graduation degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 950000,
            highestPackage: 11000000,
            placementPercent: 82,
            topRecruiters: '["Amazon","Microsoft","Flipkart","Samsung","Infosys","TCS"]',
          },
          {
            year: 2024,
            avgPackage: 1050000,
            highestPackage: 13000000,
            placementPercent: 85,
            topRecruiters: '["Google","Amazon","Adobe","Qualcomm","Deloitte","Flipkart"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Harpreet Kaur',
            rating: 4.1,
            content:
              'Thapar has improved significantly in recent years. The campus is beautiful and well-maintained. Computer engineering placements are competitive with many NITs. The Punjabi hospitality on campus is wonderful.',
            pros: 'Improving placements, beautiful campus, great food, warm culture',
            cons: 'Patiala is a small city, fees are high for North India standards',
          },
          {
            authorName: 'Arjun Dhillon',
            rating: 3.9,
            content:
              'Good college for Punjab and Haryana students. The coding culture has grown with many students now cracking top companies. TIET Open Day and Confluence are fun events.',
            pros: 'Growing coding culture, good events, strong regional brand',
            cons: 'Limited brand value outside North India, some faculty lack research focus',
          },
          {
            authorName: 'Ramandeep Singh',
            rating: 3.8,
            content:
              'The campus is compact but has everything you need. The sports facilities are quite good. ECE and CSE departments are the strongest. Branch change option motivates first-year students.',
            pros: 'Good sports facilities, branch change option, compact campus',
            cons: 'High fees, average industry exposure, limited extracurricular diversity',
          },
        ],
      },
    },
  });
  console.log('Created: Thapar Institute');

  // --- College 34: NIT Calicut ---
  await prisma.college.create({
    data: {
      name: 'NIT Calicut',
      slug: 'nit-calicut',
      location: 'Kozhikode, Kerala',
      city: 'Kozhikode',
      state: 'Kerala',
      type: 'Government',
      established: 1961,
      rating: 4.2,
      fees: 140000,
      description:
        'National Institute of Technology Calicut is one of the premier NITs in India, located in the lush green Chathamangalam campus in Kozhikode, Kerala. Known for its strong academic programs and the popular Ragam cultural fest.',
      website: 'https://www.nitc.ac.in',
      imageUrl: '/images/colleges/nit-calicut.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 140000,
            seats: 70,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 140000,
            seats: 80,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Electrical Engineering',
            duration: 4,
            fees: 140000,
            seats: 80,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'M.Tech Computer Science',
            duration: 2,
            fees: 150000,
            seats: 20,
            eligibility: 'GATE qualified with relevant degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1200000,
            highestPackage: 14000000,
            placementPercent: 85,
            topRecruiters: '["Microsoft","Oracle","Samsung","TCS","Infosys","Cisco"]',
          },
          {
            year: 2024,
            avgPackage: 1350000,
            highestPackage: 16000000,
            placementPercent: 87,
            topRecruiters: '["Google","Amazon","Microsoft","Flipkart","Oracle","Goldman Sachs"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Akhil Namboodiri',
            rating: 4.3,
            content:
              'NIT Calicut has one of the most beautiful campus settings among all NITs. The greenery of Kerala combined with quality education makes it a great experience. Ragam fest is incredible.',
            pros: 'Beautiful green campus, quality education, Ragam cultural fest',
            cons: 'Kozhikode is not a tech hub, campus is hilly and walking is tiring',
          },
          {
            authorName: 'Gayathri Menon',
            rating: 4.1,
            content:
              'The CSE and ECE departments are well-established with good faculty. Kerala\'s food and culture add to the experience. The FOSS (Free and Open Source Software) club is very active.',
            pros: 'Good CSE/ECE departments, FOSS culture, Kerala cuisine',
            cons: 'Placement companies are fewer than top NITs, monsoons can be heavy',
          },
          {
            authorName: 'Vishnu Prasad',
            rating: 4.0,
            content:
              'Good NIT with affordable fees. The entrepreneurship cell has been producing interesting startups. WiFi coverage across campus has improved significantly. Kozhikode beach is a nice weekend spot.',
            pros: 'Affordable, improving WiFi, beach access, good entrepreneurship support',
            cons: 'Limited industry exposure, some hostels need maintenance, far from city center',
          },
        ],
      },
    },
  });
  console.log('Created: NIT Calicut');

  // --- College 35: IIIT Bangalore ---
  await prisma.college.create({
    data: {
      name: 'IIIT Bangalore',
      slug: 'iiit-bangalore',
      location: 'Bangalore, Karnataka',
      city: 'Bangalore',
      state: 'Karnataka',
      type: 'Deemed',
      established: 1999,
      rating: 4.3,
      fees: 400000,
      description:
        'International Institute of Information Technology Bangalore is a premier institution focused on IT and computing, located in the heart of India\'s Silicon Valley. Its strong industry linkages and research-oriented curriculum produce highly skilled IT professionals.',
      website: 'https://www.iiitb.ac.in',
      imageUrl: '/images/colleges/iiit-bangalore.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 400000,
            seats: 60,
            eligibility: 'JEE Main or institute entrance exam',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 380000,
            seats: 40,
            eligibility: 'JEE Main or institute entrance exam',
          },
          {
            name: 'M.Tech Computer Science',
            duration: 2,
            fees: 450000,
            seats: 120,
            eligibility: 'GATE qualified or IIITB entrance',
          },
          {
            name: 'M.Tech Data Science',
            duration: 2,
            fees: 450000,
            seats: 60,
            eligibility: 'GATE qualified or IIITB entrance with relevant degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1600000,
            highestPackage: 18000000,
            placementPercent: 90,
            topRecruiters: '["Google","Microsoft","Amazon","Oracle","SAP","Cisco"]',
          },
          {
            year: 2024,
            avgPackage: 1800000,
            highestPackage: 22000000,
            placementPercent: 92,
            topRecruiters: '["Google","Microsoft","Flipkart","Goldman Sachs","Adobe","Uber"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Rohan Hegde',
            rating: 4.4,
            content:
              'IIIT Bangalore\'s location in Electronic City gives great access to IT companies for internships and projects. The M.Tech program is especially well-regarded in the industry. Small batch sizes mean personalized attention.',
            pros: 'Bangalore IT ecosystem, small batches, strong M.Tech program',
            cons: 'Small campus, high fees, limited undergraduate batch size',
          },
          {
            authorName: 'Priya Bhandari',
            rating: 4.2,
            content:
              'The curriculum is very industry-aligned with courses in cloud computing, blockchain, and AI. Many students get placed in product companies. The research output per student is impressive.',
            pros: 'Industry-aligned curriculum, product company placements, research focus',
            cons: 'Campus is compact, limited sports facilities, Electronic City traffic',
          },
          {
            authorName: 'Sunil Rao',
            rating: 4.1,
            content:
              'Good institute for computer science education. The proximity to IT companies means guest lectures from industry leaders are frequent. Infin8 fest is growing in popularity.',
            pros: 'Industry guest lectures, growing fest, good placement cell',
            cons: 'Less known brand compared to IITs/NITs, limited campus life',
          },
        ],
      },
    },
  });
  console.log('Created: IIIT Bangalore');

  // --- College 36: PEC Chandigarh ---
  await prisma.college.create({
    data: {
      name: 'PEC Chandigarh',
      slug: 'pec-chandigarh',
      location: 'Chandigarh, Chandigarh',
      city: 'Chandigarh',
      state: 'Chandigarh',
      type: 'Government',
      established: 1921,
      rating: 4.0,
      fees: 130000,
      description:
        'Punjab Engineering College (now PEC University of Technology) is one of the oldest engineering colleges in India, established in Lahore in 1921 and relocated to Chandigarh after partition. Located in India\'s most planned city, PEC offers quality education in a beautiful setting.',
      website: 'https://pec.ac.in',
      imageUrl: '/images/colleges/pec-chandigarh.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 130000,
            seats: 60,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Electronics and Communication',
            duration: 4,
            fees: 130000,
            seats: 70,
            eligibility: 'JEE Main qualified with valid rank',
          },
          {
            name: 'B.Tech Mechanical Engineering',
            duration: 4,
            fees: 130000,
            seats: 80,
            eligibility: 'JEE Main qualified with valid rank',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 1000000,
            highestPackage: 11000000,
            placementPercent: 80,
            topRecruiters: '["Amazon","Samsung","Infosys","TCS","Wipro","HCL"]',
          },
          {
            year: 2024,
            avgPackage: 1100000,
            highestPackage: 13000000,
            placementPercent: 82,
            topRecruiters: '["Microsoft","Amazon","Samsung","Flipkart","Deloitte"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Gurpreet Singh',
            rating: 4.1,
            content:
              'PEC\'s location in Chandigarh is its biggest strength. The city is clean, well-planned, and offers great quality of life. The CSE branch has shown consistent improvement in placements.',
            pros: 'Chandigarh location, clean and green campus, improving placements',
            cons: 'Brand value lower than IITs/NITs, some departments have faculty shortage',
          },
          {
            authorName: 'Aditi Sharma',
            rating: 3.9,
            content:
              'Heritage college with a good alumni network in north India. The campus is spacious with good sports facilities. Pecfest is one of the biggest college fests in north India.',
            pros: 'Heritage value, Pecfest, good sports infrastructure, spacious campus',
            cons: 'Academic pace can feel slow, some labs are outdated, research output is low',
          },
          {
            authorName: 'Jaspal Bhatia',
            rating: 3.8,
            content:
              'Good backup option if you miss IITs and top NITs. Chandigarh\'s proximity to Shimla and other hill stations makes for great weekends. The coding community is growing.',
            pros: 'Proximity to hills, growing tech community, affordable education',
            cons: 'Not nationally recognized enough, placement cell could be more proactive',
          },
        ],
      },
    },
  });
  console.log('Created: PEC Chandigarh');

  // --- College 37: Amity University ---
  await prisma.college.create({
    data: {
      name: 'Amity University',
      slug: 'amity-university',
      location: 'Noida, Uttar Pradesh',
      city: 'Noida',
      state: 'Uttar Pradesh',
      type: 'Private',
      established: 2005,
      rating: 3.5,
      fees: 350000,
      description:
        'Amity University is one of India\'s largest private universities with a sprawling campus in Noida, near Delhi. Known for its diverse program offerings and industry partnerships, Amity caters to a wide range of students with varying academic backgrounds.',
      website: 'https://www.amity.edu',
      imageUrl: '/images/colleges/amity-noida.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 350000,
            seats: 500,
            eligibility: 'Amity JEE or JEE Main score with Class XII (PCM)',
          },
          {
            name: 'B.Tech CSE (AI and Machine Learning)',
            duration: 4,
            fees: 380000,
            seats: 200,
            eligibility: 'Amity JEE or JEE Main score with Class XII (PCM)',
          },
          {
            name: 'BBA',
            duration: 3,
            fees: 300000,
            seats: 300,
            eligibility: 'Class XII with minimum 50% marks',
          },
          {
            name: 'B.Sc (Hons) Biotechnology',
            duration: 3,
            fees: 280000,
            seats: 60,
            eligibility: 'Class XII with PCB and minimum 50% marks',
          },
          {
            name: 'MBA',
            duration: 2,
            fees: 600000,
            seats: 200,
            eligibility: 'CAT/MAT/Amity entrance with graduation degree',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 550000,
            highestPackage: 6000000,
            placementPercent: 65,
            topRecruiters: '["TCS","Infosys","Wipro","Cognizant","HCL","Capgemini"]',
          },
          {
            year: 2024,
            avgPackage: 620000,
            highestPackage: 7500000,
            placementPercent: 68,
            topRecruiters: '["TCS","Infosys","Accenture","Deloitte","Cognizant","IBM"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Neeraj Gupta',
            rating: 3.6,
            content:
              'Amity has great infrastructure — the campus is massive and well-maintained. However, the academic rigor could be better. Good for students who need a safety option with a decent campus experience.',
            pros: 'Huge campus, good infrastructure, diverse programs, Delhi-NCR location',
            cons: 'Academic standards could be higher, high fees for the value, placement stats are mixed',
          },
          {
            authorName: 'Ananya Mehta',
            rating: 3.4,
            content:
              'The university offers many programs but quality varies across departments. Marketing and branding is strong but actual education quality depends on individual faculty. Self-motivated students can do well here.',
            pros: 'Wide program range, modern campus, industry seminars, cultural events',
            cons: 'Inconsistent faculty quality, mass recruitment dominates placements, overpriced',
          },
          {
            authorName: 'Sahil Kapoor',
            rating: 3.3,
            content:
              'The campus life is vibrant with numerous events and clubs. Proximity to Noida\'s corporate offices helps with internships. However, the brand doesn\'t carry the same weight as government colleges.',
            pros: 'Vibrant campus life, Noida corporate access, many clubs and events',
            cons: 'Brand perception issues, average placements outside top students, strict attendance',
          },
        ],
      },
    },
  });
  console.log('Created: Amity University');

  // --- College 38: Lovely Professional University ---
  await prisma.college.create({
    data: {
      name: 'Lovely Professional University',
      slug: 'lovely-professional-university',
      location: 'Phagwara, Punjab',
      city: 'Phagwara',
      state: 'Punjab',
      type: 'Private',
      established: 2005,
      rating: 3.4,
      fees: 250000,
      description:
        'Lovely Professional University is one of India\'s largest single-campus universities, spread over 600 acres in Phagwara, Punjab. With students from all states and over 30 countries, LPU offers a diverse campus experience with a wide range of programs.',
      website: 'https://www.lpu.in',
      imageUrl: '/images/colleges/lpu-phagwara.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 250000,
            seats: 700,
            eligibility: 'LPUNEST or JEE Main score with Class XII (PCM)',
          },
          {
            name: 'B.Tech Mechanical Engineering',
            duration: 4,
            fees: 220000,
            seats: 300,
            eligibility: 'LPUNEST or JEE Main score with Class XII (PCM)',
          },
          {
            name: 'B.Des Fashion Design',
            duration: 4,
            fees: 200000,
            seats: 60,
            eligibility: 'LPUNEST design aptitude test',
          },
          {
            name: 'MBA',
            duration: 2,
            fees: 350000,
            seats: 300,
            eligibility: 'CAT/MAT/LPUNEST with graduation degree',
          },
          {
            name: 'B.Pharm Pharmacy',
            duration: 4,
            fees: 180000,
            seats: 100,
            eligibility: 'Class XII with PCB/PCM minimum 50%',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 500000,
            highestPackage: 5200000,
            placementPercent: 60,
            topRecruiters: '["TCS","Infosys","Wipro","Byjus","HCL","Cognizant"]',
          },
          {
            year: 2024,
            avgPackage: 560000,
            highestPackage: 6000000,
            placementPercent: 63,
            topRecruiters: '["Amazon","TCS","Infosys","Accenture","Wipro","Tech Mahindra"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Ravi Verma',
            rating: 3.5,
            content:
              'LPU\'s massive campus is impressive with its own shopping mall, stadium, and lakefront. The One Week One Lab concept is innovative. However, the large student body means competition for placements is intense.',
            pros: 'Huge campus with amenities, innovative teaching methods, diverse student body',
            cons: 'Very large batches, placement quality varies, Phagwara has limited options',
          },
          {
            authorName: 'Sneha Kashyap',
            rating: 3.3,
            content:
              'Campus life is vibrant with many cultural events. The international student presence adds diversity. Faculty quality is improving but still inconsistent. Top students get good opportunities.',
            pros: 'Cultural diversity, improving faculty, good sports facilities',
            cons: 'Inconsistent academic quality, aggressive marketing sometimes overpromises',
          },
          {
            authorName: 'Mohammed Asif',
            rating: 3.2,
            content:
              'Good option for students from smaller cities who want a large university experience. The campus facilities are genuinely impressive. However, self-effort matters more than the brand name here.',
            pros: 'Impressive facilities, accessible admission, exposure to diversity',
            cons: 'Brand value needs improvement, mass recruiter focused, remote location',
          },
        ],
      },
    },
  });
  console.log('Created: Lovely Professional University');

  // --- College 39: Symbiosis Institute of Technology ---
  await prisma.college.create({
    data: {
      name: 'Symbiosis Institute of Technology',
      slug: 'symbiosis-institute-of-technology',
      location: 'Pune, Maharashtra',
      city: 'Pune',
      state: 'Maharashtra',
      type: 'Deemed',
      established: 2008,
      rating: 3.8,
      fees: 400000,
      description:
        'Symbiosis Institute of Technology is part of the prestigious Symbiosis International University in Pune. Known for its interdisciplinary approach and the broader Symbiosis ecosystem, SIT offers a unique engineering education with strong management and liberal arts exposure.',
      website: 'https://www.sitpune.edu.in',
      imageUrl: '/images/colleges/sit-pune.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 400000,
            seats: 120,
            eligibility: 'SET Engineering entrance exam',
          },
          {
            name: 'B.Tech Artificial Intelligence and Machine Learning',
            duration: 4,
            fees: 420000,
            seats: 60,
            eligibility: 'SET Engineering entrance exam',
          },
          {
            name: 'B.Tech Electronics and Telecommunication',
            duration: 4,
            fees: 380000,
            seats: 60,
            eligibility: 'SET Engineering entrance exam',
          },
          {
            name: 'M.Tech Computer Science',
            duration: 2,
            fees: 300000,
            seats: 20,
            eligibility: 'GATE qualified or Symbiosis entrance test',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 800000,
            highestPackage: 9000000,
            placementPercent: 78,
            topRecruiters: '["Infosys","TCS","Persistent","Cognizant","Capgemini","Accenture"]',
          },
          {
            year: 2024,
            avgPackage: 900000,
            highestPackage: 11000000,
            placementPercent: 80,
            topRecruiters: '["Amazon","Microsoft","Persistent","Infosys","TCS","Veritas"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Tanmay Deshmukh',
            rating: 3.9,
            content:
              'Symbiosis\'s Lavale campus is modern and well-designed. The interdisciplinary exposure through other Symbiosis institutes is a unique advantage. You can take electives from SIU\'s management and law schools.',
            pros: 'Interdisciplinary learning, modern campus, Symbiosis brand, Pune location',
            cons: 'Lavale campus is far from city, relatively new so alumni network is growing',
          },
          {
            authorName: 'Rhea Khanna',
            rating: 3.7,
            content:
              'The Symbiosis ecosystem means you interact with students from management, law, and design schools. Campus facilities are excellent. However, the engineering program is still establishing its reputation.',
            pros: 'Cross-disciplinary exposure, excellent facilities, Pune weather',
            cons: 'Engineering reputation still building, fewer top-tier company visits',
          },
          {
            authorName: 'Vaibhav Patil',
            rating: 3.6,
            content:
              'Good emerging engineering institute backed by the Symbiosis brand. The AI/ML specialization is well-structured. Techfest TechNext is growing. Persistent Systems recruits heavily here.',
            pros: 'Symbiosis brand, growing AI program, Persistent Systems connection',
            cons: 'High fees for a new institute, limited alumni in tech, campus transport is limited',
          },
        ],
      },
    },
  });
  console.log('Created: Symbiosis Institute of Technology');

  // --- College 40: Christ University ---
  await prisma.college.create({
    data: {
      name: 'Christ University',
      slug: 'christ-university',
      location: 'Bangalore, Karnataka',
      city: 'Bangalore',
      state: 'Karnataka',
      type: 'Deemed',
      established: 1969,
      rating: 3.7,
      fees: 280000,
      description:
        'Christ University is a deemed-to-be-university in Bangalore, known for its strong liberal arts and commerce programs alongside growing engineering and management schools. The central Bangalore location and emphasis on holistic education attract students from across India.',
      website: 'https://christuniversity.in',
      imageUrl: '/images/colleges/christ-university.jpg',
      courses: {
        create: [
          {
            name: 'B.Tech Computer Science and Engineering',
            duration: 4,
            fees: 280000,
            seats: 60,
            eligibility: 'Christ University entrance test with Class XII (PCM)',
          },
          {
            name: 'BBA',
            duration: 3,
            fees: 250000,
            seats: 180,
            eligibility: 'Christ University entrance test with Class XII',
          },
          {
            name: 'B.Com (Hons)',
            duration: 3,
            fees: 150000,
            seats: 200,
            eligibility: 'Christ University entrance test with Class XII',
          },
          {
            name: 'MBA',
            duration: 2,
            fees: 600000,
            seats: 120,
            eligibility: 'CAT/MAT/Christ entrance with graduation degree',
          },
          {
            name: 'BA (Hons) Psychology',
            duration: 3,
            fees: 180000,
            seats: 80,
            eligibility: 'Christ University entrance test with Class XII',
          },
        ],
      },
      placements: {
        create: [
          {
            year: 2023,
            avgPackage: 650000,
            highestPackage: 7000000,
            placementPercent: 75,
            topRecruiters: '["Deloitte","KPMG","EY","TCS","Infosys","Wipro"]',
          },
          {
            year: 2024,
            avgPackage: 720000,
            highestPackage: 8500000,
            placementPercent: 78,
            topRecruiters: '["Deloitte","EY","Amazon","Goldman Sachs","KPMG","Accenture"]',
          },
        ],
      },
      reviews: {
        create: [
          {
            authorName: 'Reshma D\'Souza',
            rating: 3.8,
            content:
              'Christ University\'s central Bangalore location in Hosur Road is unbeatable. The BBA and B.Com programs are among the best in south India. The campus is compact but well-maintained.',
            pros: 'Central Bangalore location, strong BBA/B.Com, well-maintained campus',
            cons: 'Very strict rules, mandatory attendance, limited engineering reputation',
          },
          {
            authorName: 'Akshay Nair',
            rating: 3.7,
            content:
              'Good all-round university for commerce and management. The holistic education approach with emphasis on ethics and communication is valuable. Blossoms fest is a highlight.',
            pros: 'Holistic education, strong commerce program, cultural events',
            cons: 'Strict discipline policy, limited freedom, not ideal for engineering',
          },
          {
            authorName: 'Devika Pillai',
            rating: 3.5,
            content:
              'Christ is known for its discipline which can be both a pro and con. The MBA placements are decent with Big 4 companies recruiting regularly. The psychology department is one of the best in India.',
            pros: 'Big 4 recruiting, excellent psychology program, structured environment',
            cons: 'Over-emphasis on rules, high fees for non-engineering, limited campus size',
          },
        ],
      },
    },
  });
  console.log('Created: Christ University');

  console.log('\n🎉 Database seeded successfully with 40 colleges!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
