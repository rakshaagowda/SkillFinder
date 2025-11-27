import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SAMPLE_PLATFORMS = [
  // --- 1. Programming Fundamentals ---
  { name: "LeetCode", type: "online", categories: ["academic"], languages: ["English"], rating: 4.8, topCourse: "Top Interview Questions", url: "https://leetcode.com" },
  { name: "CodeChef", type: "online", categories: ["academic"], languages: ["English"], rating: 4.5, topCourse: "Competitive Programming", url: "https://www.codechef.com" },
  { name: "HackerRank", type: "online", categories: ["academic"], languages: ["English"], rating: 4.4, topCourse: "Problem Solving (Basic)", url: "https://www.hackerrank.com" },
  { name: "Striver A2Z DSA (YouTube)", type: "online", categories: ["academic"], languages: ["English", "Hindi"], rating: 4.9, topCourse: "A2Z DSA Course", url: "https://takeuforward.org" },
  { name: "GeeksforGeeks", type: "online", categories: ["academic"], languages: ["English"], rating: 4.6, topCourse: "DSA Self Paced", url: "https://www.geeksforgeeks.org" },
  { name: "NeetCode", type: "online", categories: ["academic"], languages: ["English"], rating: 4.8, topCourse: "Blind 75", url: "https://neetcode.io" },

  // --- 2. Software Development ---
  { name: "GitHub", type: "online", categories: ["academic", "soft"], languages: ["English"], rating: 4.9, topCourse: "Git & GitHub for Beginners", url: "https://github.com" },
  { name: "Kunal Kushwaha (YouTube)", type: "online", categories: ["academic"], languages: ["English", "Hindi"], rating: 4.9, topCourse: "DevOps Bootcamp", url: "https://www.youtube.com/@KunalKushwaha" },
  { name: "Neso Academy", type: "online", categories: ["academic"], languages: ["English"], rating: 4.7, topCourse: "Operating Systems", url: "https://www.nesoacademy.org" },
  { name: "Coursera (Networks)", type: "online", categories: ["academic"], languages: ["English"], rating: 4.6, topCourse: "Computer Communications", url: "https://www.coursera.org" },
  { name: "W3Schools", type: "online", categories: ["academic"], languages: ["English"], rating: 4.5, topCourse: "SQL Tutorial", url: "https://www.w3schools.com" },

  // --- 3. Web Development ---
  { name: "freeCodeCamp", type: "online", categories: ["academic"], languages: ["English"], rating: 4.9, topCourse: "Responsive Web Design", url: "https://www.freecodecamp.org" },
  { name: "Frontend Mentor", type: "online", categories: ["academic", "artistic"], languages: ["English"], rating: 4.7, topCourse: "Frontend Challenges", url: "https://www.frontendmentor.io" },
  { name: "CodeWithHarry (YouTube)", type: "online", categories: ["academic"], languages: ["Hindi", "English"], rating: 4.8, topCourse: "Web Development in 100 Days", url: "https://www.youtube.com/@CodeWithHarry" },
  { name: "Udemy (Angela Yu)", type: "online", categories: ["academic"], languages: ["English"], rating: 4.8, topCourse: "The Complete Web Development Bootcamp", url: "https://www.udemy.com" },
  { name: "roadmap.sh", type: "online", categories: ["academic"], languages: ["English"], rating: 4.9, topCourse: "Full Stack Roadmap", url: "https://roadmap.sh" },

  // --- 4. App Development ---
  { name: "Philipp Lackner (YouTube)", type: "online", categories: ["academic"], languages: ["English"], rating: 4.8, topCourse: "Android Development with Kotlin", url: "https://www.youtube.com/@PhilippLackner" },
  { name: "Udacity", type: "online", categories: ["academic"], languages: ["English"], rating: 4.5, topCourse: "Android Basics", url: "https://www.udacity.com" },
  { name: "Apple Developer Docs", type: "online", categories: ["academic"], languages: ["English"], rating: 4.7, topCourse: "SwiftUI Tutorials", url: "https://developer.apple.com" },

  // --- 5. AI / Machine Learning ---
  { name: "Kaggle", type: "online", categories: ["academic"], languages: ["English"], rating: 4.9, topCourse: "Intro to Machine Learning", url: "https://www.kaggle.com" },
  { name: "Coursera (Andrew Ng)", type: "online", categories: ["academic"], languages: ["English"], rating: 4.9, topCourse: "Machine Learning Specialization", url: "https://www.coursera.org" },
  { name: "Fast.ai", type: "online", categories: ["academic"], languages: ["English"], rating: 4.8, topCourse: "Practical Deep Learning", url: "https://www.fast.ai" },

  // --- 6. Cloud & DevOps ---
  { name: "AWS Skill Builder", type: "online", categories: ["academic"], languages: ["English"], rating: 4.7, topCourse: "Cloud Practitioner Essentials", url: "https://explore.skillbuilder.aws" },
  { name: "Microsoft Learn", type: "online", categories: ["academic"], languages: ["English"], rating: 4.6, topCourse: "Azure Fundamentals", url: "https://learn.microsoft.com" },
  { name: "Linux Journey", type: "online", categories: ["academic"], languages: ["English"], rating: 4.8, topCourse: "Linux Basics", url: "https://linuxjourney.com" },

  // --- 7. Cybersecurity ---
  { name: "TryHackMe", type: "online", categories: ["academic"], languages: ["English"], rating: 4.8, topCourse: "Complete Beginner Path", url: "https://tryhackme.com" },
  { name: "HackTheBox", type: "online", categories: ["academic"], languages: ["English"], rating: 4.9, topCourse: "Starting Point", url: "https://www.hackthebox.com" },

  // --- 8. Core Engineering Tools (Offline & Online) ---
  { name: "MATLAB Academy", type: "online", categories: ["academic"], languages: ["English"], rating: 4.6, topCourse: "MATLAB Onramp", url: "https://matlabacademy.mathworks.com" },
  { name: "AutoCAD Training Centre (Delhi)", type: "offline", categories: ["academic"], languages: ["English", "Hindi"], rating: 4.4, location: { city: "Delhi", lat: 28.61, lng: 77.20 } },
  { name: "CADD Centre (Bengaluru)", type: "offline", categories: ["academic"], languages: ["English", "Kannada"], rating: 4.3, location: { city: "Bengaluru", lat: 12.97, lng: 77.59 } },
  { name: "SolidWorks Authorized Training (Pune)", type: "offline", categories: ["academic"], languages: ["English", "Marathi"], rating: 4.5, location: { city: "Pune", lat: 18.52, lng: 73.85 } },

  // --- 9. Soft Skills (Expanded) ---
  { name: "LinkedIn Learning", type: "online", categories: ["soft"], languages: ["English"], rating: 4.6, topCourse: "Communication Foundations", url: "https://www.linkedin.com/learning" },
  { name: "Toastmasters International (Mumbai)", type: "offline", categories: ["soft"], languages: ["English"], rating: 4.9, location: { city: "Mumbai", lat: 19.07, lng: 72.87 } },
  { name: "Dale Carnegie Training (Delhi)", type: "offline", categories: ["soft"], languages: ["English", "Hindi"], rating: 4.7, location: { city: "Delhi", lat: 28.61, lng: 77.20 } },
  { name: "British Council (Kolkata)", type: "offline", categories: ["soft", "academic"], languages: ["English"], rating: 4.5, location: { city: "Kolkata", lat: 22.57, lng: 88.36 } },
  { name: "Public Speaking Workshop (Bangalore)", type: "offline", categories: ["soft"], languages: ["English", "Kannada"], rating: 4.4, location: { city: "Bengaluru", lat: 12.97, lng: 77.59 } },

  // --- 10. Sports (Expanded) ---
  { name: "Prakash Padukone Badminton Academy", type: "offline", categories: ["sports"], languages: ["English", "Kannada"], rating: 4.9, location: { city: "Bengaluru", lat: 12.97, lng: 77.59 } },
  { name: "Mumbai Cricket Association", type: "offline", categories: ["sports"], languages: ["English", "Marathi", "Hindi"], rating: 4.8, location: { city: "Mumbai", lat: 19.07, lng: 72.87 } },
  { name: "Bhaichung Bhutia Football Schools", type: "offline", categories: ["sports"], languages: ["English", "Hindi"], rating: 4.6, location: { city: "Delhi", lat: 28.61, lng: 77.20 } },
  { name: "Ivan Lendl Tennis Center", type: "offline", categories: ["sports"], languages: ["English"], rating: 4.5, location: { city: "Pune", lat: 18.52, lng: 73.85 } },
  { name: "Gold's Gym (Hyderabad)", type: "offline", categories: ["sports"], languages: ["English", "Telugu"], rating: 4.4, location: { city: "Hyderabad", lat: 17.38, lng: 78.48 } },
  { name: "Isha Yoga Center", type: "offline", categories: ["sports", "soft"], languages: ["English", "Tamil"], rating: 4.9, location: { city: "Coimbatore", lat: 11.01, lng: 76.95 } },
  { name: "Mary Kom Boxing Academy", type: "offline", categories: ["sports"], languages: ["English", "Manipuri"], rating: 4.8, location: { city: "Imphal", lat: 24.81, lng: 93.93 } },

  // --- 11. Artistic (Expanded) ---
  { name: "Shankar Mahadevan Academy", type: "online", categories: ["artistic"], languages: ["English", "Hindi"], rating: 4.7, topCourse: "Hindustani Vocals", url: "https://www.shankarmahadevanacademy.com" },
  { name: "Kalakshetra Foundation", type: "offline", categories: ["artistic"], languages: ["Tamil", "English"], rating: 4.9, location: { city: "Chennai", lat: 13.08, lng: 80.27 } },
  { name: "Shiamak Davar Dance Academy", type: "offline", categories: ["artistic"], languages: ["English", "Hindi"], rating: 4.6, location: { city: "Mumbai", lat: 19.07, lng: 72.87 } },
  { name: "National School of Drama", type: "offline", categories: ["artistic", "soft"], languages: ["Hindi", "English"], rating: 4.8, location: { city: "Delhi", lat: 28.61, lng: 77.20 } },
  { name: "Karnataka Chitrakala Parishath", type: "offline", categories: ["artistic"], languages: ["Kannada", "English"], rating: 4.5, location: { city: "Bengaluru", lat: 12.97, lng: 77.59 } },
  { name: "Furtados School of Music", type: "offline", categories: ["artistic"], languages: ["English"], rating: 4.4, location: { city: "Pune", lat: 18.52, lng: 73.85 } },

  // --- 12. Co-curricular (Expanded) ---
  { name: "Chess.com", type: "online", categories: ["co-curricular"], languages: ["English"], rating: 4.9, topCourse: "Chess Basics", url: "https://www.chess.com" },
  { name: "RoboVITics (Vellore)", type: "offline", categories: ["co-curricular", "academic"], languages: ["English"], rating: 4.6, location: { city: "Vellore", lat: 12.91, lng: 79.13 } },
  { name: "Indian Debating League", type: "online", categories: ["co-curricular", "soft"], languages: ["English"], rating: 4.5, topCourse: "Debate 101", url: "https://indiandebatingleague.com" },
  { name: "Model UN Training (Mumbai)", type: "offline", categories: ["co-curricular", "soft"], languages: ["English"], rating: 4.4, location: { city: "Mumbai", lat: 19.07, lng: 72.87 } },
  { name: "Space Kidz India", type: "offline", categories: ["co-curricular", "academic"], languages: ["English"], rating: 4.7, location: { city: "Chennai", lat: 13.08, lng: 80.27 } },
];

async function main() {
  console.log('Start seeding ...');

  // Clear existing data
  await prisma.enrollment.deleteMany({});
  await prisma.platform.deleteMany({});
  console.log('Cleared existing platforms and enrollments.');

  for (const p of SAMPLE_PLATFORMS) {
    const platform = await prisma.platform.create({
      data: {
        name: p.name,
        type: p.type,
        categories: JSON.stringify(p.categories),
        languages: JSON.stringify(p.languages),
        rating: p.rating,
        topCourse: p.topCourse,
        url: p.url,
        location: p.location ? JSON.stringify(p.location) : null,
      },
    });
  }
  console.log(`Seeding finished. Added ${SAMPLE_PLATFORMS.length} platforms.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
