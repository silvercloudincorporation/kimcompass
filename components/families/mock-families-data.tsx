export type Family = {
    id: string
    name: string
    headOfFamily: string
    type: string
    memberCount: number
    status: string
    region: string
    description: string
    createdAt: string
    members: FamilyMember[]
  }
  
  export type FamilyMember = {
    id: string
    name: string
    relationship: string
    age: number
    gender: string
    isHead: boolean
  }
  
  export const mockFamilies: Family[] = [
    {
      id: "fam-001",
      name: "Kimani Family",
      headOfFamily: "James Kimani",
      type: "nuclear",
      memberCount: 5,
      status: "active",
      region: "central",
      description: "A traditional nuclear family with strong ties to the Kikuyu community.",
      createdAt: "2022-03-15",
      members: [
        {
          id: "mem-001",
          name: "James Kimani",
          relationship: "Father",
          age: 45,
          gender: "Male",
          isHead: true,
        },
        {
          id: "mem-002",
          name: "Sarah Kimani",
          relationship: "Mother",
          age: 42,
          gender: "Female",
          isHead: false,
        },
        {
          id: "mem-003",
          name: "Peter Kimani",
          relationship: "Son",
          age: 18,
          gender: "Male",
          isHead: false,
        },
        {
          id: "mem-004",
          name: "Mary Kimani",
          relationship: "Daughter",
          age: 15,
          gender: "Female",
          isHead: false,
        },
        {
          id: "mem-005",
          name: "David Kimani",
          relationship: "Son",
          age: 10,
          gender: "Male",
          isHead: false,
        },
      ],
    },
    {
      id: "fam-002",
      name: "Ochieng Family",
      headOfFamily: "Daniel Ochieng",
      type: "extended",
      memberCount: 8,
      status: "active",
      region: "west",
      description: "An extended family with multiple generations living together.",
      createdAt: "2021-11-22",
      members: [
        {
          id: "mem-006",
          name: "Daniel Ochieng",
          relationship: "Father",
          age: 52,
          gender: "Male",
          isHead: true,
        },
        {
          id: "mem-007",
          name: "Grace Ochieng",
          relationship: "Mother",
          age: 48,
          gender: "Female",
          isHead: false,
        },
        {
          id: "mem-008",
          name: "Michael Ochieng",
          relationship: "Son",
          age: 25,
          gender: "Male",
          isHead: false,
        },
        {
          id: "mem-009",
          name: "Jane Ochieng",
          relationship: "Daughter-in-law",
          age: 23,
          gender: "Female",
          isHead: false,
        },
        {
          id: "mem-010",
          name: "Baby Ochieng",
          relationship: "Grandchild",
          age: 1,
          gender: "Female",
          isHead: false,
        },
      ],
    },
    {
      id: "fam-003",
      name: "Wanjiku Family",
      headOfFamily: "Elizabeth Wanjiku",
      type: "single-parent",
      memberCount: 3,
      status: "active",
      region: "east",
      description: "A single-parent family headed by a strong mother.",
      createdAt: "2023-01-05",
      members: [
        {
          id: "mem-011",
          name: "Elizabeth Wanjiku",
          relationship: "Mother",
          age: 38,
          gender: "Female",
          isHead: true,
        },
        {
          id: "mem-012",
          name: "John Wanjiku",
          relationship: "Son",
          age: 12,
          gender: "Male",
          isHead: false,
        },
        {
          id: "mem-013",
          name: "Catherine Wanjiku",
          relationship: "Daughter",
          age: 8,
          gender: "Female",
          isHead: false,
        },
      ],
    },
    {
      id: "fam-004",
      name: "Mwangi-Kamau Family",
      headOfFamily: "Joseph Mwangi",
      type: "blended",
      memberCount: 6,
      status: "pending",
      region: "north",
      description: "A blended family formed from two previous families.",
      createdAt: "2023-05-18",
      members: [
        {
          id: "mem-014",
          name: "Joseph Mwangi",
          relationship: "Father",
          age: 44,
          gender: "Male",
          isHead: true,
        },
        {
          id: "mem-015",
          name: "Lucy Kamau",
          relationship: "Mother",
          age: 40,
          gender: "Female",
          isHead: false,
        },
        {
          id: "mem-016",
          name: "Brian Mwangi",
          relationship: "Son",
          age: 16,
          gender: "Male",
          isHead: false,
        },
        {
          id: "mem-017",
          name: "Kevin Mwangi",
          relationship: "Son",
          age: 14,
          gender: "Male",
          isHead: false,
        },
      ],
    },
    {
      id: "fam-005",
      name: "Njoroge Family",
      headOfFamily: "Samuel Njoroge",
      type: "nuclear",
      memberCount: 4,
      status: "inactive",
      region: "central",
      description: "A nuclear family that has relocated abroad but maintains ties to Kenya.",
      createdAt: "2020-08-10",
      members: [
        {
          id: "mem-018",
          name: "Samuel Njoroge",
          relationship: "Father",
          age: 50,
          gender: "Male",
          isHead: true,
        },
        {
          id: "mem-019",
          name: "Ruth Njoroge",
          relationship: "Mother",
          age: 47,
          gender: "Female",
          isHead: false,
        },
        {
          id: "mem-020",
          name: "Paul Njoroge",
          relationship: "Son",
          age: 22,
          gender: "Male",
          isHead: false,
        },
        {
          id: "mem-021",
          name: "Esther Njoroge",
          relationship: "Daughter",
          age: 19,
          gender: "Female",
          isHead: false,
        },
      ],
    },
    {
      id: "fam-006",
      name: "Otieno Family",
      headOfFamily: "George Otieno",
      type: "extended",
      memberCount: 7,
      status: "active",
      region: "west",
      description: "A large extended family with strong cultural traditions.",
      createdAt: "2021-04-30",
      members: [
        {
          id: "mem-022",
          name: "George Otieno",
          relationship: "Father",
          age: 55,
          gender: "Male",
          isHead: true,
        },
        {
          id: "mem-023",
          name: "Margaret Otieno",
          relationship: "Mother",
          age: 52,
          gender: "Female",
          isHead: false,
        },
      ],
    },
  ]
  