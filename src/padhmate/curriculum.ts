// NCERT chapter lists for Classes 6–12 (current editions), used to organise PathshalaX lessons.
// Generated from the NCERT e-textbook catalogue. Links open the free official NCERT textbook chapter.
export type Chapter = { id: string; title: string; book: string; code: string; n: number; of: number };
export type Subject = { id: string; name: string; icon: string; books: { title: string; code: string }[]; chapters: Chapter[] };

export const CLASS_LEVELS = [6, 7, 8, 9, 10, 11, 12] as const;
export type ClassLevel = (typeof CLASS_LEVELS)[number];

export const CURRICULUM: Record<ClassLevel, Subject[]> = {
 "6": [
  {
   "id": "mathematics",
   "name": "Mathematics",
   "icon": "📐",
   "books": [
    {
     "title": "Ganita Prakash",
     "code": "fegp1"
    }
   ],
   "chapters": [
    {
     "title": "Patterns in Mathematics",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 1,
     "of": 10,
     "id": "6-mathematics-1"
    },
    {
     "title": "Lines and Angles",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 2,
     "of": 10,
     "id": "6-mathematics-2"
    },
    {
     "title": "Number Play",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 3,
     "of": 10,
     "id": "6-mathematics-3"
    },
    {
     "title": "Data Handling and Presentation",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 4,
     "of": 10,
     "id": "6-mathematics-4"
    },
    {
     "title": "Prime Time",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 5,
     "of": 10,
     "id": "6-mathematics-5"
    },
    {
     "title": "Perimeter and Area",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 6,
     "of": 10,
     "id": "6-mathematics-6"
    },
    {
     "title": "Fractions",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 7,
     "of": 10,
     "id": "6-mathematics-7"
    },
    {
     "title": "Playing with Constructions",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 8,
     "of": 10,
     "id": "6-mathematics-8"
    },
    {
     "title": "Symmetry",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 9,
     "of": 10,
     "id": "6-mathematics-9"
    },
    {
     "title": "The Other Side of Zero",
     "book": "Ganita Prakash",
     "code": "fegp1",
     "n": 10,
     "of": 10,
     "id": "6-mathematics-10"
    }
   ]
  },
  {
   "id": "science",
   "name": "Science",
   "icon": "🔬",
   "books": [
    {
     "title": "Curiosity",
     "code": "fecu1"
    }
   ],
   "chapters": [
    {
     "title": "The Wonderful World of Science",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 1,
     "of": 12,
     "id": "6-science-1"
    },
    {
     "title": "Diversity in the Living World",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 2,
     "of": 12,
     "id": "6-science-2"
    },
    {
     "title": "Mindful Eating: A Path to a Healthy Body",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 3,
     "of": 12,
     "id": "6-science-3"
    },
    {
     "title": "Exploring Magnets",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 4,
     "of": 12,
     "id": "6-science-4"
    },
    {
     "title": "Measurement of Length and Motion",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 5,
     "of": 12,
     "id": "6-science-5"
    },
    {
     "title": "Materials Around Us",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 6,
     "of": 12,
     "id": "6-science-6"
    },
    {
     "title": "Temperature and its Measurement",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 7,
     "of": 12,
     "id": "6-science-7"
    },
    {
     "title": "A Journey through States of Water",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 8,
     "of": 12,
     "id": "6-science-8"
    },
    {
     "title": "Methods of Separation in Everyday Life",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 9,
     "of": 12,
     "id": "6-science-9"
    },
    {
     "title": "Living Creatures: Exploring their Characteristics",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 10,
     "of": 12,
     "id": "6-science-10"
    },
    {
     "title": "Nature’s Treasures",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 11,
     "of": 12,
     "id": "6-science-11"
    },
    {
     "title": "Beyond Earth",
     "book": "Curiosity",
     "code": "fecu1",
     "n": 12,
     "of": 12,
     "id": "6-science-12"
    }
   ]
  },
  {
   "id": "social-science",
   "name": "Social Science",
   "icon": "🌏",
   "books": [
    {
     "title": "Exploring Society India and Beyond",
     "code": "fees1"
    }
   ],
   "chapters": [
    {
     "title": "Locating Places on the Earth",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 1,
     "of": 14,
     "id": "6-social-science-1"
    },
    {
     "title": "Oceans and Continents",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 2,
     "of": 14,
     "id": "6-social-science-2"
    },
    {
     "title": "Landforms and Life",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 3,
     "of": 14,
     "id": "6-social-science-3"
    },
    {
     "title": "Timeline and Sources of History",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 4,
     "of": 14,
     "id": "6-social-science-4"
    },
    {
     "title": "India, That Is Bharat",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 5,
     "of": 14,
     "id": "6-social-science-5"
    },
    {
     "title": "The Beginnings of Indian Civilisation",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 6,
     "of": 14,
     "id": "6-social-science-6"
    },
    {
     "title": "India’s Cultural Roots",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 7,
     "of": 14,
     "id": "6-social-science-7"
    },
    {
     "title": "Unity in Diversity, or Many in the One",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 8,
     "of": 14,
     "id": "6-social-science-8"
    },
    {
     "title": "Family and Community",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 9,
     "of": 14,
     "id": "6-social-science-9"
    },
    {
     "title": "Grassroots Democracy — Part 1: Governance",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 10,
     "of": 14,
     "id": "6-social-science-10"
    },
    {
     "title": "Grassroots Democracy — Part 2: Local Government in Rural Areas",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 11,
     "of": 14,
     "id": "6-social-science-11"
    },
    {
     "title": "Grassroots Democracy — Part 3: Local Government in Urban Areas",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 12,
     "of": 14,
     "id": "6-social-science-12"
    },
    {
     "title": "The Value of Work",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 13,
     "of": 14,
     "id": "6-social-science-13"
    },
    {
     "title": "Economic Activities Around Us",
     "book": "Exploring Society India and Beyond",
     "code": "fees1",
     "n": 14,
     "of": 14,
     "id": "6-social-science-14"
    }
   ]
  },
  {
   "id": "english",
   "name": "English",
   "icon": "📖",
   "books": [
    {
     "title": "Poorvi",
     "code": "fepr1"
    }
   ],
   "chapters": [
    {
     "title": "Fables and Folk Tales",
     "book": "Poorvi",
     "code": "fepr1",
     "n": 1,
     "of": 5,
     "id": "6-english-1"
    },
    {
     "title": "Friendship",
     "book": "Poorvi",
     "code": "fepr1",
     "n": 2,
     "of": 5,
     "id": "6-english-2"
    },
    {
     "title": "Nurturing Nature",
     "book": "Poorvi",
     "code": "fepr1",
     "n": 3,
     "of": 5,
     "id": "6-english-3"
    },
    {
     "title": "Sports and Wellness",
     "book": "Poorvi",
     "code": "fepr1",
     "n": 4,
     "of": 5,
     "id": "6-english-4"
    },
    {
     "title": "Culture and Tradition",
     "book": "Poorvi",
     "code": "fepr1",
     "n": 5,
     "of": 5,
     "id": "6-english-5"
    }
   ]
  }
 ],
 "7": [
  {
   "id": "mathematics",
   "name": "Mathematics",
   "icon": "📐",
   "books": [
    {
     "title": "Ganita Prakash",
     "code": "gegp1"
    },
    {
     "title": "Ganita Prakash-II",
     "code": "gegp2"
    }
   ],
   "chapters": [
    {
     "title": "Large Numbers Around Us",
     "book": "Ganita Prakash",
     "code": "gegp1",
     "n": 1,
     "of": 8,
     "id": "7-mathematics-1"
    },
    {
     "title": "Arithmetic Expressions",
     "book": "Ganita Prakash",
     "code": "gegp1",
     "n": 2,
     "of": 8,
     "id": "7-mathematics-2"
    },
    {
     "title": "A Peek Beyond the Point",
     "book": "Ganita Prakash",
     "code": "gegp1",
     "n": 3,
     "of": 8,
     "id": "7-mathematics-3"
    },
    {
     "title": "Expressions using Letter-Numbers",
     "book": "Ganita Prakash",
     "code": "gegp1",
     "n": 4,
     "of": 8,
     "id": "7-mathematics-4"
    },
    {
     "title": "Parallel and Intersecting Lines",
     "book": "Ganita Prakash",
     "code": "gegp1",
     "n": 5,
     "of": 8,
     "id": "7-mathematics-5"
    },
    {
     "title": "Number Play",
     "book": "Ganita Prakash",
     "code": "gegp1",
     "n": 6,
     "of": 8,
     "id": "7-mathematics-6"
    },
    {
     "title": "A Tale of Three Intersecting Lines",
     "book": "Ganita Prakash",
     "code": "gegp1",
     "n": 7,
     "of": 8,
     "id": "7-mathematics-7"
    },
    {
     "title": "Working with Fractions",
     "book": "Ganita Prakash",
     "code": "gegp1",
     "n": 8,
     "of": 8,
     "id": "7-mathematics-8"
    },
    {
     "title": "Geometric Twins",
     "book": "Ganita Prakash-II",
     "code": "gegp2",
     "n": 1,
     "of": 7,
     "id": "7-mathematics-9"
    },
    {
     "title": "Operations with Integers",
     "book": "Ganita Prakash-II",
     "code": "gegp2",
     "n": 2,
     "of": 7,
     "id": "7-mathematics-10"
    },
    {
     "title": "Finding Common Ground",
     "book": "Ganita Prakash-II",
     "code": "gegp2",
     "n": 3,
     "of": 7,
     "id": "7-mathematics-11"
    },
    {
     "title": "Another Peek Beyond the Point",
     "book": "Ganita Prakash-II",
     "code": "gegp2",
     "n": 4,
     "of": 7,
     "id": "7-mathematics-12"
    },
    {
     "title": "Connecting the Dots...",
     "book": "Ganita Prakash-II",
     "code": "gegp2",
     "n": 5,
     "of": 7,
     "id": "7-mathematics-13"
    },
    {
     "title": "Constructions and Tilings",
     "book": "Ganita Prakash-II",
     "code": "gegp2",
     "n": 6,
     "of": 7,
     "id": "7-mathematics-14"
    },
    {
     "title": "Finding the Unknown",
     "book": "Ganita Prakash-II",
     "code": "gegp2",
     "n": 7,
     "of": 7,
     "id": "7-mathematics-15"
    }
   ]
  },
  {
   "id": "science",
   "name": "Science",
   "icon": "🔬",
   "books": [
    {
     "title": "Curiosity",
     "code": "gecu1"
    }
   ],
   "chapters": [
    {
     "title": "The Ever-Evolving World of Science",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 1,
     "of": 12,
     "id": "7-science-1"
    },
    {
     "title": "Exploring Substances: Acidic, Basic, and Neutral",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 2,
     "of": 12,
     "id": "7-science-2"
    },
    {
     "title": "Electricity: Circuits and their Components",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 3,
     "of": 12,
     "id": "7-science-3"
    },
    {
     "title": "The World of Metals and Non-metals",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 4,
     "of": 12,
     "id": "7-science-4"
    },
    {
     "title": "Changes Around Us: Physical and Chemical",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 5,
     "of": 12,
     "id": "7-science-5"
    },
    {
     "title": "Adolescence: A Stage of Growth and Change",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 6,
     "of": 12,
     "id": "7-science-6"
    },
    {
     "title": "Heat Transfer in Nature",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 7,
     "of": 12,
     "id": "7-science-7"
    },
    {
     "title": "Measurement of Time and Motion",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 8,
     "of": 12,
     "id": "7-science-8"
    },
    {
     "title": "Life Processes in Animals",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 9,
     "of": 12,
     "id": "7-science-9"
    },
    {
     "title": "Life Processes in Plants",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 10,
     "of": 12,
     "id": "7-science-10"
    },
    {
     "title": "Light: Shadows and Reflection",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 11,
     "of": 12,
     "id": "7-science-11"
    },
    {
     "title": "Earth, Moon, and the Sun",
     "book": "Curiosity",
     "code": "gecu1",
     "n": 12,
     "of": 12,
     "id": "7-science-12"
    }
   ]
  },
  {
   "id": "social-science",
   "name": "Social Science",
   "icon": "🌏",
   "books": [
    {
     "title": "Exploring Society India and Beyond Part-I",
     "code": "gees1"
    },
    {
     "title": "Exploring Society India and Beyond Part-II",
     "code": "gees2"
    }
   ],
   "chapters": [
    {
     "title": "Geographical Diversity of India",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 1,
     "of": 12,
     "id": "7-social-science-1"
    },
    {
     "title": "Understanding the Weather",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 2,
     "of": 12,
     "id": "7-social-science-2"
    },
    {
     "title": "Climates of India",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 3,
     "of": 12,
     "id": "7-social-science-3"
    },
    {
     "title": "New Beginnings: Cities and States",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 4,
     "of": 12,
     "id": "7-social-science-4"
    },
    {
     "title": "The Rise of Empires",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 5,
     "of": 12,
     "id": "7-social-science-5"
    },
    {
     "title": "The Age of Reorganisation",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 6,
     "of": 12,
     "id": "7-social-science-6"
    },
    {
     "title": "The Gupta Era: An Age of Tireless Creativity",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 7,
     "of": 12,
     "id": "7-social-science-7"
    },
    {
     "title": "How the Land Becomes Sacred",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 8,
     "of": 12,
     "id": "7-social-science-8"
    },
    {
     "title": "From the Rulers to the RULED: Types of Governments",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 9,
     "of": 12,
     "id": "7-social-science-9"
    },
    {
     "title": "The Constitution of India — An Introduction",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 10,
     "of": 12,
     "id": "7-social-science-10"
    },
    {
     "title": "From Barter to Money",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 11,
     "of": 12,
     "id": "7-social-science-11"
    },
    {
     "title": "Understanding Markets",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "gees1",
     "n": 12,
     "of": 12,
     "id": "7-social-science-12"
    },
    {
     "title": "The Story of Indian Farming",
     "book": "Exploring Society India and Beyond Part-II",
     "code": "gees2",
     "n": 1,
     "of": 8,
     "id": "7-social-science-13"
    },
    {
     "title": "India and Her Neighbours",
     "book": "Exploring Society India and Beyond Part-II",
     "code": "gees2",
     "n": 2,
     "of": 8,
     "id": "7-social-science-14"
    },
    {
     "title": "Empires and Kingdoms: 6th to 10th Centuries",
     "book": "Exploring Society India and Beyond Part-II",
     "code": "gees2",
     "n": 3,
     "of": 8,
     "id": "7-social-science-15"
    },
    {
     "title": "Turning Tides: 11th and 12th Centuries",
     "book": "Exploring Society India and Beyond Part-II",
     "code": "gees2",
     "n": 4,
     "of": 8,
     "id": "7-social-science-16"
    },
    {
     "title": "India, a Home to Many",
     "book": "Exploring Society India and Beyond Part-II",
     "code": "gees2",
     "n": 5,
     "of": 8,
     "id": "7-social-science-17"
    },
    {
     "title": "The State, the Government, and You",
     "book": "Exploring Society India and Beyond Part-II",
     "code": "gees2",
     "n": 6,
     "of": 8,
     "id": "7-social-science-18"
    },
    {
     "title": "Infrastructure: Engine of India's Development",
     "book": "Exploring Society India and Beyond Part-II",
     "code": "gees2",
     "n": 7,
     "of": 8,
     "id": "7-social-science-19"
    },
    {
     "title": "Banks and the Magic of Finance",
     "book": "Exploring Society India and Beyond Part-II",
     "code": "gees2",
     "n": 8,
     "of": 8,
     "id": "7-social-science-20"
    }
   ]
  },
  {
   "id": "english",
   "name": "English",
   "icon": "📖",
   "books": [
    {
     "title": "Poorvi",
     "code": "gepr1"
    }
   ],
   "chapters": [
    {
     "title": "The Day the River Spoke",
     "book": "Poorvi · Learning Together",
     "code": "gepr1",
     "n": 1,
     "of": 5,
     "id": "7-english-1"
    },
    {
     "title": "Try Again",
     "book": "Poorvi · Learning Together",
     "code": "gepr1",
     "n": 1,
     "of": 5,
     "id": "7-english-2"
    },
    {
     "title": "Three Days to See",
     "book": "Poorvi · Learning Together",
     "code": "gepr1",
     "n": 1,
     "of": 5,
     "id": "7-english-3"
    },
    {
     "title": "Animals, Birds, and Dr. Dolittle",
     "book": "Poorvi · Wit and Humour",
     "code": "gepr1",
     "n": 2,
     "of": 5,
     "id": "7-english-4"
    },
    {
     "title": "A Funny Man",
     "book": "Poorvi · Wit and Humour",
     "code": "gepr1",
     "n": 2,
     "of": 5,
     "id": "7-english-5"
    },
    {
     "title": "Say the Right Thing",
     "book": "Poorvi · Wit and Humour",
     "code": "gepr1",
     "n": 2,
     "of": 5,
     "id": "7-english-6"
    },
    {
     "title": "My Brother’s Great Invention",
     "book": "Poorvi · Dreams and Discoveries",
     "code": "gepr1",
     "n": 3,
     "of": 5,
     "id": "7-english-7"
    },
    {
     "title": "Paper Boats",
     "book": "Poorvi · Dreams and Discoveries",
     "code": "gepr1",
     "n": 3,
     "of": 5,
     "id": "7-english-8"
    },
    {
     "title": "North, South, East, West",
     "book": "Poorvi · Dreams and Discoveries",
     "code": "gepr1",
     "n": 3,
     "of": 5,
     "id": "7-english-9"
    },
    {
     "title": "The Tunnel",
     "book": "Poorvi · Travel and Adventure",
     "code": "gepr1",
     "n": 4,
     "of": 5,
     "id": "7-english-10"
    },
    {
     "title": "Travel",
     "book": "Poorvi · Travel and Adventure",
     "code": "gepr1",
     "n": 4,
     "of": 5,
     "id": "7-english-11"
    },
    {
     "title": "Conquering the Summit",
     "book": "Poorvi · Travel and Adventure",
     "code": "gepr1",
     "n": 4,
     "of": 5,
     "id": "7-english-12"
    },
    {
     "title": "A Homage to Our Brave Soldiers",
     "book": "Poorvi · Bravehearts",
     "code": "gepr1",
     "n": 5,
     "of": 5,
     "id": "7-english-13"
    },
    {
     "title": "My Dear Soldiers",
     "book": "Poorvi · Bravehearts",
     "code": "gepr1",
     "n": 5,
     "of": 5,
     "id": "7-english-14"
    },
    {
     "title": "Rani Abbakka",
     "book": "Poorvi · Bravehearts",
     "code": "gepr1",
     "n": 5,
     "of": 5,
     "id": "7-english-15"
    }
   ]
  }
 ],
 "8": [
  {
   "id": "mathematics",
   "name": "Mathematics",
   "icon": "📐",
   "books": [
    {
     "title": "Ganita Prakash Part-I",
     "code": "hegp1"
    },
    {
     "title": "Ganita Prakash Part-II",
     "code": "hegp2"
    }
   ],
   "chapters": [
    {
     "title": "A Square and A Cube",
     "book": "Ganita Prakash Part-I",
     "code": "hegp1",
     "n": 1,
     "of": 7,
     "id": "8-mathematics-1"
    },
    {
     "title": "Power Play",
     "book": "Ganita Prakash Part-I",
     "code": "hegp1",
     "n": 2,
     "of": 7,
     "id": "8-mathematics-2"
    },
    {
     "title": "A Story of Numbers",
     "book": "Ganita Prakash Part-I",
     "code": "hegp1",
     "n": 3,
     "of": 7,
     "id": "8-mathematics-3"
    },
    {
     "title": "Quadrilaterals",
     "book": "Ganita Prakash Part-I",
     "code": "hegp1",
     "n": 4,
     "of": 7,
     "id": "8-mathematics-4"
    },
    {
     "title": "Number Play",
     "book": "Ganita Prakash Part-I",
     "code": "hegp1",
     "n": 5,
     "of": 7,
     "id": "8-mathematics-5"
    },
    {
     "title": "We Distribute, Yet Things Multiply",
     "book": "Ganita Prakash Part-I",
     "code": "hegp1",
     "n": 6,
     "of": 7,
     "id": "8-mathematics-6"
    },
    {
     "title": "Proportional Reasoning–1",
     "book": "Ganita Prakash Part-I",
     "code": "hegp1",
     "n": 7,
     "of": 7,
     "id": "8-mathematics-7"
    },
    {
     "title": "Fractions in Disguise",
     "book": "Ganita Prakash Part-II",
     "code": "hegp2",
     "n": 1,
     "of": 7,
     "id": "8-mathematics-8"
    },
    {
     "title": "The Baudhayana-Pythagoras Theorem",
     "book": "Ganita Prakash Part-II",
     "code": "hegp2",
     "n": 2,
     "of": 7,
     "id": "8-mathematics-9"
    },
    {
     "title": "Proportional Reasoning-2",
     "book": "Ganita Prakash Part-II",
     "code": "hegp2",
     "n": 3,
     "of": 7,
     "id": "8-mathematics-10"
    },
    {
     "title": "Exploring Some Geometric Themes",
     "book": "Ganita Prakash Part-II",
     "code": "hegp2",
     "n": 4,
     "of": 7,
     "id": "8-mathematics-11"
    },
    {
     "title": "Tales by Dots and Lines",
     "book": "Ganita Prakash Part-II",
     "code": "hegp2",
     "n": 5,
     "of": 7,
     "id": "8-mathematics-12"
    },
    {
     "title": "Algebra Play",
     "book": "Ganita Prakash Part-II",
     "code": "hegp2",
     "n": 6,
     "of": 7,
     "id": "8-mathematics-13"
    },
    {
     "title": "Area",
     "book": "Ganita Prakash Part-II",
     "code": "hegp2",
     "n": 7,
     "of": 7,
     "id": "8-mathematics-14"
    }
   ]
  },
  {
   "id": "science",
   "name": "Science",
   "icon": "🔬",
   "books": [
    {
     "title": "Curiosity",
     "code": "hecu1"
    }
   ],
   "chapters": [
    {
     "title": "Exploring the Investigative World of Science",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 1,
     "of": 13,
     "id": "8-science-1"
    },
    {
     "title": "The Invisible Living World: Beyond Our Naked Eye",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 2,
     "of": 13,
     "id": "8-science-2"
    },
    {
     "title": "Health: The Ultimate Treasure",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 3,
     "of": 13,
     "id": "8-science-3"
    },
    {
     "title": "Electricity: Magnetic and Heating Effects",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 4,
     "of": 13,
     "id": "8-science-4"
    },
    {
     "title": "Exploring Forces",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 5,
     "of": 13,
     "id": "8-science-5"
    },
    {
     "title": "Pressure, Winds, Storms, and Cyclones",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 6,
     "of": 13,
     "id": "8-science-6"
    },
    {
     "title": "Particulate Nature of Matter",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 7,
     "of": 13,
     "id": "8-science-7"
    },
    {
     "title": "Nature of Matter: Elements, Compounds, and Mixtures",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 8,
     "of": 13,
     "id": "8-science-8"
    },
    {
     "title": "The Amazing World of Solutes, Solvents, and Solutions",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 9,
     "of": 13,
     "id": "8-science-9"
    },
    {
     "title": "Light: Mirrors and Lenses",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 10,
     "of": 13,
     "id": "8-science-10"
    },
    {
     "title": "Keeping Time with the Skies",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 11,
     "of": 13,
     "id": "8-science-11"
    },
    {
     "title": "How Nature Works in Harmony",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 12,
     "of": 13,
     "id": "8-science-12"
    },
    {
     "title": "Our Home: Earth, a Unique Life Sustaining Planet",
     "book": "Curiosity",
     "code": "hecu1",
     "n": 13,
     "of": 13,
     "id": "8-science-13"
    }
   ]
  },
  {
   "id": "social-science",
   "name": "Social Science",
   "icon": "🌏",
   "books": [
    {
     "title": "Exploring Society India and Beyond Part-I",
     "code": "hees1"
    }
   ],
   "chapters": [
    {
     "title": "Natural Resources and Their Use",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "hees1",
     "n": 1,
     "of": 7,
     "id": "8-social-science-1"
    },
    {
     "title": "Reshaping India’s Political Map",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "hees1",
     "n": 2,
     "of": 7,
     "id": "8-social-science-2"
    },
    {
     "title": "The Rise of the Marathas",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "hees1",
     "n": 3,
     "of": 7,
     "id": "8-social-science-3"
    },
    {
     "title": "The Colonial Era in India",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "hees1",
     "n": 4,
     "of": 7,
     "id": "8-social-science-4"
    },
    {
     "title": "Universal Franchise and India’s Electoral System",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "hees1",
     "n": 5,
     "of": 7,
     "id": "8-social-science-5"
    },
    {
     "title": "The Parliamentary System: Legislature and Executive",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "hees1",
     "n": 6,
     "of": 7,
     "id": "8-social-science-6"
    },
    {
     "title": "Factors of Production",
     "book": "Exploring Society India and Beyond Part-I",
     "code": "hees1",
     "n": 7,
     "of": 7,
     "id": "8-social-science-7"
    }
   ]
  },
  {
   "id": "english",
   "name": "English",
   "icon": "📖",
   "books": [
    {
     "title": "Poorvi",
     "code": "hepr1"
    }
   ],
   "chapters": [
    {
     "title": "The Wit that Won Hearts",
     "book": "Poorvi · Wit and Wisdom",
     "code": "hepr1",
     "n": 1,
     "of": 5,
     "id": "8-english-1"
    },
    {
     "title": "A Concrete Example",
     "book": "Poorvi · Wit and Wisdom",
     "code": "hepr1",
     "n": 1,
     "of": 5,
     "id": "8-english-2"
    },
    {
     "title": "Wisdom Paves the Way",
     "book": "Poorvi · Wit and Wisdom",
     "code": "hepr1",
     "n": 1,
     "of": 5,
     "id": "8-english-3"
    },
    {
     "title": "A Tale of Valour",
     "book": "Poorvi · Values and Dispositions",
     "code": "hepr1",
     "n": 2,
     "of": 5,
     "id": "8-english-4"
    },
    {
     "title": "Somebody’s Mother",
     "book": "Poorvi · Values and Dispositions",
     "code": "hepr1",
     "n": 2,
     "of": 5,
     "id": "8-english-5"
    },
    {
     "title": "Verghese Kurien",
     "book": "Poorvi · Values and Dispositions",
     "code": "hepr1",
     "n": 2,
     "of": 5,
     "id": "8-english-6"
    },
    {
     "title": "The Case of the Fifth Word",
     "book": "Poorvi · Mystery and Magic",
     "code": "hepr1",
     "n": 3,
     "of": 5,
     "id": "8-english-7"
    },
    {
     "title": "The Magic Brush of Dreams",
     "book": "Poorvi · Mystery and Magic",
     "code": "hepr1",
     "n": 3,
     "of": 5,
     "id": "8-english-8"
    },
    {
     "title": "Spectacular Wonders",
     "book": "Poorvi · Mystery and Magic",
     "code": "hepr1",
     "n": 3,
     "of": 5,
     "id": "8-english-9"
    },
    {
     "title": "The Cherry Tree",
     "book": "Poorvi · Environment",
     "code": "hepr1",
     "n": 4,
     "of": 5,
     "id": "8-english-10"
    },
    {
     "title": "Harvest Hymn",
     "book": "Poorvi · Environment",
     "code": "hepr1",
     "n": 4,
     "of": 5,
     "id": "8-english-11"
    },
    {
     "title": "Waiting for the Rain",
     "book": "Poorvi · Environment",
     "code": "hepr1",
     "n": 4,
     "of": 5,
     "id": "8-english-12"
    },
    {
     "title": "Feathered Friend",
     "book": "Poorvi · Science and Curiosity",
     "code": "hepr1",
     "n": 5,
     "of": 5,
     "id": "8-english-13"
    },
    {
     "title": "Magnifying Glass",
     "book": "Poorvi · Science and Curiosity",
     "code": "hepr1",
     "n": 5,
     "of": 5,
     "id": "8-english-14"
    },
    {
     "title": "Bibha Chowdhuri",
     "book": "Poorvi · Science and Curiosity",
     "code": "hepr1",
     "n": 5,
     "of": 5,
     "id": "8-english-15"
    }
   ]
  }
 ],
 "9": [
  {
   "id": "mathematics",
   "name": "Mathematics",
   "icon": "📐",
   "books": [
    {
     "title": "Ganita Manjari",
     "code": "iemh1"
    }
   ],
   "chapters": [
    {
     "title": "Number Systems",
     "book": "Ganita Manjari",
     "code": "iemh1",
     "n": 1,
     "of": 8,
     "id": "9-mathematics-1"
    },
    {
     "title": "Polynomials",
     "book": "Ganita Manjari",
     "code": "iemh1",
     "n": 2,
     "of": 8,
     "id": "9-mathematics-2"
    },
    {
     "title": "Coordinate Geometry",
     "book": "Ganita Manjari",
     "code": "iemh1",
     "n": 3,
     "of": 8,
     "id": "9-mathematics-3"
    },
    {
     "title": "Linear Equations in Two Variables",
     "book": "Ganita Manjari",
     "code": "iemh1",
     "n": 4,
     "of": 8,
     "id": "9-mathematics-4"
    },
    {
     "title": "Introduction to Euclid's Geometry",
     "book": "Ganita Manjari",
     "code": "iemh1",
     "n": 5,
     "of": 8,
     "id": "9-mathematics-5"
    },
    {
     "title": "Lines and Angles",
     "book": "Ganita Manjari",
     "code": "iemh1",
     "n": 6,
     "of": 8,
     "id": "9-mathematics-6"
    },
    {
     "title": "Triangles",
     "book": "Ganita Manjari",
     "code": "iemh1",
     "n": 7,
     "of": 8,
     "id": "9-mathematics-7"
    },
    {
     "title": "Quadrilaterals",
     "book": "Ganita Manjari",
     "code": "iemh1",
     "n": 8,
     "of": 8,
     "id": "9-mathematics-8"
    }
   ]
  },
  {
   "id": "science",
   "name": "Science",
   "icon": "🔬",
   "books": [
    {
     "title": "Exploration",
     "code": "iesc1"
    }
   ],
   "chapters": [
    {
     "title": "Exploration: Entering the World of Secondary Science",
     "book": "Exploration",
     "code": "iesc1",
     "n": 1,
     "of": 13,
     "id": "9-science-1"
    },
    {
     "title": "Cell: The Building Block of Life",
     "book": "Exploration",
     "code": "iesc1",
     "n": 2,
     "of": 13,
     "id": "9-science-2"
    },
    {
     "title": "Tissues in Action",
     "book": "Exploration",
     "code": "iesc1",
     "n": 3,
     "of": 13,
     "id": "9-science-3"
    },
    {
     "title": "Describing Motion Around Us",
     "book": "Exploration",
     "code": "iesc1",
     "n": 4,
     "of": 13,
     "id": "9-science-4"
    },
    {
     "title": "Exploring Mixtures and their Separation",
     "book": "Exploration",
     "code": "iesc1",
     "n": 5,
     "of": 13,
     "id": "9-science-5"
    },
    {
     "title": "How Forces Affect Motion",
     "book": "Exploration",
     "code": "iesc1",
     "n": 6,
     "of": 13,
     "id": "9-science-6"
    },
    {
     "title": "Work, Energy, and Simple Machines",
     "book": "Exploration",
     "code": "iesc1",
     "n": 7,
     "of": 13,
     "id": "9-science-7"
    },
    {
     "title": "Journey Inside the Atom",
     "book": "Exploration",
     "code": "iesc1",
     "n": 8,
     "of": 13,
     "id": "9-science-8"
    },
    {
     "title": "Atomic Foundations of Matter",
     "book": "Exploration",
     "code": "iesc1",
     "n": 9,
     "of": 13,
     "id": "9-science-9"
    },
    {
     "title": "Sound Waves: Characteristics and Applications",
     "book": "Exploration",
     "code": "iesc1",
     "n": 10,
     "of": 13,
     "id": "9-science-10"
    },
    {
     "title": "Reproduction: How Life Continues",
     "book": "Exploration",
     "code": "iesc1",
     "n": 11,
     "of": 13,
     "id": "9-science-11"
    },
    {
     "title": "Patterns in Life: Diversity and Classification",
     "book": "Exploration",
     "code": "iesc1",
     "n": 12,
     "of": 13,
     "id": "9-science-12"
    },
    {
     "title": "Earth as a System: Energy, Matter, and Life",
     "book": "Exploration",
     "code": "iesc1",
     "n": 13,
     "of": 13,
     "id": "9-science-13"
    }
   ]
  },
  {
   "id": "social-science",
   "name": "Social Science",
   "icon": "🌏",
   "books": [
    {
     "title": "Understanding Society India and Beyond",
     "code": "iest1"
    }
   ],
   "chapters": [
    {
     "title": "Understanding Social Science",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 1,
     "of": 9,
     "id": "9-social-science-1"
    },
    {
     "title": "Shaping of the Earth’s Surface",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 2,
     "of": 9,
     "id": "9-social-science-2"
    },
    {
     "title": "Atmosphere and Climate",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 3,
     "of": 9,
     "id": "9-social-science-3"
    },
    {
     "title": "Early Humans and Beginning of Civilisation",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 4,
     "of": 9,
     "id": "9-social-science-4"
    },
    {
     "title": "State and Society up to 1000 CE",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 5,
     "of": 9,
     "id": "9-social-science-5"
    },
    {
     "title": "Democracy",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 6,
     "of": 9,
     "id": "9-social-science-6"
    },
    {
     "title": "Elections",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 7,
     "of": 9,
     "id": "9-social-science-7"
    },
    {
     "title": "Building Blocks in Economics: The Problem of Choice",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 8,
     "of": 9,
     "id": "9-social-science-8"
    },
    {
     "title": "The Price Puzzle: What Drives the Market",
     "book": "Understanding Society India and Beyond",
     "code": "iest1",
     "n": 9,
     "of": 9,
     "id": "9-social-science-9"
    }
   ]
  },
  {
   "id": "english",
   "name": "English",
   "icon": "📖",
   "books": [
    {
     "title": "Kaveri",
     "code": "iebe1"
    }
   ],
   "chapters": [
    {
     "title": "How I Taught My Grandmother to Read",
     "book": "Kaveri · Unit 1",
     "code": "iebe1",
     "n": 1,
     "of": 8,
     "id": "9-english-1"
    },
    {
     "title": "Bharat Our Land",
     "book": "Kaveri · Unit 1",
     "code": "iebe1",
     "n": 1,
     "of": 8,
     "id": "9-english-2"
    },
    {
     "title": "The Pot Maker",
     "book": "Kaveri · Unit 2",
     "code": "iebe1",
     "n": 2,
     "of": 8,
     "id": "9-english-3"
    },
    {
     "title": "Gifts of Grace: Honouring Our Vocations",
     "book": "Kaveri · Unit 2",
     "code": "iebe1",
     "n": 2,
     "of": 8,
     "id": "9-english-4"
    },
    {
     "title": "Winds of Change",
     "book": "Kaveri · Unit 3",
     "code": "iebe1",
     "n": 3,
     "of": 8,
     "id": "9-english-5"
    },
    {
     "title": "Canvas of Soil",
     "book": "Kaveri · Unit 3",
     "code": "iebe1",
     "n": 3,
     "of": 8,
     "id": "9-english-6"
    },
    {
     "title": "Vitamin-M",
     "book": "Kaveri · Unit 4",
     "code": "iebe1",
     "n": 4,
     "of": 8,
     "id": "9-english-7"
    },
    {
     "title": "I Cannot Remember My Mother",
     "book": "Kaveri · Unit 4",
     "code": "iebe1",
     "n": 4,
     "of": 8,
     "id": "9-english-8"
    },
    {
     "title": "The World of Limitless Possibilities",
     "book": "Kaveri · Unit 5",
     "code": "iebe1",
     "n": 5,
     "of": 8,
     "id": "9-english-9"
    },
    {
     "title": "Nine Gold Medals",
     "book": "Kaveri · Unit 5",
     "code": "iebe1",
     "n": 5,
     "of": 8,
     "id": "9-english-10"
    },
    {
     "title": "Twin Melodies",
     "book": "Kaveri · Unit 6",
     "code": "iebe1",
     "n": 6,
     "of": 8,
     "id": "9-english-11"
    },
    {
     "title": "A Friend Found in Music",
     "book": "Kaveri · Unit 6",
     "code": "iebe1",
     "n": 6,
     "of": 8,
     "id": "9-english-12"
    },
    {
     "title": "Carrier of Words",
     "book": "Kaveri · Unit 7",
     "code": "iebe1",
     "n": 7,
     "of": 8,
     "id": "9-english-13"
    },
    {
     "title": "Words",
     "book": "Kaveri · Unit 7",
     "code": "iebe1",
     "n": 7,
     "of": 8,
     "id": "9-english-14"
    },
    {
     "title": "Follow That Dream",
     "book": "Kaveri · Unit 8",
     "code": "iebe1",
     "n": 8,
     "of": 8,
     "id": "9-english-15"
    },
    {
     "title": "Believe in Yourself",
     "book": "Kaveri · Unit 8",
     "code": "iebe1",
     "n": 8,
     "of": 8,
     "id": "9-english-16"
    }
   ]
  }
 ],
 "10": [
  {
   "id": "mathematics",
   "name": "Mathematics",
   "icon": "📐",
   "books": [
    {
     "title": "Mathematics",
     "code": "jemh1"
    }
   ],
   "chapters": [
    {
     "title": "Real Numbers",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 1,
     "of": 14,
     "id": "10-mathematics-1"
    },
    {
     "title": "Polynomials",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 2,
     "of": 14,
     "id": "10-mathematics-2"
    },
    {
     "title": "Pair of Linear Equations in Two Variables",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 3,
     "of": 14,
     "id": "10-mathematics-3"
    },
    {
     "title": "Quadratic Equations",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 4,
     "of": 14,
     "id": "10-mathematics-4"
    },
    {
     "title": "Arithmetic Progressions",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 5,
     "of": 14,
     "id": "10-mathematics-5"
    },
    {
     "title": "Triangles",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 6,
     "of": 14,
     "id": "10-mathematics-6"
    },
    {
     "title": "Coordinate Geometry",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 7,
     "of": 14,
     "id": "10-mathematics-7"
    },
    {
     "title": "Introduction to Trigonometry",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 8,
     "of": 14,
     "id": "10-mathematics-8"
    },
    {
     "title": "Some Applications of Trigonometry",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 9,
     "of": 14,
     "id": "10-mathematics-9"
    },
    {
     "title": "Circles",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 10,
     "of": 14,
     "id": "10-mathematics-10"
    },
    {
     "title": "Areas Related to Circles",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 11,
     "of": 14,
     "id": "10-mathematics-11"
    },
    {
     "title": "Surface Areas and Volumes",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 12,
     "of": 14,
     "id": "10-mathematics-12"
    },
    {
     "title": "Statistics",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 13,
     "of": 14,
     "id": "10-mathematics-13"
    },
    {
     "title": "Probability",
     "book": "Mathematics",
     "code": "jemh1",
     "n": 14,
     "of": 14,
     "id": "10-mathematics-14"
    }
   ]
  },
  {
   "id": "science",
   "name": "Science",
   "icon": "🔬",
   "books": [
    {
     "title": "Science",
     "code": "jesc1"
    }
   ],
   "chapters": [
    {
     "title": "Chemical Reactions and Equations",
     "book": "Science",
     "code": "jesc1",
     "n": 1,
     "of": 13,
     "id": "10-science-1"
    },
    {
     "title": "Acids, Bases and Salts",
     "book": "Science",
     "code": "jesc1",
     "n": 2,
     "of": 13,
     "id": "10-science-2"
    },
    {
     "title": "Metals and Non-metals",
     "book": "Science",
     "code": "jesc1",
     "n": 3,
     "of": 13,
     "id": "10-science-3"
    },
    {
     "title": "Carbon and its Compounds",
     "book": "Science",
     "code": "jesc1",
     "n": 4,
     "of": 13,
     "id": "10-science-4"
    },
    {
     "title": "Life Processes",
     "book": "Science",
     "code": "jesc1",
     "n": 5,
     "of": 13,
     "id": "10-science-5"
    },
    {
     "title": "Control and Coordination",
     "book": "Science",
     "code": "jesc1",
     "n": 6,
     "of": 13,
     "id": "10-science-6"
    },
    {
     "title": "How do Organisms Reproduce?",
     "book": "Science",
     "code": "jesc1",
     "n": 7,
     "of": 13,
     "id": "10-science-7"
    },
    {
     "title": "Heredity",
     "book": "Science",
     "code": "jesc1",
     "n": 8,
     "of": 13,
     "id": "10-science-8"
    },
    {
     "title": "Light – Reflection and Refraction",
     "book": "Science",
     "code": "jesc1",
     "n": 9,
     "of": 13,
     "id": "10-science-9"
    },
    {
     "title": "The Human Eye and the Colourful World",
     "book": "Science",
     "code": "jesc1",
     "n": 10,
     "of": 13,
     "id": "10-science-10"
    },
    {
     "title": "Electricity",
     "book": "Science",
     "code": "jesc1",
     "n": 11,
     "of": 13,
     "id": "10-science-11"
    },
    {
     "title": "Magnetic Effects of Electric Current",
     "book": "Science",
     "code": "jesc1",
     "n": 12,
     "of": 13,
     "id": "10-science-12"
    },
    {
     "title": "Our Environment",
     "book": "Science",
     "code": "jesc1",
     "n": 13,
     "of": 13,
     "id": "10-science-13"
    }
   ]
  },
  {
   "id": "social-science",
   "name": "Social Science",
   "icon": "🌏",
   "books": [
    {
     "title": "History",
     "code": "jess3"
    },
    {
     "title": "Geography",
     "code": "jess1"
    },
    {
     "title": "Democratic Politics",
     "code": "jess4"
    },
    {
     "title": "Economics",
     "code": "jess2"
    }
   ],
   "chapters": [
    {
     "title": "The rise of nationalism in Europe",
     "book": "History",
     "code": "jess3",
     "n": 1,
     "of": 5,
     "id": "10-social-science-1"
    },
    {
     "title": "The nationalist movement in Indo-China",
     "book": "History",
     "code": "jess3",
     "n": 2,
     "of": 5,
     "id": "10-social-science-2"
    },
    {
     "title": "Nationalism in India",
     "book": "History",
     "code": "jess3",
     "n": 3,
     "of": 5,
     "id": "10-social-science-3"
    },
    {
     "title": "The making of a global world",
     "book": "History",
     "code": "jess3",
     "n": 4,
     "of": 5,
     "id": "10-social-science-4"
    },
    {
     "title": "The age of industrialisation",
     "book": "History",
     "code": "jess3",
     "n": 5,
     "of": 5,
     "id": "10-social-science-5"
    },
    {
     "title": "Resources and development",
     "book": "Geography",
     "code": "jess1",
     "n": 1,
     "of": 7,
     "id": "10-social-science-6"
    },
    {
     "title": "Forest and wildlife resources",
     "book": "Geography",
     "code": "jess1",
     "n": 2,
     "of": 7,
     "id": "10-social-science-7"
    },
    {
     "title": "Water resources",
     "book": "Geography",
     "code": "jess1",
     "n": 3,
     "of": 7,
     "id": "10-social-science-8"
    },
    {
     "title": "Agriculture",
     "book": "Geography",
     "code": "jess1",
     "n": 4,
     "of": 7,
     "id": "10-social-science-9"
    },
    {
     "title": "Minerals and energy resources",
     "book": "Geography",
     "code": "jess1",
     "n": 5,
     "of": 7,
     "id": "10-social-science-10"
    },
    {
     "title": "Manufacturing industries",
     "book": "Geography",
     "code": "jess1",
     "n": 6,
     "of": 7,
     "id": "10-social-science-11"
    },
    {
     "title": "Life lines of national economy",
     "book": "Geography",
     "code": "jess1",
     "n": 7,
     "of": 7,
     "id": "10-social-science-12"
    },
    {
     "title": "Power-sharing",
     "book": "Democratic Politics",
     "code": "jess4",
     "n": 1,
     "of": 5,
     "id": "10-social-science-13"
    },
    {
     "title": "Federalism",
     "book": "Democratic Politics",
     "code": "jess4",
     "n": 2,
     "of": 5,
     "id": "10-social-science-14"
    },
    {
     "title": "Gender, Religion and Caste",
     "book": "Democratic Politics",
     "code": "jess4",
     "n": 3,
     "of": 5,
     "id": "10-social-science-15"
    },
    {
     "title": "Political Parties",
     "book": "Democratic Politics",
     "code": "jess4",
     "n": 4,
     "of": 5,
     "id": "10-social-science-16"
    },
    {
     "title": "Outcomes of Democracy",
     "book": "Democratic Politics",
     "code": "jess4",
     "n": 5,
     "of": 5,
     "id": "10-social-science-17"
    },
    {
     "title": "Development",
     "book": "Economics",
     "code": "jess2",
     "n": 1,
     "of": 5,
     "id": "10-social-science-18"
    },
    {
     "title": "Sectors of the Indian economy",
     "book": "Economics",
     "code": "jess2",
     "n": 2,
     "of": 5,
     "id": "10-social-science-19"
    },
    {
     "title": "Money and credit",
     "book": "Economics",
     "code": "jess2",
     "n": 3,
     "of": 5,
     "id": "10-social-science-20"
    },
    {
     "title": "Globalisation and the Indian economy",
     "book": "Economics",
     "code": "jess2",
     "n": 4,
     "of": 5,
     "id": "10-social-science-21"
    },
    {
     "title": "Consumer rights",
     "book": "Economics",
     "code": "jess2",
     "n": 5,
     "of": 5,
     "id": "10-social-science-22"
    }
   ]
  },
  {
   "id": "english",
   "name": "English",
   "icon": "📖",
   "books": [
    {
     "title": "First Flight",
     "code": "jeff1"
    }
   ],
   "chapters": [
    {
     "title": "A Letter to God",
     "book": "First Flight",
     "code": "jeff1",
     "n": 1,
     "of": 9,
     "id": "10-english-1"
    },
    {
     "title": "Nelson Mandela Long Walk to Freedom",
     "book": "First Flight",
     "code": "jeff1",
     "n": 2,
     "of": 9,
     "id": "10-english-2"
    },
    {
     "title": "Two Stories about Flying",
     "book": "First Flight",
     "code": "jeff1",
     "n": 3,
     "of": 9,
     "id": "10-english-3"
    },
    {
     "title": "From the Diary of Anne Frank",
     "book": "First Flight",
     "code": "jeff1",
     "n": 4,
     "of": 9,
     "id": "10-english-4"
    },
    {
     "title": "Glimpses of India",
     "book": "First Flight",
     "code": "jeff1",
     "n": 5,
     "of": 9,
     "id": "10-english-5"
    },
    {
     "title": "Mijbil the Otter",
     "book": "First Flight",
     "code": "jeff1",
     "n": 6,
     "of": 9,
     "id": "10-english-6"
    },
    {
     "title": "Madam rides the Bus",
     "book": "First Flight",
     "code": "jeff1",
     "n": 7,
     "of": 9,
     "id": "10-english-7"
    },
    {
     "title": "The Sermon at Benares",
     "book": "First Flight",
     "code": "jeff1",
     "n": 8,
     "of": 9,
     "id": "10-english-8"
    },
    {
     "title": "The Proposal",
     "book": "First Flight",
     "code": "jeff1",
     "n": 9,
     "of": 9,
     "id": "10-english-9"
    }
   ]
  }
 ],
 "11": [
  {
   "id": "physics",
   "name": "Physics",
   "icon": "⚛️",
   "books": [
    {
     "title": "Physics Part-I",
     "code": "keph1"
    },
    {
     "title": "Physics Part-II",
     "code": "keph2"
    }
   ],
   "chapters": [
    {
     "title": "Units and Measurements",
     "book": "Physics Part-I",
     "code": "keph1",
     "n": 1,
     "of": 7,
     "id": "11-physics-1"
    },
    {
     "title": "Motion in a Straight Line",
     "book": "Physics Part-I",
     "code": "keph1",
     "n": 2,
     "of": 7,
     "id": "11-physics-2"
    },
    {
     "title": "Motion in a Plane",
     "book": "Physics Part-I",
     "code": "keph1",
     "n": 3,
     "of": 7,
     "id": "11-physics-3"
    },
    {
     "title": "Laws of Motion",
     "book": "Physics Part-I",
     "code": "keph1",
     "n": 4,
     "of": 7,
     "id": "11-physics-4"
    },
    {
     "title": "Work, Energy and Power",
     "book": "Physics Part-I",
     "code": "keph1",
     "n": 5,
     "of": 7,
     "id": "11-physics-5"
    },
    {
     "title": "System of Particles and Rotational Motion",
     "book": "Physics Part-I",
     "code": "keph1",
     "n": 6,
     "of": 7,
     "id": "11-physics-6"
    },
    {
     "title": "Gravitation",
     "book": "Physics Part-I",
     "code": "keph1",
     "n": 7,
     "of": 7,
     "id": "11-physics-7"
    },
    {
     "title": "Mechanical Properties of Solids",
     "book": "Physics Part-II",
     "code": "keph2",
     "n": 1,
     "of": 7,
     "id": "11-physics-8"
    },
    {
     "title": "Mechanical Properties of Fluids",
     "book": "Physics Part-II",
     "code": "keph2",
     "n": 2,
     "of": 7,
     "id": "11-physics-9"
    },
    {
     "title": "Thermal Properties of Matter",
     "book": "Physics Part-II",
     "code": "keph2",
     "n": 3,
     "of": 7,
     "id": "11-physics-10"
    },
    {
     "title": "Thermodynamics",
     "book": "Physics Part-II",
     "code": "keph2",
     "n": 4,
     "of": 7,
     "id": "11-physics-11"
    },
    {
     "title": "Kinetic Theory",
     "book": "Physics Part-II",
     "code": "keph2",
     "n": 5,
     "of": 7,
     "id": "11-physics-12"
    },
    {
     "title": "Oscillations",
     "book": "Physics Part-II",
     "code": "keph2",
     "n": 6,
     "of": 7,
     "id": "11-physics-13"
    },
    {
     "title": "Waves",
     "book": "Physics Part-II",
     "code": "keph2",
     "n": 7,
     "of": 7,
     "id": "11-physics-14"
    }
   ]
  },
  {
   "id": "chemistry",
   "name": "Chemistry",
   "icon": "🧪",
   "books": [
    {
     "title": "Chemistry Part-I",
     "code": "kech1"
    },
    {
     "title": "Chemistry Part II",
     "code": "kech2"
    }
   ],
   "chapters": [
    {
     "title": "Some Basic Concepts of Chemistry",
     "book": "Chemistry Part-I",
     "code": "kech1",
     "n": 1,
     "of": 6,
     "id": "11-chemistry-1"
    },
    {
     "title": "Structure of Atom",
     "book": "Chemistry Part-I",
     "code": "kech1",
     "n": 2,
     "of": 6,
     "id": "11-chemistry-2"
    },
    {
     "title": "Classification of Elements and Periodicity in Properties",
     "book": "Chemistry Part-I",
     "code": "kech1",
     "n": 3,
     "of": 6,
     "id": "11-chemistry-3"
    },
    {
     "title": "Chemical Bonding and Molecular Structure",
     "book": "Chemistry Part-I",
     "code": "kech1",
     "n": 4,
     "of": 6,
     "id": "11-chemistry-4"
    },
    {
     "title": "Thermodynamics",
     "book": "Chemistry Part-I",
     "code": "kech1",
     "n": 5,
     "of": 6,
     "id": "11-chemistry-5"
    },
    {
     "title": "Equilibrium",
     "book": "Chemistry Part-I",
     "code": "kech1",
     "n": 6,
     "of": 6,
     "id": "11-chemistry-6"
    },
    {
     "title": "Redox Reactions",
     "book": "Chemistry Part II",
     "code": "kech2",
     "n": 1,
     "of": 3,
     "id": "11-chemistry-7"
    },
    {
     "title": "Organic Chemistry – Some Basic Principles and Techniques",
     "book": "Chemistry Part II",
     "code": "kech2",
     "n": 2,
     "of": 3,
     "id": "11-chemistry-8"
    },
    {
     "title": "Hydrocarbons",
     "book": "Chemistry Part II",
     "code": "kech2",
     "n": 3,
     "of": 3,
     "id": "11-chemistry-9"
    }
   ]
  },
  {
   "id": "mathematics",
   "name": "Mathematics",
   "icon": "📐",
   "books": [
    {
     "title": "Mathematics",
     "code": "kemh1"
    }
   ],
   "chapters": [
    {
     "title": "Sets",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 1,
     "of": 14,
     "id": "11-mathematics-1"
    },
    {
     "title": "Relations and Functions",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 2,
     "of": 14,
     "id": "11-mathematics-2"
    },
    {
     "title": "Trigonometric Functions",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 3,
     "of": 14,
     "id": "11-mathematics-3"
    },
    {
     "title": "Complex Numbers and Quadratic Equations",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 4,
     "of": 14,
     "id": "11-mathematics-4"
    },
    {
     "title": "Linear Inequalities",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 5,
     "of": 14,
     "id": "11-mathematics-5"
    },
    {
     "title": "Permutations and Combinations",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 6,
     "of": 14,
     "id": "11-mathematics-6"
    },
    {
     "title": "Binomial Theorem",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 7,
     "of": 14,
     "id": "11-mathematics-7"
    },
    {
     "title": "Sequences and Series",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 8,
     "of": 14,
     "id": "11-mathematics-8"
    },
    {
     "title": "Straight Lines",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 9,
     "of": 14,
     "id": "11-mathematics-9"
    },
    {
     "title": "Conic Sections",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 10,
     "of": 14,
     "id": "11-mathematics-10"
    },
    {
     "title": "Introduction to Three Dimensional Geometry",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 11,
     "of": 14,
     "id": "11-mathematics-11"
    },
    {
     "title": "Limits and Derivatives",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 12,
     "of": 14,
     "id": "11-mathematics-12"
    },
    {
     "title": "Statistics",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 13,
     "of": 14,
     "id": "11-mathematics-13"
    },
    {
     "title": "Probability",
     "book": "Mathematics",
     "code": "kemh1",
     "n": 14,
     "of": 14,
     "id": "11-mathematics-14"
    }
   ]
  },
  {
   "id": "biology",
   "name": "Biology",
   "icon": "🧬",
   "books": [
    {
     "title": "Biology",
     "code": "kebo1"
    }
   ],
   "chapters": [
    {
     "title": "The Living World",
     "book": "Biology",
     "code": "kebo1",
     "n": 1,
     "of": 19,
     "id": "11-biology-1"
    },
    {
     "title": "Biological Classification",
     "book": "Biology",
     "code": "kebo1",
     "n": 2,
     "of": 19,
     "id": "11-biology-2"
    },
    {
     "title": "Plant Kingdom",
     "book": "Biology",
     "code": "kebo1",
     "n": 3,
     "of": 19,
     "id": "11-biology-3"
    },
    {
     "title": "Animal Kingdom",
     "book": "Biology",
     "code": "kebo1",
     "n": 4,
     "of": 19,
     "id": "11-biology-4"
    },
    {
     "title": "Morphology of Flowering Plants",
     "book": "Biology",
     "code": "kebo1",
     "n": 5,
     "of": 19,
     "id": "11-biology-5"
    },
    {
     "title": "Anatomy of Flowering Plants",
     "book": "Biology",
     "code": "kebo1",
     "n": 6,
     "of": 19,
     "id": "11-biology-6"
    },
    {
     "title": "Structural Organisation in Animals",
     "book": "Biology",
     "code": "kebo1",
     "n": 7,
     "of": 19,
     "id": "11-biology-7"
    },
    {
     "title": "Cell: The Unit of Life",
     "book": "Biology",
     "code": "kebo1",
     "n": 8,
     "of": 19,
     "id": "11-biology-8"
    },
    {
     "title": "Biomolecules",
     "book": "Biology",
     "code": "kebo1",
     "n": 9,
     "of": 19,
     "id": "11-biology-9"
    },
    {
     "title": "Cell Cycle and Cell Division",
     "book": "Biology",
     "code": "kebo1",
     "n": 10,
     "of": 19,
     "id": "11-biology-10"
    },
    {
     "title": "Photosynthesis in Higher Plants",
     "book": "Biology",
     "code": "kebo1",
     "n": 11,
     "of": 19,
     "id": "11-biology-11"
    },
    {
     "title": "Respiration in Plants",
     "book": "Biology",
     "code": "kebo1",
     "n": 12,
     "of": 19,
     "id": "11-biology-12"
    },
    {
     "title": "Plant Growth and Development",
     "book": "Biology",
     "code": "kebo1",
     "n": 13,
     "of": 19,
     "id": "11-biology-13"
    },
    {
     "title": "Breathing and Exchange of Gases",
     "book": "Biology",
     "code": "kebo1",
     "n": 14,
     "of": 19,
     "id": "11-biology-14"
    },
    {
     "title": "Body Fluids and Circulation",
     "book": "Biology",
     "code": "kebo1",
     "n": 15,
     "of": 19,
     "id": "11-biology-15"
    },
    {
     "title": "Excretory Products and their Elimination",
     "book": "Biology",
     "code": "kebo1",
     "n": 16,
     "of": 19,
     "id": "11-biology-16"
    },
    {
     "title": "Locomotion and Movement",
     "book": "Biology",
     "code": "kebo1",
     "n": 17,
     "of": 19,
     "id": "11-biology-17"
    },
    {
     "title": "Neural Control and Coordination",
     "book": "Biology",
     "code": "kebo1",
     "n": 18,
     "of": 19,
     "id": "11-biology-18"
    },
    {
     "title": "Chemical Coordination and Integration",
     "book": "Biology",
     "code": "kebo1",
     "n": 19,
     "of": 19,
     "id": "11-biology-19"
    }
   ]
  },
  {
   "id": "economics",
   "name": "Economics",
   "icon": "📈",
   "books": [
    {
     "title": "Statistics for Economics",
     "code": "kest1"
    },
    {
     "title": "Indian Economic Development",
     "code": "keec1"
    }
   ],
   "chapters": [
    {
     "title": "Introduction",
     "book": "Statistics for Economics",
     "code": "kest1",
     "n": 1,
     "of": 8,
     "id": "11-economics-1"
    },
    {
     "title": "Collection of Data",
     "book": "Statistics for Economics",
     "code": "kest1",
     "n": 2,
     "of": 8,
     "id": "11-economics-2"
    },
    {
     "title": "Organisation of Data",
     "book": "Statistics for Economics",
     "code": "kest1",
     "n": 3,
     "of": 8,
     "id": "11-economics-3"
    },
    {
     "title": "Presentation of Data",
     "book": "Statistics for Economics",
     "code": "kest1",
     "n": 4,
     "of": 8,
     "id": "11-economics-4"
    },
    {
     "title": "Measures of Central Tendency",
     "book": "Statistics for Economics",
     "code": "kest1",
     "n": 5,
     "of": 8,
     "id": "11-economics-5"
    },
    {
     "title": "Correlation",
     "book": "Statistics for Economics",
     "code": "kest1",
     "n": 6,
     "of": 8,
     "id": "11-economics-6"
    },
    {
     "title": "Index Numbers",
     "book": "Statistics for Economics",
     "code": "kest1",
     "n": 7,
     "of": 8,
     "id": "11-economics-7"
    },
    {
     "title": "Use of Statistical Tools",
     "book": "Statistics for Economics",
     "code": "kest1",
     "n": 8,
     "of": 8,
     "id": "11-economics-8"
    },
    {
     "title": "Indian Economy on the Eve of Independence",
     "book": "Indian Economic Development",
     "code": "keec1",
     "n": 1,
     "of": 8,
     "id": "11-economics-9"
    },
    {
     "title": "Indian Economy 1950-1990",
     "book": "Indian Economic Development",
     "code": "keec1",
     "n": 2,
     "of": 8,
     "id": "11-economics-10"
    },
    {
     "title": "Liberalisation, Privatisation and Globalisation: An Appraisal",
     "book": "Indian Economic Development",
     "code": "keec1",
     "n": 3,
     "of": 8,
     "id": "11-economics-11"
    },
    {
     "title": "Human Capital Formation in India",
     "book": "Indian Economic Development",
     "code": "keec1",
     "n": 4,
     "of": 8,
     "id": "11-economics-12"
    },
    {
     "title": "Rural Development",
     "book": "Indian Economic Development",
     "code": "keec1",
     "n": 5,
     "of": 8,
     "id": "11-economics-13"
    },
    {
     "title": "Employment: Growth, Informalisation and Other Issues",
     "book": "Indian Economic Development",
     "code": "keec1",
     "n": 6,
     "of": 8,
     "id": "11-economics-14"
    },
    {
     "title": "Environment and Sustainable Development",
     "book": "Indian Economic Development",
     "code": "keec1",
     "n": 7,
     "of": 8,
     "id": "11-economics-15"
    },
    {
     "title": "Comparative Development Experiences of India and its Neighbours",
     "book": "Indian Economic Development",
     "code": "keec1",
     "n": 8,
     "of": 8,
     "id": "11-economics-16"
    }
   ]
  },
  {
   "id": "accountancy",
   "name": "Accountancy",
   "icon": "🧾",
   "books": [
    {
     "title": "Financial Accounting I",
     "code": "keac1"
    },
    {
     "title": "Financial Accounting II",
     "code": "keac2"
    }
   ],
   "chapters": [
    {
     "title": "Introduction to Accounting",
     "book": "Financial Accounting I",
     "code": "keac1",
     "n": 1,
     "of": 7,
     "id": "11-accountancy-1"
    },
    {
     "title": "Theory Base of Accounting",
     "book": "Financial Accounting I",
     "code": "keac1",
     "n": 2,
     "of": 7,
     "id": "11-accountancy-2"
    },
    {
     "title": "Recording of Transactions-I",
     "book": "Financial Accounting I",
     "code": "keac1",
     "n": 3,
     "of": 7,
     "id": "11-accountancy-3"
    },
    {
     "title": "Recording of Transactions-II",
     "book": "Financial Accounting I",
     "code": "keac1",
     "n": 4,
     "of": 7,
     "id": "11-accountancy-4"
    },
    {
     "title": "Bank Reconciliation Statement",
     "book": "Financial Accounting I",
     "code": "keac1",
     "n": 5,
     "of": 7,
     "id": "11-accountancy-5"
    },
    {
     "title": "Trial Balance and Rectification of Errors",
     "book": "Financial Accounting I",
     "code": "keac1",
     "n": 6,
     "of": 7,
     "id": "11-accountancy-6"
    },
    {
     "title": "Depreciation, Provisions and Reserves",
     "book": "Financial Accounting I",
     "code": "keac1",
     "n": 7,
     "of": 7,
     "id": "11-accountancy-7"
    },
    {
     "title": "Financial Statements - I",
     "book": "Financial Accounting II",
     "code": "keac2",
     "n": 1,
     "of": 2,
     "id": "11-accountancy-8"
    },
    {
     "title": "Financial Statements - II",
     "book": "Financial Accounting II",
     "code": "keac2",
     "n": 2,
     "of": 2,
     "id": "11-accountancy-9"
    }
   ]
  },
  {
   "id": "business-studies",
   "name": "Business Studies",
   "icon": "💼",
   "books": [
    {
     "title": "Business Studies",
     "code": "kebs1"
    }
   ],
   "chapters": [
    {
     "title": "Nature and Purpose of Business",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 1,
     "of": 11,
     "id": "11-business-studies-1"
    },
    {
     "title": "Forms of Business Organisation",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 2,
     "of": 11,
     "id": "11-business-studies-2"
    },
    {
     "title": "Private, Public and Global Enterprises",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 3,
     "of": 11,
     "id": "11-business-studies-3"
    },
    {
     "title": "Business Services",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 4,
     "of": 11,
     "id": "11-business-studies-4"
    },
    {
     "title": "Emerging Modes of Business",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 5,
     "of": 11,
     "id": "11-business-studies-5"
    },
    {
     "title": "Social Responsibilities of Business and Business Ethics",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 6,
     "of": 11,
     "id": "11-business-studies-6"
    },
    {
     "title": "Formation of a Company",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 7,
     "of": 11,
     "id": "11-business-studies-7"
    },
    {
     "title": "Sources of Business Finance",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 8,
     "of": 11,
     "id": "11-business-studies-8"
    },
    {
     "title": "Small Business",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 9,
     "of": 11,
     "id": "11-business-studies-9"
    },
    {
     "title": "Internal Trade",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 10,
     "of": 11,
     "id": "11-business-studies-10"
    },
    {
     "title": "International Business - I",
     "book": "Business Studies",
     "code": "kebs1",
     "n": 11,
     "of": 11,
     "id": "11-business-studies-11"
    }
   ]
  },
  {
   "id": "history",
   "name": "History",
   "icon": "🏛️",
   "books": [
    {
     "title": "Themes in World History",
     "code": "kehs1"
    }
   ],
   "chapters": [
    {
     "title": "Writing and City Life",
     "book": "Themes in World History",
     "code": "kehs1",
     "n": 1,
     "of": 7,
     "id": "11-history-1"
    },
    {
     "title": "An Empire Across Three Continents",
     "book": "Themes in World History",
     "code": "kehs1",
     "n": 2,
     "of": 7,
     "id": "11-history-2"
    },
    {
     "title": "Nomadic Empires",
     "book": "Themes in World History",
     "code": "kehs1",
     "n": 3,
     "of": 7,
     "id": "11-history-3"
    },
    {
     "title": "The Three Orders",
     "book": "Themes in World History",
     "code": "kehs1",
     "n": 4,
     "of": 7,
     "id": "11-history-4"
    },
    {
     "title": "Changing Cultural Traditions",
     "book": "Themes in World History",
     "code": "kehs1",
     "n": 5,
     "of": 7,
     "id": "11-history-5"
    },
    {
     "title": "Displacing Indigenous Peoples",
     "book": "Themes in World History",
     "code": "kehs1",
     "n": 6,
     "of": 7,
     "id": "11-history-6"
    },
    {
     "title": "Paths to Modernisation",
     "book": "Themes in World History",
     "code": "kehs1",
     "n": 7,
     "of": 7,
     "id": "11-history-7"
    }
   ]
  },
  {
   "id": "geography",
   "name": "Geography",
   "icon": "🗺️",
   "books": [
    {
     "title": "Fundamentals of Physical Geography",
     "code": "kegy2"
    },
    {
     "title": "India Physical Environment",
     "code": "kegy1"
    },
    {
     "title": "Practical Work in Geography",
     "code": "kegy3"
    }
   ],
   "chapters": [
    {
     "title": "Geography as a Discipline",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 1,
     "of": 14,
     "id": "11-geography-1"
    },
    {
     "title": "The Origin and Evolution of the Earth",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 2,
     "of": 14,
     "id": "11-geography-2"
    },
    {
     "title": "Interior of the Earth",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 3,
     "of": 14,
     "id": "11-geography-3"
    },
    {
     "title": "Distribution of Oceans and Continents",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 4,
     "of": 14,
     "id": "11-geography-4"
    },
    {
     "title": "Geomorphic Processes",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 5,
     "of": 14,
     "id": "11-geography-5"
    },
    {
     "title": "Landforms and their Evolution",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 6,
     "of": 14,
     "id": "11-geography-6"
    },
    {
     "title": "Composition and Structure of Atmosphere",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 7,
     "of": 14,
     "id": "11-geography-7"
    },
    {
     "title": "Solar Radiation, Heat Balance and Temperature",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 8,
     "of": 14,
     "id": "11-geography-8"
    },
    {
     "title": "Atmospheric Circulation and Weather Systems",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 9,
     "of": 14,
     "id": "11-geography-9"
    },
    {
     "title": "Water in the Atmosphere",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 10,
     "of": 14,
     "id": "11-geography-10"
    },
    {
     "title": "World Climate and Climate Change",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 11,
     "of": 14,
     "id": "11-geography-11"
    },
    {
     "title": "Water (Oceans)",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 12,
     "of": 14,
     "id": "11-geography-12"
    },
    {
     "title": "Movements of Ocean Water",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 13,
     "of": 14,
     "id": "11-geography-13"
    },
    {
     "title": "Biodiversity and Conservation",
     "book": "Fundamentals of Physical Geography",
     "code": "kegy2",
     "n": 14,
     "of": 14,
     "id": "11-geography-14"
    },
    {
     "title": "India — Location",
     "book": "India Physical Environment",
     "code": "kegy1",
     "n": 1,
     "of": 6,
     "id": "11-geography-15"
    },
    {
     "title": "Structure and Physiography",
     "book": "India Physical Environment",
     "code": "kegy1",
     "n": 2,
     "of": 6,
     "id": "11-geography-16"
    },
    {
     "title": "Drainage System",
     "book": "India Physical Environment",
     "code": "kegy1",
     "n": 3,
     "of": 6,
     "id": "11-geography-17"
    },
    {
     "title": "Climate",
     "book": "India Physical Environment",
     "code": "kegy1",
     "n": 4,
     "of": 6,
     "id": "11-geography-18"
    },
    {
     "title": "Natural Vegetation",
     "book": "India Physical Environment",
     "code": "kegy1",
     "n": 5,
     "of": 6,
     "id": "11-geography-19"
    },
    {
     "title": "Natural Hazards and Disasters",
     "book": "India Physical Environment",
     "code": "kegy1",
     "n": 6,
     "of": 6,
     "id": "11-geography-20"
    },
    {
     "title": "Introduction to Maps",
     "book": "Practical Work in Geography",
     "code": "kegy3",
     "n": 1,
     "of": 6,
     "id": "11-geography-21"
    },
    {
     "title": "Map Scale",
     "book": "Practical Work in Geography",
     "code": "kegy3",
     "n": 2,
     "of": 6,
     "id": "11-geography-22"
    },
    {
     "title": "Latitude, Longitude and Time",
     "book": "Practical Work in Geography",
     "code": "kegy3",
     "n": 3,
     "of": 6,
     "id": "11-geography-23"
    },
    {
     "title": "Map Projections",
     "book": "Practical Work in Geography",
     "code": "kegy3",
     "n": 4,
     "of": 6,
     "id": "11-geography-24"
    },
    {
     "title": "Topographical Maps",
     "book": "Practical Work in Geography",
     "code": "kegy3",
     "n": 5,
     "of": 6,
     "id": "11-geography-25"
    },
    {
     "title": "Introduction to Remote Sensing",
     "book": "Practical Work in Geography",
     "code": "kegy3",
     "n": 6,
     "of": 6,
     "id": "11-geography-26"
    }
   ]
  },
  {
   "id": "political-science",
   "name": "Political Science",
   "icon": "⚖️",
   "books": [
    {
     "title": "India Constitution at Work",
     "code": "keps2"
    },
    {
     "title": "Political Theory",
     "code": "keps1"
    }
   ],
   "chapters": [
    {
     "title": "Constitution why and how?",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 1,
     "of": 10,
     "id": "11-political-science-1"
    },
    {
     "title": "Rights in the indian constitution",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 2,
     "of": 10,
     "id": "11-political-science-2"
    },
    {
     "title": "Election and representation",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 3,
     "of": 10,
     "id": "11-political-science-3"
    },
    {
     "title": "Executive",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 4,
     "of": 10,
     "id": "11-political-science-4"
    },
    {
     "title": "Legislature",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 5,
     "of": 10,
     "id": "11-political-science-5"
    },
    {
     "title": "Judiciary",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 6,
     "of": 10,
     "id": "11-political-science-6"
    },
    {
     "title": "Federalism",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 7,
     "of": 10,
     "id": "11-political-science-7"
    },
    {
     "title": "Local governments",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 8,
     "of": 10,
     "id": "11-political-science-8"
    },
    {
     "title": "Constitution as a living document",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 9,
     "of": 10,
     "id": "11-political-science-9"
    },
    {
     "title": "The philosophy of the constitution",
     "book": "India Constitution at Work",
     "code": "keps2",
     "n": 10,
     "of": 10,
     "id": "11-political-science-10"
    },
    {
     "title": "Political theory: an introduction",
     "book": "Political Theory",
     "code": "keps1",
     "n": 1,
     "of": 8,
     "id": "11-political-science-11"
    },
    {
     "title": "Freedom",
     "book": "Political Theory",
     "code": "keps1",
     "n": 2,
     "of": 8,
     "id": "11-political-science-12"
    },
    {
     "title": "Equality",
     "book": "Political Theory",
     "code": "keps1",
     "n": 3,
     "of": 8,
     "id": "11-political-science-13"
    },
    {
     "title": "Social justice",
     "book": "Political Theory",
     "code": "keps1",
     "n": 4,
     "of": 8,
     "id": "11-political-science-14"
    },
    {
     "title": "Rights",
     "book": "Political Theory",
     "code": "keps1",
     "n": 5,
     "of": 8,
     "id": "11-political-science-15"
    },
    {
     "title": "Citizenship",
     "book": "Political Theory",
     "code": "keps1",
     "n": 6,
     "of": 8,
     "id": "11-political-science-16"
    },
    {
     "title": "Nationalism",
     "book": "Political Theory",
     "code": "keps1",
     "n": 7,
     "of": 8,
     "id": "11-political-science-17"
    },
    {
     "title": "Secularism",
     "book": "Political Theory",
     "code": "keps1",
     "n": 8,
     "of": 8,
     "id": "11-political-science-18"
    }
   ]
  },
  {
   "id": "english",
   "name": "English",
   "icon": "📖",
   "books": [
    {
     "title": "Hornbill",
     "code": "kehb1"
    }
   ],
   "chapters": [
    {
     "title": "The Portrait of a Lady",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 1,
     "of": 12,
     "id": "11-english-1"
    },
    {
     "title": "We’re Not Afraid to Die...if We Can All Be Together",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 2,
     "of": 12,
     "id": "11-english-2"
    },
    {
     "title": "Discovering Tut: The Saga Continues",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 3,
     "of": 12,
     "id": "11-english-3"
    },
    {
     "title": "The Ailing Planet: The Green Movement’s Role",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 4,
     "of": 12,
     "id": "11-english-4"
    },
    {
     "title": "The Adventure",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 5,
     "of": 12,
     "id": "11-english-5"
    },
    {
     "title": "Silk Road",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 6,
     "of": 12,
     "id": "11-english-6"
    },
    {
     "title": "Note Making",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 7,
     "of": 12,
     "id": "11-english-7"
    },
    {
     "title": "Summarising",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 8,
     "of": 12,
     "id": "11-english-8"
    },
    {
     "title": "Sub Titling",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 9,
     "of": 12,
     "id": "11-english-9"
    },
    {
     "title": "Essay Writing",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 10,
     "of": 12,
     "id": "11-english-10"
    },
    {
     "title": "Letter Writing",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 11,
     "of": 12,
     "id": "11-english-11"
    },
    {
     "title": "Creative Writing",
     "book": "Hornbill",
     "code": "kehb1",
     "n": 12,
     "of": 12,
     "id": "11-english-12"
    }
   ]
  }
 ],
 "12": [
  {
   "id": "physics",
   "name": "Physics",
   "icon": "⚛️",
   "books": [
    {
     "title": "Physics Part-I",
     "code": "leph1"
    },
    {
     "title": "Physics Part-II",
     "code": "leph2"
    }
   ],
   "chapters": [
    {
     "title": "Electric charges and fields",
     "book": "Physics Part-I",
     "code": "leph1",
     "n": 1,
     "of": 8,
     "id": "12-physics-1"
    },
    {
     "title": "Electrostatic potential and capacitance",
     "book": "Physics Part-I",
     "code": "leph1",
     "n": 2,
     "of": 8,
     "id": "12-physics-2"
    },
    {
     "title": "Current electricity",
     "book": "Physics Part-I",
     "code": "leph1",
     "n": 3,
     "of": 8,
     "id": "12-physics-3"
    },
    {
     "title": "Moving charges and magnetism",
     "book": "Physics Part-I",
     "code": "leph1",
     "n": 4,
     "of": 8,
     "id": "12-physics-4"
    },
    {
     "title": "Magnetism and matter",
     "book": "Physics Part-I",
     "code": "leph1",
     "n": 5,
     "of": 8,
     "id": "12-physics-5"
    },
    {
     "title": "Electromagnetic induction",
     "book": "Physics Part-I",
     "code": "leph1",
     "n": 6,
     "of": 8,
     "id": "12-physics-6"
    },
    {
     "title": "Alternating current",
     "book": "Physics Part-I",
     "code": "leph1",
     "n": 7,
     "of": 8,
     "id": "12-physics-7"
    },
    {
     "title": "Electromagnetic waves",
     "book": "Physics Part-I",
     "code": "leph1",
     "n": 8,
     "of": 8,
     "id": "12-physics-8"
    },
    {
     "title": "Ray Optics and Optical Instruments",
     "book": "Physics Part-II",
     "code": "leph2",
     "n": 1,
     "of": 6,
     "id": "12-physics-9"
    },
    {
     "title": "Wave Optics",
     "book": "Physics Part-II",
     "code": "leph2",
     "n": 2,
     "of": 6,
     "id": "12-physics-10"
    },
    {
     "title": "Dual Nature of Radiation and Matter",
     "book": "Physics Part-II",
     "code": "leph2",
     "n": 3,
     "of": 6,
     "id": "12-physics-11"
    },
    {
     "title": "Atoms",
     "book": "Physics Part-II",
     "code": "leph2",
     "n": 4,
     "of": 6,
     "id": "12-physics-12"
    },
    {
     "title": "Nuclei",
     "book": "Physics Part-II",
     "code": "leph2",
     "n": 5,
     "of": 6,
     "id": "12-physics-13"
    },
    {
     "title": "Semiconductor Electronics: Materials, Devices and Simple Circuits",
     "book": "Physics Part-II",
     "code": "leph2",
     "n": 6,
     "of": 6,
     "id": "12-physics-14"
    }
   ]
  },
  {
   "id": "chemistry",
   "name": "Chemistry",
   "icon": "🧪",
   "books": [
    {
     "title": "Chemistry-I",
     "code": "lech1"
    },
    {
     "title": "Chemistry-II",
     "code": "lech2"
    }
   ],
   "chapters": [
    {
     "title": "Solutions",
     "book": "Chemistry-I",
     "code": "lech1",
     "n": 1,
     "of": 5,
     "id": "12-chemistry-1"
    },
    {
     "title": "Electrochemistry",
     "book": "Chemistry-I",
     "code": "lech1",
     "n": 2,
     "of": 5,
     "id": "12-chemistry-2"
    },
    {
     "title": "Chemical Kinetics",
     "book": "Chemistry-I",
     "code": "lech1",
     "n": 3,
     "of": 5,
     "id": "12-chemistry-3"
    },
    {
     "title": "The d-and f-Block Elements",
     "book": "Chemistry-I",
     "code": "lech1",
     "n": 4,
     "of": 5,
     "id": "12-chemistry-4"
    },
    {
     "title": "Coordination Compounds",
     "book": "Chemistry-I",
     "code": "lech1",
     "n": 5,
     "of": 5,
     "id": "12-chemistry-5"
    },
    {
     "title": "Haloalkanes and Haloarenes",
     "book": "Chemistry-II",
     "code": "lech2",
     "n": 1,
     "of": 5,
     "id": "12-chemistry-6"
    },
    {
     "title": "Alcohols, Phenols and Ethers",
     "book": "Chemistry-II",
     "code": "lech2",
     "n": 2,
     "of": 5,
     "id": "12-chemistry-7"
    },
    {
     "title": "Aldehydes, Ketones and Carboxylic Acids",
     "book": "Chemistry-II",
     "code": "lech2",
     "n": 3,
     "of": 5,
     "id": "12-chemistry-8"
    },
    {
     "title": "Amines",
     "book": "Chemistry-II",
     "code": "lech2",
     "n": 4,
     "of": 5,
     "id": "12-chemistry-9"
    },
    {
     "title": "Biomolecules",
     "book": "Chemistry-II",
     "code": "lech2",
     "n": 5,
     "of": 5,
     "id": "12-chemistry-10"
    }
   ]
  },
  {
   "id": "mathematics",
   "name": "Mathematics",
   "icon": "📐",
   "books": [
    {
     "title": "Mathematics Part-I",
     "code": "lemh1"
    },
    {
     "title": "Mathematics Part-II",
     "code": "lemh2"
    }
   ],
   "chapters": [
    {
     "title": "Relations and functions",
     "book": "Mathematics Part-I",
     "code": "lemh1",
     "n": 1,
     "of": 6,
     "id": "12-mathematics-1"
    },
    {
     "title": "Inverse trigonometric functions",
     "book": "Mathematics Part-I",
     "code": "lemh1",
     "n": 2,
     "of": 6,
     "id": "12-mathematics-2"
    },
    {
     "title": "Matrices",
     "book": "Mathematics Part-I",
     "code": "lemh1",
     "n": 3,
     "of": 6,
     "id": "12-mathematics-3"
    },
    {
     "title": "Determinants",
     "book": "Mathematics Part-I",
     "code": "lemh1",
     "n": 4,
     "of": 6,
     "id": "12-mathematics-4"
    },
    {
     "title": "Continuity and differentiability",
     "book": "Mathematics Part-I",
     "code": "lemh1",
     "n": 5,
     "of": 6,
     "id": "12-mathematics-5"
    },
    {
     "title": "Application of derivatives",
     "book": "Mathematics Part-I",
     "code": "lemh1",
     "n": 6,
     "of": 6,
     "id": "12-mathematics-6"
    },
    {
     "title": "Integrals",
     "book": "Mathematics Part-II",
     "code": "lemh2",
     "n": 1,
     "of": 7,
     "id": "12-mathematics-7"
    },
    {
     "title": "Application of Integrals",
     "book": "Mathematics Part-II",
     "code": "lemh2",
     "n": 2,
     "of": 7,
     "id": "12-mathematics-8"
    },
    {
     "title": "Differential Equations",
     "book": "Mathematics Part-II",
     "code": "lemh2",
     "n": 3,
     "of": 7,
     "id": "12-mathematics-9"
    },
    {
     "title": "Vector Algebra",
     "book": "Mathematics Part-II",
     "code": "lemh2",
     "n": 4,
     "of": 7,
     "id": "12-mathematics-10"
    },
    {
     "title": "Three Dimensional Geometry",
     "book": "Mathematics Part-II",
     "code": "lemh2",
     "n": 5,
     "of": 7,
     "id": "12-mathematics-11"
    },
    {
     "title": "Linear Programming",
     "book": "Mathematics Part-II",
     "code": "lemh2",
     "n": 6,
     "of": 7,
     "id": "12-mathematics-12"
    },
    {
     "title": "Probability",
     "book": "Mathematics Part-II",
     "code": "lemh2",
     "n": 7,
     "of": 7,
     "id": "12-mathematics-13"
    }
   ]
  },
  {
   "id": "biology",
   "name": "Biology",
   "icon": "🧬",
   "books": [
    {
     "title": "Biology",
     "code": "lebo1"
    }
   ],
   "chapters": [
    {
     "title": "Sexual Reproduction in Flowering Plants",
     "book": "Biology",
     "code": "lebo1",
     "n": 1,
     "of": 13,
     "id": "12-biology-1"
    },
    {
     "title": "Human Reproduction",
     "book": "Biology",
     "code": "lebo1",
     "n": 2,
     "of": 13,
     "id": "12-biology-2"
    },
    {
     "title": "Reproductive Health",
     "book": "Biology",
     "code": "lebo1",
     "n": 3,
     "of": 13,
     "id": "12-biology-3"
    },
    {
     "title": "Principles of Inheritance and Variation",
     "book": "Biology",
     "code": "lebo1",
     "n": 4,
     "of": 13,
     "id": "12-biology-4"
    },
    {
     "title": "Molecular Basis of Inheritance",
     "book": "Biology",
     "code": "lebo1",
     "n": 5,
     "of": 13,
     "id": "12-biology-5"
    },
    {
     "title": "Evolution",
     "book": "Biology",
     "code": "lebo1",
     "n": 6,
     "of": 13,
     "id": "12-biology-6"
    },
    {
     "title": "Human Health and Disease",
     "book": "Biology",
     "code": "lebo1",
     "n": 7,
     "of": 13,
     "id": "12-biology-7"
    },
    {
     "title": "Microbes in Human Welfare",
     "book": "Biology",
     "code": "lebo1",
     "n": 8,
     "of": 13,
     "id": "12-biology-8"
    },
    {
     "title": "Biotechnology: Principles and Processes",
     "book": "Biology",
     "code": "lebo1",
     "n": 9,
     "of": 13,
     "id": "12-biology-9"
    },
    {
     "title": "Biotechnology and its Applications",
     "book": "Biology",
     "code": "lebo1",
     "n": 10,
     "of": 13,
     "id": "12-biology-10"
    },
    {
     "title": "Organisms and Populations",
     "book": "Biology",
     "code": "lebo1",
     "n": 11,
     "of": 13,
     "id": "12-biology-11"
    },
    {
     "title": "Ecosystem",
     "book": "Biology",
     "code": "lebo1",
     "n": 12,
     "of": 13,
     "id": "12-biology-12"
    },
    {
     "title": "Biodiversity and Conservation",
     "book": "Biology",
     "code": "lebo1",
     "n": 13,
     "of": 13,
     "id": "12-biology-13"
    }
   ]
  },
  {
   "id": "economics",
   "name": "Economics",
   "icon": "📈",
   "books": [
    {
     "title": "Introductory Macroeconomics",
     "code": "leec1"
    },
    {
     "title": "Introductory Microeconomics",
     "code": "leec2"
    }
   ],
   "chapters": [
    {
     "title": "Introduction",
     "book": "Introductory Macroeconomics",
     "code": "leec1",
     "n": 1,
     "of": 6,
     "id": "12-economics-1"
    },
    {
     "title": "National Income Accounting",
     "book": "Introductory Macroeconomics",
     "code": "leec1",
     "n": 2,
     "of": 6,
     "id": "12-economics-2"
    },
    {
     "title": "Money and Banking",
     "book": "Introductory Macroeconomics",
     "code": "leec1",
     "n": 3,
     "of": 6,
     "id": "12-economics-3"
    },
    {
     "title": "Income Determination",
     "book": "Introductory Macroeconomics",
     "code": "leec1",
     "n": 4,
     "of": 6,
     "id": "12-economics-4"
    },
    {
     "title": "The Government Budget and the Economy",
     "book": "Introductory Macroeconomics",
     "code": "leec1",
     "n": 5,
     "of": 6,
     "id": "12-economics-5"
    },
    {
     "title": "Open Economy Macroeconomics",
     "book": "Introductory Macroeconomics",
     "code": "leec1",
     "n": 6,
     "of": 6,
     "id": "12-economics-6"
    },
    {
     "title": "Introduction",
     "book": "Introductory Microeconomics",
     "code": "leec2",
     "n": 1,
     "of": 5,
     "id": "12-economics-7"
    },
    {
     "title": "Theory of consumer behaviour",
     "book": "Introductory Microeconomics",
     "code": "leec2",
     "n": 2,
     "of": 5,
     "id": "12-economics-8"
    },
    {
     "title": "Production and costs",
     "book": "Introductory Microeconomics",
     "code": "leec2",
     "n": 3,
     "of": 5,
     "id": "12-economics-9"
    },
    {
     "title": "The theory of the firm under perfect competition",
     "book": "Introductory Microeconomics",
     "code": "leec2",
     "n": 4,
     "of": 5,
     "id": "12-economics-10"
    },
    {
     "title": "Market equilibrium",
     "book": "Introductory Microeconomics",
     "code": "leec2",
     "n": 5,
     "of": 5,
     "id": "12-economics-11"
    }
   ]
  },
  {
   "id": "accountancy",
   "name": "Accountancy",
   "icon": "🧾",
   "books": [
    {
     "title": "Accountancy-I",
     "code": "leac1"
    },
    {
     "title": "Accountancy Part-II",
     "code": "leac2"
    }
   ],
   "chapters": [
    {
     "title": "Accounting for Partnership: Basic Concepts",
     "book": "Accountancy-I",
     "code": "leac1",
     "n": 1,
     "of": 4,
     "id": "12-accountancy-1"
    },
    {
     "title": "Reconstitution of a Partnership Firm – Admission of a Partner",
     "book": "Accountancy-I",
     "code": "leac1",
     "n": 2,
     "of": 4,
     "id": "12-accountancy-2"
    },
    {
     "title": "Reconstitution of a Partnership Firm – Retirement/Death of a Partner",
     "book": "Accountancy-I",
     "code": "leac1",
     "n": 3,
     "of": 4,
     "id": "12-accountancy-3"
    },
    {
     "title": "Dissolution of Partnership Firm",
     "book": "Accountancy-I",
     "code": "leac1",
     "n": 4,
     "of": 4,
     "id": "12-accountancy-4"
    },
    {
     "title": "Accounting for Share Capital",
     "book": "Accountancy Part-II",
     "code": "leac2",
     "n": 1,
     "of": 6,
     "id": "12-accountancy-5"
    },
    {
     "title": "Issue and Redemption of Debentures",
     "book": "Accountancy Part-II",
     "code": "leac2",
     "n": 2,
     "of": 6,
     "id": "12-accountancy-6"
    },
    {
     "title": "Financial Statements of a Company",
     "book": "Accountancy Part-II",
     "code": "leac2",
     "n": 3,
     "of": 6,
     "id": "12-accountancy-7"
    },
    {
     "title": "Analysis of Financial Statements",
     "book": "Accountancy Part-II",
     "code": "leac2",
     "n": 4,
     "of": 6,
     "id": "12-accountancy-8"
    },
    {
     "title": "Accounting Ratios",
     "book": "Accountancy Part-II",
     "code": "leac2",
     "n": 5,
     "of": 6,
     "id": "12-accountancy-9"
    },
    {
     "title": "Cash Flow Statement",
     "book": "Accountancy Part-II",
     "code": "leac2",
     "n": 6,
     "of": 6,
     "id": "12-accountancy-10"
    }
   ]
  },
  {
   "id": "business-studies",
   "name": "Business Studies",
   "icon": "💼",
   "books": [
    {
     "title": "Business Studies-I",
     "code": "lebs1"
    },
    {
     "title": "Business Studies-II",
     "code": "lebs2"
    }
   ],
   "chapters": [
    {
     "title": "Nature and significance of Management",
     "book": "Business Studies-I",
     "code": "lebs1",
     "n": 1,
     "of": 8,
     "id": "12-business-studies-1"
    },
    {
     "title": "Principles of Management",
     "book": "Business Studies-I",
     "code": "lebs1",
     "n": 2,
     "of": 8,
     "id": "12-business-studies-2"
    },
    {
     "title": "Business Environment",
     "book": "Business Studies-I",
     "code": "lebs1",
     "n": 3,
     "of": 8,
     "id": "12-business-studies-3"
    },
    {
     "title": "Planning",
     "book": "Business Studies-I",
     "code": "lebs1",
     "n": 4,
     "of": 8,
     "id": "12-business-studies-4"
    },
    {
     "title": "Organising",
     "book": "Business Studies-I",
     "code": "lebs1",
     "n": 5,
     "of": 8,
     "id": "12-business-studies-5"
    },
    {
     "title": "Staffing",
     "book": "Business Studies-I",
     "code": "lebs1",
     "n": 6,
     "of": 8,
     "id": "12-business-studies-6"
    },
    {
     "title": "Directing",
     "book": "Business Studies-I",
     "code": "lebs1",
     "n": 7,
     "of": 8,
     "id": "12-business-studies-7"
    },
    {
     "title": "Controlling",
     "book": "Business Studies-I",
     "code": "lebs1",
     "n": 8,
     "of": 8,
     "id": "12-business-studies-8"
    },
    {
     "title": "Financial Management",
     "book": "Business Studies-II",
     "code": "lebs2",
     "n": 1,
     "of": 3,
     "id": "12-business-studies-9"
    },
    {
     "title": "Marketing",
     "book": "Business Studies-II",
     "code": "lebs2",
     "n": 2,
     "of": 3,
     "id": "12-business-studies-10"
    },
    {
     "title": "Consumer Protection",
     "book": "Business Studies-II",
     "code": "lebs2",
     "n": 3,
     "of": 3,
     "id": "12-business-studies-11"
    }
   ]
  },
  {
   "id": "history",
   "name": "History",
   "icon": "🏛️",
   "books": [
    {
     "title": "Themes in Indian History-I",
     "code": "lehs1"
    },
    {
     "title": "Themes in Indian History-II",
     "code": "lehs2"
    },
    {
     "title": "Themes in Indian History-III",
     "code": "lehs3"
    }
   ],
   "chapters": [
    {
     "title": "Bricks, Beads and Bones: The Harappan Civilisation",
     "book": "Themes in Indian History-I",
     "code": "lehs1",
     "n": 1,
     "of": 4,
     "id": "12-history-1"
    },
    {
     "title": "Kings, Farmers and Towns: Early States and Economies",
     "book": "Themes in Indian History-I",
     "code": "lehs1",
     "n": 2,
     "of": 4,
     "id": "12-history-2"
    },
    {
     "title": "Kinship, Caste and Class: Early Societies",
     "book": "Themes in Indian History-I",
     "code": "lehs1",
     "n": 3,
     "of": 4,
     "id": "12-history-3"
    },
    {
     "title": "Thinkers, Beliefs and Buildings: Cultural Developments",
     "book": "Themes in Indian History-I",
     "code": "lehs1",
     "n": 4,
     "of": 4,
     "id": "12-history-4"
    },
    {
     "title": "Through the Eyes of Travellers: Perceptions of Society (c. tenth to seventeenth century)",
     "book": "Themes in Indian History-II",
     "code": "lehs2",
     "n": 1,
     "of": 4,
     "id": "12-history-5"
    },
    {
     "title": "Bhakti–Sufi Traditions: Changes in Religious Beliefs and Devotional Texts (c. eighth to eighteenth century)",
     "book": "Themes in Indian History-II",
     "code": "lehs2",
     "n": 2,
     "of": 4,
     "id": "12-history-6"
    },
    {
     "title": "An Imperial Capital: Vijayanagara (c. fourteenth to sixteenth century)",
     "book": "Themes in Indian History-II",
     "code": "lehs2",
     "n": 3,
     "of": 4,
     "id": "12-history-7"
    },
    {
     "title": "Peasants, Zamindars and the State: Agrarian Society and the Mughal Empire (c. sixteenth-seventeenth centuries)",
     "book": "Themes in Indian History-II",
     "code": "lehs2",
     "n": 4,
     "of": 4,
     "id": "12-history-8"
    },
    {
     "title": "Colonialism and the Countryside: Exploring Official Archives",
     "book": "Themes in Indian History-III",
     "code": "lehs3",
     "n": 1,
     "of": 4,
     "id": "12-history-9"
    },
    {
     "title": "Rebels and the Raj: The Revolt of 1857 and Its Representations",
     "book": "Themes in Indian History-III",
     "code": "lehs3",
     "n": 2,
     "of": 4,
     "id": "12-history-10"
    },
    {
     "title": "Mahatma Gandhi and the Nationalist Movement: Civil Disobedience and Beyond",
     "book": "Themes in Indian History-III",
     "code": "lehs3",
     "n": 3,
     "of": 4,
     "id": "12-history-11"
    },
    {
     "title": "Framing the Constitution: The Beginning of a New Era",
     "book": "Themes in Indian History-III",
     "code": "lehs3",
     "n": 4,
     "of": 4,
     "id": "12-history-12"
    }
   ]
  },
  {
   "id": "geography",
   "name": "Geography",
   "icon": "🗺️",
   "books": [
    {
     "title": "Fundamentals of Human Geography",
     "code": "legy1"
    },
    {
     "title": "India - People and Economy",
     "code": "legy2"
    },
    {
     "title": "Practical Work in Geography Part II",
     "code": "legy3"
    }
   ],
   "chapters": [
    {
     "title": "Human Geography Nature and Scope",
     "book": "Fundamentals of Human Geography",
     "code": "legy1",
     "n": 1,
     "of": 8,
     "id": "12-geography-1"
    },
    {
     "title": "The World Population Distribution, Density and Growth",
     "book": "Fundamentals of Human Geography",
     "code": "legy1",
     "n": 2,
     "of": 8,
     "id": "12-geography-2"
    },
    {
     "title": "Human Development",
     "book": "Fundamentals of Human Geography",
     "code": "legy1",
     "n": 3,
     "of": 8,
     "id": "12-geography-3"
    },
    {
     "title": "Primary Activities",
     "book": "Fundamentals of Human Geography",
     "code": "legy1",
     "n": 4,
     "of": 8,
     "id": "12-geography-4"
    },
    {
     "title": "Secondary Activities",
     "book": "Fundamentals of Human Geography",
     "code": "legy1",
     "n": 5,
     "of": 8,
     "id": "12-geography-5"
    },
    {
     "title": "Tertiary and Quaternary Activities",
     "book": "Fundamentals of Human Geography",
     "code": "legy1",
     "n": 6,
     "of": 8,
     "id": "12-geography-6"
    },
    {
     "title": "Transport and Communication",
     "book": "Fundamentals of Human Geography",
     "code": "legy1",
     "n": 7,
     "of": 8,
     "id": "12-geography-7"
    },
    {
     "title": "International Trade",
     "book": "Fundamentals of Human Geography",
     "code": "legy1",
     "n": 8,
     "of": 8,
     "id": "12-geography-8"
    },
    {
     "title": "Population: Distribution, Density, Growth and Composition",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 1,
     "of": 9,
     "id": "12-geography-9"
    },
    {
     "title": "Human Settlements",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 2,
     "of": 9,
     "id": "12-geography-10"
    },
    {
     "title": "Land Resources and Agriculture",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 3,
     "of": 9,
     "id": "12-geography-11"
    },
    {
     "title": "Water Resources",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 4,
     "of": 9,
     "id": "12-geography-12"
    },
    {
     "title": "Mineral and Energy Resources",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 5,
     "of": 9,
     "id": "12-geography-13"
    },
    {
     "title": "Planning and Sustainable Development in Indian Context",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 6,
     "of": 9,
     "id": "12-geography-14"
    },
    {
     "title": "Transport and Communication",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 7,
     "of": 9,
     "id": "12-geography-15"
    },
    {
     "title": "International Trade",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 8,
     "of": 9,
     "id": "12-geography-16"
    },
    {
     "title": "Geographical Perspective on Selected Issues and Problems",
     "book": "India - People and Economy",
     "code": "legy2",
     "n": 9,
     "of": 9,
     "id": "12-geography-17"
    },
    {
     "title": "Data – Its Source and Compilation",
     "book": "Practical Work in Geography Part II",
     "code": "legy3",
     "n": 1,
     "of": 4,
     "id": "12-geography-18"
    },
    {
     "title": "Data Processing",
     "book": "Practical Work in Geography Part II",
     "code": "legy3",
     "n": 2,
     "of": 4,
     "id": "12-geography-19"
    },
    {
     "title": "Graphical Representation of Data",
     "book": "Practical Work in Geography Part II",
     "code": "legy3",
     "n": 3,
     "of": 4,
     "id": "12-geography-20"
    },
    {
     "title": "Spatial Information Technology",
     "book": "Practical Work in Geography Part II",
     "code": "legy3",
     "n": 4,
     "of": 4,
     "id": "12-geography-21"
    }
   ]
  },
  {
   "id": "political-science",
   "name": "Political Science",
   "icon": "⚖️",
   "books": [
    {
     "title": "Contemporary World Politics",
     "code": "leps1"
    },
    {
     "title": "Politics in India Since Independence",
     "code": "leps2"
    }
   ],
   "chapters": [
    {
     "title": "The End of Bipolarity",
     "book": "Contemporary World Politics",
     "code": "leps1",
     "n": 1,
     "of": 7,
     "id": "12-political-science-1"
    },
    {
     "title": "Contemporary Centres of Power",
     "book": "Contemporary World Politics",
     "code": "leps1",
     "n": 2,
     "of": 7,
     "id": "12-political-science-2"
    },
    {
     "title": "Contemporary South Asia",
     "book": "Contemporary World Politics",
     "code": "leps1",
     "n": 3,
     "of": 7,
     "id": "12-political-science-3"
    },
    {
     "title": "International Organisations",
     "book": "Contemporary World Politics",
     "code": "leps1",
     "n": 4,
     "of": 7,
     "id": "12-political-science-4"
    },
    {
     "title": "Security in the Contemporary World",
     "book": "Contemporary World Politics",
     "code": "leps1",
     "n": 5,
     "of": 7,
     "id": "12-political-science-5"
    },
    {
     "title": "Environment and Natural Resources",
     "book": "Contemporary World Politics",
     "code": "leps1",
     "n": 6,
     "of": 7,
     "id": "12-political-science-6"
    },
    {
     "title": "Globalisation",
     "book": "Contemporary World Politics",
     "code": "leps1",
     "n": 7,
     "of": 7,
     "id": "12-political-science-7"
    },
    {
     "title": "Challenges of Nation Building",
     "book": "Politics in India Since Independence",
     "code": "leps2",
     "n": 1,
     "of": 8,
     "id": "12-political-science-8"
    },
    {
     "title": "Era of One-party Dominance",
     "book": "Politics in India Since Independence",
     "code": "leps2",
     "n": 2,
     "of": 8,
     "id": "12-political-science-9"
    },
    {
     "title": "Politics of Planned Development",
     "book": "Politics in India Since Independence",
     "code": "leps2",
     "n": 3,
     "of": 8,
     "id": "12-political-science-10"
    },
    {
     "title": "India’s External Relations",
     "book": "Politics in India Since Independence",
     "code": "leps2",
     "n": 4,
     "of": 8,
     "id": "12-political-science-11"
    },
    {
     "title": "Challenges to and Restoration of the Congress System",
     "book": "Politics in India Since Independence",
     "code": "leps2",
     "n": 5,
     "of": 8,
     "id": "12-political-science-12"
    },
    {
     "title": "The Crisis of Democratic Order",
     "book": "Politics in India Since Independence",
     "code": "leps2",
     "n": 6,
     "of": 8,
     "id": "12-political-science-13"
    },
    {
     "title": "Regional Aspirations",
     "book": "Politics in India Since Independence",
     "code": "leps2",
     "n": 7,
     "of": 8,
     "id": "12-political-science-14"
    },
    {
     "title": "Recent Developments in Indian Politics",
     "book": "Politics in India Since Independence",
     "code": "leps2",
     "n": 8,
     "of": 8,
     "id": "12-political-science-15"
    }
   ]
  },
  {
   "id": "english",
   "name": "English",
   "icon": "📖",
   "books": [
    {
     "title": "Flamingo",
     "code": "lefl1"
    }
   ],
   "chapters": [
    {
     "title": "The Last Lesson",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 1,
     "of": 13,
     "id": "12-english-1"
    },
    {
     "title": "Lost Spring",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 2,
     "of": 13,
     "id": "12-english-2"
    },
    {
     "title": "Deep Water",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 3,
     "of": 13,
     "id": "12-english-3"
    },
    {
     "title": "The Rattrap",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 4,
     "of": 13,
     "id": "12-english-4"
    },
    {
     "title": "Indigo",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 5,
     "of": 13,
     "id": "12-english-5"
    },
    {
     "title": "Poets and Pancakes",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 6,
     "of": 13,
     "id": "12-english-6"
    },
    {
     "title": "The Interview",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 7,
     "of": 13,
     "id": "12-english-7"
    },
    {
     "title": "Going Places",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 8,
     "of": 13,
     "id": "12-english-8"
    },
    {
     "title": "My Mother at Sixty-six",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 9,
     "of": 13,
     "id": "12-english-9"
    },
    {
     "title": "Keeping Quiet",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 10,
     "of": 13,
     "id": "12-english-10"
    },
    {
     "title": "A Thing of Beauty",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 11,
     "of": 13,
     "id": "12-english-11"
    },
    {
     "title": "A Roadside Stand",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 12,
     "of": 13,
     "id": "12-english-12"
    },
    {
     "title": "Aunt Jennifer’s Tigers",
     "book": "Flamingo",
     "code": "lefl1",
     "n": 13,
     "of": 13,
     "id": "12-english-13"
    }
   ]
  }
 ]
};

export function subjectsFor(classLevel: number): Subject[] {
  return CURRICULUM[classLevel as ClassLevel] ?? [];
}

export function findChapter(chapterId: string): { classLevel: ClassLevel; subject: Subject; chapter: Chapter } | null {
  for (const level of CLASS_LEVELS) {
    for (const subject of CURRICULUM[level]) {
      const chapter = subject.chapters.find((c) => c.id === chapterId);
      if (chapter) return { classLevel: level, subject, chapter };
    }
  }
  return null;
}

export function ncertLink(chapter: Chapter) {
  return `https://ncert.nic.in/textbook.php?${chapter.code}=${chapter.n}-${chapter.of}`;
}
