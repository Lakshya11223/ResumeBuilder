import Resume from "../models/Resume.models.js";


const convertResumeToText = (resume) => {
  let text = `${resume.fullname || ""} ${resume.designation || ""} ${resume.summary || ""} ${resume.phone || ""} ${resume.email || ""} ${resume.github || ""} ${resume.linkedin || ""} `;
  if (resume.workExperience) {
    resume.workExperience.forEach(exp => {
      text += `${exp.company || ""} ${exp.role || ""} ${exp.description || ""} `;
    });
  }
  if (resume.Projects) {
    resume.Projects.forEach(proj => {
      text += `${proj.title || ""} ${proj.description || ""} `;
    });
  }
  if (resume.skills) {
    resume.skills.forEach(skill => {
      text += `${skill.languages || ""} `;
    });
  }
  if (resume.education) {
    resume.education.forEach(edu => {
      text += `${edu.degree || ""} ${edu.fieldOfStudy || ""} ${edu.institute || ""} `;
    });
  }
  return text;
};

// Helper: Calculate numeric scores and local feedback
const calculateLocalScore = (text, designation) => {
  let score = 0;
  const breakdown = [];
  const localTips = [];

  // 1. Impact & Results (30 pts)
  const metricsCount = (text.match(/\b(\d+|%|USD|\$|million|billion)\b/g) || []).length;
  let impactScore = 0;
  if (metricsCount >= 3) impactScore = 30;
  else if (metricsCount > 0) impactScore = 15;
  if (metricsCount === 0) {
    localTips.push("No numbers or percentages found. Add quantifiable results to show impact.");
  }
  breakdown.push({ section: "Impact & Metrics", score: impactScore, max: 30 });

  // 2. Action Verbs (20 pts)
  const verbs = ["led", "developed", "designed", "implemented", "created", "optimized", "spearheaded", "managed", "executed", "built", "engineered", "collaborated"];
  const words = text.toLowerCase().split(/\s+/);
  const verbCount = words.filter(word => verbs.includes(word)).length;
  let verbScore = 0;
  if (verbCount >= 5) verbScore = 20;
  else if (verbCount > 0) verbScore = 10;
  if (verbCount === 0) {
    localTips.push("Use strong action verbs like 'Led', 'Optimized', or 'Designed' to start bullet points.");
  }
  breakdown.push({ section: "Action Verbs", score: verbScore, max: 20 });

  // 3. Contact & Profiles (25 pts)
  let contactScore = 0;
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /\b\d{10}\b/.test(text) || /\+?\d{1,4}[-.\s]??\d{9,10}/.test(text);
  const hasLinkedin = /linkedin\.com/i.test(text);
  const hasGithub = /github\.com/i.test(text);

  if (hasEmail) contactScore += 10;
  if (hasPhone) contactScore += 5;
  if (hasLinkedin) contactScore += 5;
  if (hasGithub) contactScore += 5;

  if (!hasLinkedin) localTips.push("Add your LinkedIn profile link.");
  if (!hasGithub) localTips.push("Add your GitHub link.");
  breakdown.push({ section: "Contact & Profiles", score: contactScore, max: 25 });

  // 4. Role Alignment (25 pts)
  let skillScore = 10;
  const skillsKeywords = {
    frontend: ["react", "javascript", "html", "css", "typescript", "vue", "angular", "tailwind", "nextjs"],
    backend: ["node", "express", "python", "django", "mongodb", "postgresql", "sql", "java", "docker", "aws"],
    fullstack: ["react", "node", "express", "javascript", "mongodb", "typescript", "sql", "html", "css"],
    datascience: ["python", "pandas", "numpy", "scikit-learn", "sql", "r", "tensorflow", "keras"]
  };

  const desLower = designation.toLowerCase().replace(/\s+/g, "");
  let category = "fullstack";
  if (desLower.includes("frontend")) category = "frontend";
  else if (desLower.includes("backend")) category = "backend";
  else if (desLower.includes("data")) category = "datascience";

  const expectedSkills = skillsKeywords[category];
  const textLower = text.toLowerCase();
  const matchedSkills = expectedSkills.filter(skill => textLower.includes(skill));
  const matchRatio = matchedSkills.length / expectedSkills.length;
  skillScore += Math.round(matchRatio * 15);

  if (matchedSkills.length < 3) {
    localTips.push(`Add skills matching your role, like: ${expectedSkills.slice(0, 3).join(", ")}`);
  }
  breakdown.push({ section: "Role Alignment", score: skillScore, max: 25 });

  score = impactScore + verbScore + contactScore + skillScore;

  return { score, breakdown, localTips };
};

// Helper: Query Groq LLM API
const generateLLMReport = async (text, designation) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      summaryAnalysis: "AI review skipped due to missing API key configuration.",
      criticalFixes: ["Add GROQ_API_KEY in the backend .env to generate AI suggestions."],
      enhancements: ["Ensure to test Groq connection locally."]
    };
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are an expert ATS resume evaluator. Analyze the user's resume against their target designation. Return a JSON object with exactly three fields: 'summaryAnalysis' (string, maximum 3 sentences), 'criticalFixes' (array of strings, listing 2-3 most important actions they should take), and 'enhancements' (array of strings, listing 2-3 optional improvements). Respond ONLY with valid JSON."
          },
          {
            role: "user",
            content: `Target Designation: ${designation}\n\nResume Text:\n${text}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API responded with status ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Groq API error:", error);
    return {
      summaryAnalysis: "Error connecting to AI review engine.",
      criticalFixes: ["Unable to fetch automated suggestions at this time."],
      enhancements: ["Review contact details and action verbs manually."]
    };
  }
};

// Handler 1: Score database resume by ID
export const scoreResumeById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  try {
    const resume = await Resume.findOne({ _id: id, userId });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    const text = convertResumeToText(resume);
    const designation = resume.designation || "Software Engineer";

    const localResult = calculateLocalScore(text, designation);
    const llmReport = await generateLLMReport(text, designation);

    return res.status(200).json({
      success: true,
      data: {
        score: localResult.score,
        breakdown: localResult.breakdown,
        report: llmReport
      }
    });
  } catch (error) {
    console.error("Error scoring resume by ID:", error);
    return res.status(500).json({ success: false, message: "Server error during scoring" });
  }
};

// Handler 2: Score raw text (directly from frontend PDF parsing)
export const scoreResumeText = async (req, res) => {
  const { text, designation } = req.body;

  if (!text || !designation) {
    return res.status(400).json({ success: false, message: "Text and designation are required" });
  }

  try {
    const localResult = calculateLocalScore(text, designation);
    const llmReport = await generateLLMReport(text, designation);

    return res.status(200).json({
      success: true,
      data: {
        score: localResult.score,
        breakdown: localResult.breakdown,
        report: llmReport
      }
    });
  } catch (error) {
    console.error("Error scoring resume text:", error);
    return res.status(500).json({ success: false, message: "Server error during text scoring" });
  }
};