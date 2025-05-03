// Mock data for news items
export interface NewsItem {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  featuredImage: string
  categories: string[]
  status: "Draft" | "Published" | "Scheduled"
  publishDate: Date
  author: string
  createdAt: Date
  updatedAt: Date
  relatedEventId?: string
  views: number
}

export const mockNewsData: NewsItem[] = [
  {
    id: "news-1",
    title: "Annual Cultural Festival Announced",
    slug: "annual-cultural-festival-announced",
    summary: "The annual cultural festival celebrating our heritage will be held next month.",
    content:
      "We are pleased to announce that the annual cultural festival celebrating our rich heritage will be held from June 15-18, 2023. This year's theme is 'Preserving Our Roots, Embracing Our Future.' The festival will feature traditional dances, music performances, storytelling sessions, and culinary exhibitions. All community members are invited to participate and showcase their talents.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Event", "Cultural", "Community"],
    status: "Published",
    publishDate: new Date("2023-05-15T09:00:00"),
    author: "Jane Muthoni",
    createdAt: new Date("2023-05-10T14:30:00"),
    updatedAt: new Date("2023-05-12T11:45:00"),
    relatedEventId: "event-1",
    views: 1245,
  },
  {
    id: "news-2",
    title: "Community Leadership Elections Results",
    slug: "community-leadership-elections-results",
    summary: "Results of the recent community leadership elections have been announced.",
    content:
      "The results of the recent community leadership elections have been finalized. Mr. James Kamau has been elected as the new Community Chairperson with 65% of the votes. Mrs. Sarah Wanjiku will serve as the Deputy Chairperson. The new leadership team will be inaugurated on July 1st, 2023, at the community center. We congratulate all elected officials and thank everyone who participated in the democratic process.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Announcement", "Community", "Leadership"],
    status: "Published",
    publishDate: new Date("2023-05-20T10:30:00"),
    author: "Daniel Ochieng",
    createdAt: new Date("2023-05-18T16:20:00"),
    updatedAt: new Date("2023-05-19T09:15:00"),
    views: 987,
  },
  {
    id: "news-3",
    title: "New Educational Scholarship Program Launched",
    slug: "new-educational-scholarship-program-launched",
    summary: "A new scholarship program for talented students from our community has been launched.",
    content:
      "We are excited to announce the launch of the 'Future Leaders Scholarship Program' aimed at supporting talented students from our community. The program will provide full tuition coverage for secondary and university education for selected students who demonstrate academic excellence and leadership potential. Applications will open on August 1st, 2023, and close on September 30th, 2023. Interested candidates should prepare their academic transcripts and a personal statement.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Education", "Announcement", "Youth"],
    status: "Published",
    publishDate: new Date("2023-05-25T08:45:00"),
    author: "Elizabeth Akinyi",
    createdAt: new Date("2023-05-22T13:10:00"),
    updatedAt: new Date("2023-05-24T10:30:00"),
    views: 756,
  },
  {
    id: "news-4",
    title: "Community Health Awareness Campaign",
    slug: "community-health-awareness-campaign",
    summary: "A month-long health awareness campaign will be conducted in our community.",
    content:
      "Starting next week, a month-long health awareness campaign will be conducted across all regions of our community. The campaign will focus on preventive healthcare, nutrition, maternal health, and common diseases affecting our community. Free health screenings will be available at designated centers every weekend during the campaign period. Health professionals will also conduct workshops on various health topics. We encourage all community members to take advantage of this opportunity to learn more about maintaining good health.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Health", "Community", "Education"],
    status: "Scheduled",
    publishDate: new Date("2023-06-01T09:00:00"),
    author: "Dr. Michael Njoroge",
    createdAt: new Date("2023-05-26T15:40:00"),
    updatedAt: new Date("2023-05-28T11:20:00"),
    views: 0,
  },
  {
    id: "news-5",
    title: "Traditional Knowledge Documentation Project",
    slug: "traditional-knowledge-documentation-project",
    summary: "A new project to document our traditional knowledge and practices has been initiated.",
    content:
      "We are proud to announce the initiation of the 'Traditional Knowledge Documentation Project.' This important initiative aims to preserve our cultural heritage by documenting traditional knowledge, practices, stories, and skills that have been passed down through generations. Community elders and knowledge keepers are invited to participate in interview sessions that will be conducted by trained documentarians. The collected information will be archived in digital and print formats for future generations. If you or someone you know possesses valuable traditional knowledge, please contact the project coordinator.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Cultural", "Heritage", "Education"],
    status: "Draft",
    publishDate: new Date("2023-06-10T10:00:00"),
    author: "Peter Maina",
    createdAt: new Date("2023-05-29T14:15:00"),
    updatedAt: new Date("2023-05-29T14:15:00"),
    views: 0,
  },
  {
    id: "news-6",
    title: "Community Infrastructure Development Update",
    slug: "community-infrastructure-development-update",
    summary: "Progress update on ongoing infrastructure development projects in our community.",
    content:
      "We are pleased to provide an update on the ongoing infrastructure development projects in our community. The construction of the new community center is 70% complete and is expected to be finished by September 2023. The road improvement project connecting our main villages has been completed, significantly reducing travel time and improving accessibility. The water supply expansion project has reached 85% of targeted households, with the remaining connections expected to be completed within the next two months. We thank all community members for their patience and cooperation during these development activities.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Development", "Infrastructure", "Community"],
    status: "Published",
    publishDate: new Date("2023-05-18T11:30:00"),
    author: "Robert Kimani",
    createdAt: new Date("2023-05-16T09:45:00"),
    updatedAt: new Date("2023-05-17T14:20:00"),
    views: 632,
  },
  {
    id: "news-7",
    title: "Emergency Response Team Training",
    slug: "emergency-response-team-training",
    summary: "Training sessions for community emergency response team volunteers will be conducted next month.",
    content:
      "In preparation for the upcoming rainy season, training sessions for community emergency response team volunteers will be conducted next month. The training will cover basic first aid, search and rescue techniques, evacuation procedures, and emergency communication protocols. Interested volunteers should register by June 5th, 2023. No prior experience is required, but participants must be at least 18 years old and physically fit. This initiative aims to enhance our community's resilience and preparedness for potential emergencies.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Safety", "Training", "Community"],
    status: "Published",
    publishDate: new Date("2023-05-28T13:15:00"),
    author: "Grace Wambui",
    createdAt: new Date("2023-05-25T10:30:00"),
    updatedAt: new Date("2023-05-27T16:45:00"),
    views: 421,
  },
  {
    id: "news-8",
    title: "Youth Entrepreneurship Workshop Series",
    slug: "youth-entrepreneurship-workshop-series",
    summary: "A series of workshops focused on youth entrepreneurship will be held this summer.",
    content:
      "We are excited to announce a series of workshops focused on youth entrepreneurship that will be held this summer. The workshops will cover business planning, marketing strategies, financial management, and accessing startup funding. Successful entrepreneurs from our community will share their experiences and insights. The workshop series is open to young people aged 18-35 who are interested in starting their own businesses or improving existing ones. Registration is free but spaces are limited, so early registration is encouraged.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Youth", "Business", "Education"],
    status: "Draft",
    publishDate: new Date("2023-06-15T09:00:00"),
    author: "Samuel Otieno",
    createdAt: new Date("2023-05-30T11:20:00"),
    updatedAt: new Date("2023-05-30T11:20:00"),
    views: 0,
  },
  {
    id: "news-9",
    title: "Community Environmental Conservation Initiative",
    slug: "community-environmental-conservation-initiative",
    summary: "A new initiative to protect and restore our local environment has been launched.",
    content:
      "We are proud to announce the launch of the 'Green Community Initiative,' a comprehensive program aimed at protecting and restoring our local environment. The initiative includes regular community clean-up events, tree planting activities, waste management education, and the establishment of a community nursery for indigenous plants. The first community clean-up event will take place on June 5th, 2023, coinciding with World Environment Day. All community members are encouraged to participate and contribute to making our community cleaner and greener.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Environment", "Community", "Conservation"],
    status: "Published",
    publishDate: new Date("2023-05-22T10:00:00"),
    author: "Nancy Wangari",
    createdAt: new Date("2023-05-19T15:30:00"),
    updatedAt: new Date("2023-05-21T09:45:00"),
    views: 845,
  },
  {
    id: "news-10",
    title: "Annual Community Sports Tournament",
    slug: "annual-community-sports-tournament",
    summary: "Registration is now open for the annual community sports tournament.",
    content:
      "Registration is now open for the annual community sports tournament, which will be held from July 10-24, 2023. The tournament will feature competitions in football, volleyball, athletics, and traditional games for various age categories. Teams and individuals can register until June 30th, 2023. This year's tournament aims to promote physical fitness, teamwork, and community spirit. Attractive prizes will be awarded to winners in each category. We invite all community members to participate either as competitors or spectators.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    categories: ["Sports", "Community", "Youth"],
    status: "Scheduled",
    publishDate: new Date("2023-06-05T08:30:00"),
    author: "David Mwangi",
    createdAt: new Date("2023-05-31T13:40:00"),
    updatedAt: new Date("2023-05-31T16:15:00"),
    views: 0,
  },
]

// Helper function to get all unique categories from the mock data
export const getAllCategories = (): string[] => {
  const categoriesSet = new Set<string>()

  mockNewsData.forEach((news) => {
    news.categories.forEach((category) => {
      categoriesSet.add(category)
    })
  })

  return Array.from(categoriesSet).sort()
}
