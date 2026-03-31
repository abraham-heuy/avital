export interface SuccessStory {
    id: string
    title: string
    excerpt: string
    content: string
    studentName: string
    studentUniversity: string
    studentCourse: string
    projectType: string
    techStack: string[]
    outcome: string
    date: string
    image?: string
    metrics?: {
      label: string
      value: string
    }[]
  }
  
  export const successStories: SuccessStory[] = [
    {
      id: 'ai-healthcare-dashboard',
      title: 'From Failed Prototype to AI-Powered Healthcare Dashboard',
      excerpt: 'How a final year Computer Science student turned a failing project into a award-winning capstone with expert mentorship.',
      content: `
        <p>James Mwangi, a final year Computer Science student at the University of Nairobi, was struggling with his capstone project — an AI-powered patient monitoring dashboard. The project was two months behind schedule and the prototype was not working.</p>
        
        <h2>The Challenge</h2>
        <p>James had built a basic React dashboard but could not integrate the machine learning model that was supposed to predict patient deterioration. The model accuracy was below 60% and the frontend kept crashing when processing real-time data.</p>
        
        <h2>The Solution</h2>
        <p>Through Avital, James was matched with Abraham Kioko, an ML & Data Engineering consultant. Over 8 weeks, they worked together to:</p>
        <ul>
          <li>Rebuild the ML model using TensorFlow with proper data preprocessing</li>
          <li>Optimize the React frontend for real-time data streaming</li>
          <li>Implement a FastAPI backend to serve predictions</li>
          <li>Deploy the application on Railway for testing</li>
        </ul>
        
        <h2>The Outcome</h2>
        <p>James submitted his project on time and received a distinction. His dashboard is now being piloted by a local hospital for patient monitoring.</p>
      `,
      studentName: 'James Mwangi',
      studentUniversity: 'University of Nairobi',
      studentCourse: 'BSc Computer Science',
      projectType: 'Capstone Project',
      techStack: ['React', 'TensorFlow', 'FastAPI', 'Python', 'PostgreSQL'],
      outcome: 'Received distinction, now piloted by local hospital',
      date: '2024-12-15',
      metrics: [
        { label: 'Project Grade', value: 'A' },
        { label: 'Time Saved', value: '6 weeks' },
        { label: 'Model Accuracy', value: '89%' },
      ],
    },
    {
      id: 'blockchain-supply-chain',
      title: 'Building a Blockchain Supply Chain Tracker from Scratch',
      excerpt: 'A group of 4 students built a working blockchain solution for a logistics company with guidance from Avital consultants.',
      content: `
        <p>A team of 4 Information Technology students from JKUAT wanted to build a blockchain-based supply chain tracker for their final year project. None of them had written a single line of Solidity code before.</p>
        
        <h2>The Challenge</h2>
        <p>The team had ambitious ideas but lacked the technical skills to implement blockchain. They were overwhelmed by the complexity of smart contracts, gas optimization, and frontend integration.</p>
        
        <h2>The Solution</h2>
        <p>Avital matched them with Joel Irungu, a Full-Stack & DevOps consultant. Over 3 months, the team learned:</p>
        <ul>
          <li>Solidity basics and smart contract development</li>
          <li>Hardhat for testing and deployment</li>
          <li>Web3.js for frontend integration</li>
          <li>IPFS for document storage</li>
        </ul>
        <p>Joel conducted weekly workshops and code reviews, ensuring the team understood every line of code they wrote.</p>
        
        <h2>The Outcome</h2>
        <p>The team successfully deployed their supply chain tracker on a private Ethereum network. Their project won the Best Innovation award at the university's tech expo.</p>
      `,
      studentName: 'Team Led by Sarah Kariuki',
      studentUniversity: 'JKUAT',
      studentCourse: 'BSc Information Technology',
      projectType: 'Group Capstone',
      techStack: ['Solidity', 'Hardhat', 'Web3.js', 'Node.js', 'IPFS'],
      outcome: 'Won Best Innovation award at university tech expo',
      date: '2024-10-20',
      metrics: [
        { label: 'Team Size', value: '4 students' },
        { label: 'Project Grade', value: 'A' },
        { label: 'Award', value: 'Best Innovation' },
      ],
    },
    {
      id: 'career-transition',
      title: 'From Civil Engineering to Software Developer in 6 Months',
      excerpt: 'How mentorship and structured learning helped a civil engineering graduate land their first tech job.',
      content: `
        <p>Michael Otieno graduated with a degree in Civil Engineering but always had a passion for coding. He spent 2 years applying for tech roles with no success — his portfolio was weak and his technical interview skills needed work.</p>
        
        <h2>The Challenge</h2>
        <p>Michael had self-taught coding skills but lacked structure, mentorship, and interview preparation. His GitHub was empty and he had no real-world projects to show.</p>
        
        <h2>The Solution</h2>
        <p>Through Avital's Career & Interview Preparation package, Michael was paired with a consultant who had recently transitioned into tech. Together they:</p>
        <ul>
          <li>Built 3 portfolio projects (e-commerce site, task manager API, weather dashboard)</li>
          <li>Practiced 20+ mock technical interviews</li>
          <li>Optimized his resume and LinkedIn profile</li>
          <li>Created a personal branding strategy</li>
        </ul>
        
        <h2>The Outcome</h2>
        <p>Michael landed a Junior Software Developer role at a tech startup within 4 months of starting mentorship. He now mentors other career transition students.</p>
      `,
      studentName: 'Michael Otieno',
      studentUniversity: 'University of Nairobi',
      studentCourse: 'BSc Civil Engineering (Career Transition)',
      projectType: 'Career Mentorship',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
      outcome: 'Landed Junior Developer role within 4 months',
      date: '2024-08-10',
      metrics: [
        { label: 'Time to Job', value: '4 months' },
        { label: 'Portfolio Projects', value: '3' },
        { label: 'Mock Interviews', value: '20+' },
      ],
    },
  ]