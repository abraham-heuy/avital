export interface FAQCategory {
    id: string
    name: string
    icon: string
    questions: FAQItem[]
  }
  
  export interface FAQItem {
    id: string
    question: string
    answer: string
  }
  
  export const faqCategories: FAQCategory[] = [
    {
      id: 'general',
      name: 'General',
      icon: 'M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
      questions: [
        {
          id: 'what-is-avital',
          question: 'What is Avital?',
          answer: 'Avital is a student tech consultation platform that connects students with experienced consultants for help with complex projects, career guidance, and technical mentorship.'
        },
        {
          id: 'who-can-use',
          question: 'Who can use Avital?',
          answer: 'Any student currently enrolled in a university, college, or bootcamp can use Avital. We also welcome recent graduates and career transition students.'
        },
        {
          id: 'how-it-works',
          question: 'How does Avital work?',
          answer: 'Simply fill out our contact form with your project details. We match you with a consultant based on your needs, tech stack, and timeline. You then schedule sessions through your dashboard.'
        }
      ]
    },
    {
      id: 'pricing',
      name: 'Pricing & Packages',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      questions: [
        {
          id: 'pricing-structure',
          question: 'What is the pricing structure?',
          answer: 'We offer flexible packages: Starter ($19 one-time), Builder ($49 one-time), and Capstone ($99 full project). Group discounts are available for 3-8 students.'
        },
        {
          id: 'group-discounts',
          question: 'Do you offer group discounts?',
          answer: 'Yes! Group pricing is available for teams of 3-8 students. Each student saves 30-40% compared to solo pricing.'
        },
        {
          id: 'refund-policy',
          question: 'What is your refund policy?',
          answer: 'If you are not satisfied after your first session, we offer a full refund — no questions asked.'
        }
      ]
    },
    {
      id: 'consultants',
      name: 'Consultants',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      questions: [
        {
          id: 'who-are-consultants',
          question: 'Who are the consultants?',
          answer: 'Our consultants are current students, recent graduates, and industry professionals who have successfully completed complex projects and technical interviews.'
        },
        {
          id: 'how-matched',
          question: 'How are consultants matched?',
          answer: 'We match based on your tech stack, project complexity, domain expertise, and consultant availability. A human reviews every match before it is sent to you.'
        },
        {
          id: 'can-switch',
          question: 'Can I switch consultants?',
          answer: 'Yes. If the match does not feel right, you can request a change at any time with no extra cost for the first change request.'
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
      questions: [
        {
          id: 'tech-stack',
          question: 'What tech stacks do you support?',
          answer: 'We support a wide range including React, Python, Node.js, Java, Go, Rust, TensorFlow, PyTorch, Solidity, AWS, Azure, and many more.'
        },
        {
          id: 'project-types',
          question: 'What types of projects can you help with?',
          answer: 'Final year projects, capstones, semester projects, hackathon submissions, portfolio builds, and even production applications.'
        },
        {
          id: 'code-review',
          question: 'Do you offer code reviews?',
          answer: 'Yes. Our consultants provide detailed code reviews with inline feedback, performance recommendations, and best practice guidance.'
        }
      ]
    },
    {
      id: 'support',
      name: 'Support',
      icon: 'M18.364 5.636L16.95 7.05A7 7 0 1015.05 16.95l1.414 1.414a9 9 0 11-12.728-12.728l1.414 1.414a7 7 0 1012.728 12.728z',
      questions: [
        {
          id: 'support-hours',
          question: 'What are support hours?',
          answer: 'Our support team is available 24/7 via email and chat. Session scheduling is flexible based on consultant availability.'
        },
        {
          id: 'response-time',
          question: 'How fast is response time?',
          answer: 'Initial responses typically within 1 hour. Most matches are completed within 24 hours of submitting your brief.'
        },
        {
          id: 'emergency-help',
          question: 'Can I get emergency help?',
          answer: 'Yes. For urgent issues, select "Critical" urgency when submitting your brief and we will prioritize your match.'
        }
      ]
    }
  ]