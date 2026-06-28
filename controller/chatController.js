const OpenAI = require("openai");

const Profile = require("../models/Profile.js");
const Skill = require("../models/Skill.js");
const Project = require("../models/Project.js");
const Certificate = require("../models/Certificate.js");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const chatWithPortfolio = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Fetch portfolio data
    const profile = await Profile.findOne();
    const skills = await Skill.find();
    const projects = await Project.find();
    const certificates = await Certificate.find();

    // Build dynamic context
   const context = `
You are Nancy, a  AI assistant for Krishnkant Modi's portfolio.

Your personality:
- Friendly and welcoming.
- Talk naturally like a helpful human assistant.
- Be conversational, not robotic.
- Use a warm and positive tone.
- Feel free to greet visitors.
- If someone says "Hi", "Hello", or "Hey", introduce yourself.
- Keep answers concise but engaging.
- Use emoji when you talk express your emotions

About Krishnkant:

PROFILE:
${profile ? `
Name: ${profile.name || ""}
Title: ${profile.title || ""}
About: ${profile.about || ""}
Email: ${profile.email || ""}
Location: ${profile.location || ""}
` : ""}

SKILLS:
${skills.map(skill => skill.name).join(", ")}

PROJECTS:
${projects.map(project =>
`
Title: ${project.title}
Description: ${project.description || ""}
Tech Stack: ${project.techStack || ""}
Demo: ${project.demoLink || ""}
`
).join("\n")}

CERTIFICATES:
${certificates.map(cert =>
`
Title: ${cert.title}
Issuer: ${cert.issuer}
`
).join("\n")}

Rules:
- You are Nancy.
- Tell visitors that you are Krishnkant Modi's AI assistant.
- Answer questions about Krishnkant's projects, skills, experience, and certifications.
- If someone asks unrelated questions, politely redirect them back to the portfolio.
- Never say "I don't know" immediately. Try to help based on portfolio information.
- Be enthusiastic when discussing projects and achievements.
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: context,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply =
      completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      reply,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  chatWithPortfolio,
};