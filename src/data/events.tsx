export interface BaseEvent {
    id: string
    title: string
    excerpt: string
    description: string
    date: string
    time: string
    endDate?: string
    type: 'workshop' | 'hackathon' | 'career-talk' | 'webinar'
    location: string
    venue?: string
    speakers?: Array<{ name: string; role: string; company?: string }>
    agenda?: Array<{ time: string; activity: string; speaker?: string }>
    requirements?: string[]
    capacity?: number
    registeredCount?: number
    image?: string
}

export interface HackathonEvent extends BaseEvent {
    type: 'hackathon'
    problemStatements: string[]
    solutionRequirements: string[]
    submissionGuidelines: string[]
    judgingCriteria: { criterion: string; weight: number }[]
    prizes: { place: string; prize: string }[]
    teamSize: { min: number; max: number }
    resourcesProvided?: string[]
}

export type Event = BaseEvent | HackathonEvent

export const events: Event[] = [
    {
        id: 'system-design-workshop',
        title: 'System Design Workshop',
        excerpt: 'Learn how to design scalable systems from a senior engineer. Topics include load balancing, caching, database sharding, and microservices.',
        description: `
            <p>System design is one of the most critical skills for technical interviews and real-world engineering. This workshop will give you practical knowledge on designing systems that scale.</p>
            
            <h2>What You Will Learn</h2>
            <ul>
                <li>Load balancing strategies and algorithms</li>
                <li>Caching patterns and when to use each</li>
                <li>Database sharding and replication</li>
                <li>Microservices architecture vs monolith</li>
                <li>Message queues and event-driven systems</li>
                <li>Real-world case studies from top tech companies</li>
            </ul>
            
            <h2>Who Should Attend</h2>
            <p>This workshop is ideal for final year students, job seekers preparing for technical interviews, and anyone building applications that need to handle growth.</p>
        `,
        date: '2026-04-15',
        time: '15:00',
        endDate: '2026-04-15',
        type: 'workshop',
        location: 'Virtual',
        venue: 'Zoom Meeting',
        speakers: [
            { name: 'Joel Irungu', role: 'Lead Consultant', company: 'avital' },
            { name: 'Abraham Kioko', role: 'ML & Data Lead', company: 'avital' },
        ],
        agenda: [
            { time: '15:00', activity: 'Introduction to System Design', speaker: 'Joel Irungu' },
            { time: '15:30', activity: 'Load Balancing & Caching Deep Dive', speaker: 'Abraham Kioko' },
            { time: '16:15', activity: 'Database Scaling Strategies', speaker: 'Joel Irungu' },
            { time: '17:00', activity: 'Case Study: Designing Twitter', speaker: 'Avital Team' },
            { time: '17:45', activity: 'Q&A Session', speaker: 'Avital Team' },
        ],
        requirements: ['Basic understanding of web development', 'Laptop with internet connection'],
        capacity: 100,
        registeredCount: 67,
    },
    {
        id: 'build-for-impact-hackathon',
        title: 'Hackathon: Build for Impact',
        excerpt: 'Form teams and build solutions for real-world problems. Winners receive mentorship packages and premium access to Avital services.',
        description: `
            <p>A 48-hour virtual hackathon where teams build solutions that address real challenges in education, healthcare, agriculture, and financial inclusion.</p>
            
            <h2>Theme: Technology for Social Good</h2>
            <p>Build something that makes a difference. Whether it is an app for farmers, a platform for students, or a tool for small businesses — your solution should create measurable impact.</p>
        `,
        date: '2026-04-22',
        time: '09:00',
        endDate: '2026-04-24',
        type: 'hackathon',
        location: 'Virtual',
        venue: 'Discord + GitHub',
        speakers: [
            { name: 'Joel Irungu', role: 'Lead Consultant & Judge', company: 'avital' },
            { name: 'Abraham Kioko', role: 'ML & Data Lead & Judge', company: 'avital' },
        ],
        requirements: ['GitHub account', 'Discord account', 'Team of 2-4 members'],
        capacity: 200,
        registeredCount: 89,
        // Hackathon-specific fields
        problemStatements: [
            'Build a solution that improves access to quality education for underserved communities',
            'Create a tool that helps small-scale farmers optimize crop yields and reduce post-harvest losses',
            'Develop a platform that makes healthcare more accessible and affordable',
            'Build a financial inclusion solution for unbanked or underbanked populations'
        ],
        solutionRequirements: [
            'Must be a working prototype or MVP',
            'Open-source code (GitHub repository required)',
            'Clear documentation and setup instructions',
            'Demo video (max 3 minutes) explaining the problem and solution',
            'Presentation slides (max 10 slides)'
        ],
        submissionGuidelines: [
            'Submit via Devpost platform',
            'Include link to GitHub repository',
            'Include link to demo video',
            'Include team member names and roles',
            'Deadline: April 24, 2026, 9:00 AM EAT'
        ],
        judgingCriteria: [
            { criterion: 'Impact potential', weight: 30 },
            { criterion: 'Technical complexity', weight: 25 },
            { criterion: 'Innovation', weight: 20 },
            { criterion: 'Presentation', weight: 15 },
            { criterion: 'Code quality', weight: 10 }
        ],
        prizes: [
            { place: '1st Place', prize: '6 months of premium mentorship at Avital + Project architecture review + Priority consultant matching' },
            { place: '2nd Place', prize: '3 months of mentorship at Avital + Code optimization session + Career coaching package' },
            { place: '3rd Place', prize: '1 month of mentorship at Avital + Resume and portfolio review' },
            { place: 'Best Technical Innovation', prize: '2 months of mentorship + System design workshop access' },
            { place: 'Most Impactful Solution', prize: '2 months of mentorship + Interview preparation package' }
        ],
        teamSize: { min: 2, max: 4 },
        resourcesProvided: [
            'Access to GitHub Copilot during hackathon',
            'Free deployment credits on Vercel/Railway',
            'Mentorship office hours with Avital consultants',
            'API keys for various services upon request'
        ]
    },
    {
        id: 'career-talk-landing-tech-role',
        title: 'Career Talk: Landing Your First Tech Gig',
        excerpt: 'Panel discussion with Avital consultants who have successfully transitioned into tech roles. Learn about applications, interviews, and negotiations.',
        description: `
            <p>Getting your first tech job can feel overwhelming. This panel brings together Avital's lead consultants who successfully navigated the process and now help others do the same.</p>
            
            <h2>Panelists</h2>
            <ul>
                <li><strong>Joel Irungu</strong> - Lead Consultant at Avital (Full-Stack & DevOps Specialist)</li>
                <li><strong>Abraham Kioko</strong> - ML & Data Lead at Avital (MLOps & Cloud Architecture)</li>
                <li><strong>Avital Team</strong> - Additional consultants sharing their experiences</li>
            </ul>
            
            <h2>Topics Covered</h2>
            <ul>
                <li>Where to find internships and entry-level roles</li>
                <li>Building a portfolio that stands out</li>
                <li>Cracking technical interviews</li>
                <li>Salary negotiation for first roles</li>
                <li>Remote work opportunities</li>
                <li>How mentorship at Avital can accelerate your career</li>
                <li>Open Q&A session</li>
            </ul>
            
            <h2>What You Will Gain</h2>
            <ul>
                <li>Actionable advice from people who have been in your position</li>
                <li>Understanding of what hiring managers actually look for</li>
                <li>Strategies to stand out among hundreds of applicants</li>
                <li>Insider knowledge about company cultures and expectations</li>
            </ul>
        `,
        date: '2026-04-28',
        time: '17:00',
        endDate: '2026-04-28',
        type: 'career-talk',
        location: 'Virtual + In-Person',
        venue: 'iHub Nairobi & Zoom',
        speakers: [
            { name: 'Joel Irungu', role: 'Lead Consultant', company: 'avital' },
            { name: 'Abraham Kioko', role: 'ML & Data Lead', company: 'avital' },
        ],
        agenda: [
            { time: '17:00', activity: 'Opening Remarks', speaker: 'Avital Team' },
            { time: '17:15', activity: 'Panel Discussion: Landing Your First Role', speaker: 'Joel & Abraham' },
            { time: '18:15', activity: 'Breakout Sessions by Track', speaker: 'Avital Team' },
            { time: '19:00', activity: 'Networking', speaker: 'All Attendees' },
            { time: '19:45', activity: 'Q&A', speaker: 'Avital Team' },
        ],
        requirements: ['Updated resume (optional for review)', 'Questions prepared for panelists'],
        capacity: 150,
        registeredCount: 112,
    },
]

// Type guard to check if event is a hackathon
export const isHackathon = (event: Event): event is HackathonEvent => {
    return event.type === 'hackathon'
}