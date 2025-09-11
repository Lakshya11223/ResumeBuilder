import {mongoose,Schema} from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref:"User"
  },
  title: {
    type: String,
    required: true,
  },
  
  fullname: { type: String , trim: true},
  designation: { type: String , trim: true},
  summary: { type: String , trim: true},
  phone: { type: String , trim: true},
  email: { type: String , trim: true},
  github: { type: String , trim: true},
  linkedin: { type: String, trim: true },

  workExperience: [
    {
      role: { type: String,  trim: true },
      company: { type: String,  trim: true },
      startDate: { type: Date }, // Better than just duration string
      endDate: { type: Date },
      description: { type: String, trim: true },
    },
  ],
  Projects: [
    {
      title: { type: String,  trim: true }, 
      description: { type: String, trim: true },
      liveLink: { type: String, trim: true },
      githubLink: { type: String, trim: true } 
    },
  ],
    skills: [{
    languages: { type: String, trim: true } // Changed to object with languages field
  }],
  education: [
    {
      degree: { type: String, trim: true },
      fieldOfStudy: { type: String, trim: true }, 
      institute: { type: String,  trim: true }, 
      startYear: { type: Number },
      endYear: { type: Number },
      cgpa: { type: String, trim: true }, 
    },
  ],
  
  ProfileLinks: [
    {
      name:{type:String},
      links: { type: String },
    },
  ],
},{
  timestamps:true
});

const Resume = mongoose.model("Resume",resumeSchema);
export default Resume;
