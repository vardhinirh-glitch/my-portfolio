const portfolioData = {
  profile: {
    name: "HARSHA VARDHINI R",
    title: "AI & Data Science Student",
    tagline: "Building with AI. Exploring what's next. Leading where I can.",
    location: "Chennai, India",
    resumeUrl: "resume.pdf",
    contact: {
      email: "vardhinirh@gmail.com",
      phone: "+917200902468",
      linkedin: "https://www.linkedin.com/in/harsha-vardhini-05783036a/",
      github: "https://github.com/vardhinirh-glitch"
    }
  },
  
  sections: [
    {
      id: "about",
      title: "ABOUT / ACADEMICS",
      type: "about",
      visible: true,
      order: 1,
      content: {
        bio: "I’m Harsha Vardhini R, a student in Artificial Intelligence & Data Science at Panimalar Engineering College, Chennai. I’m interested in building practical AI solutions, exploring emerging technologies, participating in hackathons, and creating meaningful experiences through technology communities, leadership, and communication.",
        academic: {
          degree: "B.Tech",
          branch: "Artificial Intelligence & Data Science",
          college: "Panimalar Engineering College",
          currentYear: "1st Year",
          expectedGraduation: "2029",
          location: "Chennai, India"
        },
        focus: [
          "Artificial Intelligence & Machine Learning",
          "Generative AI",
          "Computer Vision",
          "NLP",
          "AI-powered applications",
          "Practical problem solving",
          "Hackathon-driven development"
        ],
        learning: [
          "Programming",
          "Data Structures & Algorithms",
          "AI/ML",
          "Generative AI",
          "Software development",
          "Research methodologies",
          "Practical AI development"
        ],
        careerInterest: "Artificial Intelligence, research, real-world problem solving and technology-driven products.",
        distinctiveIdentity: "Combining technical exploration with hackathons, technology communities, leadership, event organization and public speaking."
      }
    },
    {
      id: "projects",
      title: "PROJECTS",
      type: "projects",
      visible: true,
      order: 2,
      content: [
        {
          id: "vanguard-ai",
          name: "Vanguard AI - Multilingual AI Resume Screening System",
          description: "Built a multilingual AI-based resume screening system.",
          problem: "Traditional hiring tools struggle with multi-language resumes and non-standard layouts.",
          solution: "Automated candidate ranking based on skills, projects, and experience while reducing language barriers in hiring processes.",
          technologies: ["Python", "LLM Fundamentals", "Streamlit", "REST APIs"],
          contribution: "Lead developer and AI workflow designer.",
          features: ["Multilingual Parsing", "Automated Ranking", "Interactive Dashboard"],
          github: "https://github.com/vardhinirh-glitch",
          liveDemo: "",
          image: "profile.jpg",
          date: "2026",
          status: "Completed"
        }
      ]
    },
    {
      id: "experience",
      title: "EXPERIENCE",
      type: "experience",
      visible: true,
      order: 3,
      content: [
        {
          organization: "Code Alpha",
          position: "Python Developer",
          duration: "1 Month",
          type: "Online Internship",
          projects: [
            {
              name: "Stock Portfolio Tracker",
              url: "https://github.com/vardhinirh-glitch/stock-portfolio-tracker"
            },
            {
              name: "Hangman Game",
              url: "https://github.com/vardhinirh-glitch/Hangame-game"
            }
          ],
          technologies: ["Python", "Git/GitHub", "Python standard libraries"]
        },
        {
          organization: "SheBuilds Chennai",
          position: "Outreach",
          duration: "2 Months",
          type: "Community Work",
          responsibilities: [
            "Community partnerships",
            "Sponsorship outreach",
            "Communication",
            "Coordination"
          ],
          tools: ["LinkedIn", "Gmail"]
        }
      ]
    },
    {
      id: "certifications",
      title: "CERTIFICATIONS",
      type: "certifications",
      visible: true,
      order: 4,
      content: [
        {
          name: "Cloud Computing 101",
          issuer: "AWS",
          date: "2026",
          credentialId: "",
          verificationUrl: ""
        },
        {
          name: "Introduction to Generative AI",
          issuer: "AWS",
          date: "2026",
          credentialId: "",
          verificationUrl: ""
        },
        {
          name: "Machine Learning Foundation",
          issuer: "AWS",
          date: "2026",
          credentialId: "",
          verificationUrl: ""
        }
      ]
    },
    {
      id: "hackathons",
      title: "HACKATHONS & ACHIEVEMENTS",
      type: "hackathons",
      visible: true,
      order: 5,
      content: [
        {
          title: "EDGEX 12-Hour Hackathon",
          achievement: "Cleared two rounds before the final evaluation round",
          description: "Engineered rapid AI solutions under a strict 12-hour timeline."
        },
        {
          title: "Intra-College Extempore Competition",
          achievement: "Finalist",
          description: "Shortlisted for the finals among students across all departments."
        },
        {
          title: "Meme Hack",
          achievement: "Lead & Host",
          description: "Led and hosted an innovative startup ideation contest."
        }
      ]
    },
    {
      id: "leadership",
      title: "LEADERSHIP & COMMUNITY",
      type: "leadership",
      visible: true,
      order: 6,
      content: [
        {
          role: "Community Lead",
          organization: "Nexora",
          details: "Coordinating community activities and technical events."
        },
        {
          role: "Core Organizing Team Member",
          organization: "CodeSapiens",
          details: "Assisted in hosting and managing online technical events and sessions."
        },
        {
          role: "Track Lead",
          organization: "Technical Communities",
          details: "Hosted workshops, contests, and technical sessions."
        }
      ]
    },
    {
      id: "speaking",
      title: "PUBLIC SPEAKING",
      type: "speaking",
      visible: true, order: 7,
      content: [
        {
          event: "Online Technical Sessions",
          organization: "Nexora & CodeSapiens",
          role: "Host",
          type: "Online"
        },
        {
          event: "Offline School & College Events",
          organization: "Panimalar Engineering College / School",
          role: "Host",
          type: "Offline"
        },
        {
          event: "CodeSapiens Meetups",
          organization: "CodeSapiens",
          role: "Host",
          type: "Community Meetup"
        },
        {
          event: "Model United Nations (MUN)",
          organization: "MUN",
          role: "Delegate / Speaker",
          type: "Competition",
          note: "Received Special Mention for making a major contribution to the formation of a bloc by the end of the MUN."
        },
        {
          event: "Intra-College Extempore Competition",
          organization: "Panimalar Engineering College",
          role: "Finalist",
          type: "Intra-College Competition",
          note: "Shortlisted for the finals among students from all departments."
        }
      ]
    }
  ]
};
