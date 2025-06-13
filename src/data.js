import Thumbnail1 from "./assets/flag1.jpg";
import Thumbnail2 from "./assets/flag2.jpg";
import Thumbnail3 from "./assets/flag3.png";
import candidate1 from "./assets/candidate1.jpg";
import candidate2 from "./assets/candidate2.jpg";
import candidate3 from "./assets/candidate3.jpg";
import candidate4 from "./assets/candidate4.jpg";
import candidate5 from "./assets/candidate5.jpg";
import candidate6 from "./assets/candidate6.jpg";
import candidate7 from "./assets/candidate7.jpg";


export const elections = [
    {
        id: "e1",
        title: "Harvard Presedential Elections 2025",
        description: `Provident similique accusantium nemo autem. Veritatis 
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut!`,
        thumbnail: Thumbnail1,
        candidates: ["c1", "c2", "c3", "c4"],
        voters: []
    },
    {
        id: "e2",
        title: "Legon SRC Presendential Election 2025",
        description: `Provident similique accusantium nemo autem. Veritatis 
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut!`,
        thumbnail: Thumbnail2,
        candidates: ["c5", "c6", "c7"],
        voters: []
    },
    {
        id: "e3",
        title: "Stanford Presedential Elections 2025",
        description: `Provident similique accusantium nemo autem. Veritatis 
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut!`,
        thumbnail: Thumbnail3,
        candidates: ["c8", "c9"],
        voters: []
    },

]


export const candidates = [
    {
        id: "c1",
        fullName: "John Doe",
        image: candidate1,
        motto: "We will make Legon great again",
        voteCount: 23,
        election: "e1", // Matches election id
    },
    {
        id: "c2",
        fullName: "Enoch Ganyo",
        image: candidate2,
        motto: "We will make Legon great again",
        voteCount: 23,
        election: "e1", // Matches election id
    },
    {
        id: "c3",
        fullName: "John Doe",
        image: candidate3,
        motto: "We will make Legon great again",
        voteCount: 23,
        election: "e1", // Matches election id
    },
    {
        id: "c4",
        fullName: "John Doe",
        image: candidate4,
        motto: "We will make Legon great again",
        voteCount: 23,
        election: "e2", // Matches election id
    },
    {
        id: "c5",
        fullName: "John Doe",
        image: candidate5,
        motto: "We will make Legon great again",
        voteCount: 23,
        election: "e2", // Matches election id
    },
    {
        id: "c6",
        fullName: "John Doe",
        image: candidate6,
        motto: "We will make Legon great again",
        voteCount: 23,
        election: "e2", // Matches election id
    },
    {
        id: "c7",
        fullName: "John Doe",
        image: candidate7,
        motto: "We will make Legon great again",
        voteCount: 23,
        election: "e3", // Matches election id
    },
];

export const voters = [
    {id: "v1",
    fullName: "Ernest Achiever",
    email: "achiever@gmail.com",
    password: "achiever123",
    isAdmin: true,
    votedElections: ["e2"]
    },
    {
        id: "v2",
        fullName: "John Doe",
        email: "john@gmail.com",
        password: "john123",
        isAdmin: false,
        votedElections: ["e1"]
    }
]

