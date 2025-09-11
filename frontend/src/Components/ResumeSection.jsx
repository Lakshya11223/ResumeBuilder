import React, { useState } from 'react'
import {User} from 'lucide-react'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { useResumeStore } from '../Store/resume.Store';
function ResumeSection() {
    const [resumedata,setresumedata] = useState({
        fullname:"",
        designation: '',
        summary: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        workExperience:[],
        Projects:[],
        skills:[],
        education:[],
        ProfileLinks:[],
    })


   

// Review this code Accroding what you want -------------------------------------------------------------------------------------------------------------------------------
// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 8,
    padding: 0,
  },
  header: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
  },
  designation: {
    textAlign: 'center', 
    marginBottom: 12,
    fontSize: 11,
    color: '#333333',
  },
  subheader: {
    fontSize: 12,
    fontWeight: 'semibold',
    borderBottom: '1 solid rgba(0, 0, 0, 0.3)',
    borderColor:'#808080',
    paddingBottom: 2,
    marginBottom: 6,
    color: '#000000',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    flexWrap: 'wrap',
  },
  contactItem: {
    width: '48%',
    marginBottom: 2,
    fontSize: 10,
  },
  experienceItem: {
    marginBottom: 4,
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 1,
    color:'#303030',
  },
  role: {
    fontSize: 10,
    fontWeight: 'semibold',
    color: '#686868',
    marginBottom: 1,
  },
  date: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    lineHeight: 1.3,
  },
  skillItem: {
    marginBottom: 2,
    fontSize: 11,
  },
  projectLinks: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 1,
  },
  rowBetween:{
   flexDirection:'row',
   justifyContent:'space-between',
   marginBottom:2,
  }
  
});
// things placing in resume
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.section}>
        <Text style={styles.header}>{data.fullname || 'Your Name'}</Text>
        <Text style={styles.designation}>{data.designation || 'Your Designation'}</Text>
      </View>

      {/* Contact Information */}
      {(data.email || data.phone || data.linkedin || data.github) && (
        <View style={styles.section}>
          <View style={styles.contactInfo}>
            {data.email && <Text style={styles.contactItem}>Email: {data.email}</Text>}
            {data.phone && <Text style={styles.contactItem}>Phone: {data.phone}</Text>}
            {data.linkedin && <Text style={styles.contactItem}>LinkedIn: {data.linkedin}</Text>}
            {data.github && <Text style={styles.contactItem}>GitHub: {data.github}</Text>}
          </View>
        </View>
      )}

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.subheader}>SUMMARY</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>
      )}

      {/* Work Experience */}
      {data.workExperience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheader}>WORK EXPERIENCE</Text>
          {data.workExperience.map((exp, idx) => (
            <View key={idx} style={styles.experienceItem}>
               <View style={styles.rowBetween}>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
               </View>
              <Text style={styles.role}>{exp.role}</Text>
             <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.Projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheader}>PROJECTS</Text>
          {data.Projects.map((project, idx) => (
            <View key={idx} style={styles.experienceItem}>
              <Text style={styles.company}>{project.title}</Text>
              <Text style={styles.description}>{project.description}</Text>
              {(project.liveLink || project.githubLink) && (
                <View style={styles.rowBetween}>
                  {project.liveLink && <Text style={styles.projectLinks}>Live: {project.liveLink}</Text>}
                  {project.githubLink && <Text style={styles.projectLinks}>GitHub: {project.githubLink}</Text>}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheader}>TECHNICAL SKILLS</Text>
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={styles.skillItem}>{skill.languages}</Text>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheader}>EDUCATION</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={styles.experienceItem}>
              <View style={styles.rowBetween}>
                <Text style={styles.company}>{edu.institute}</Text>
                <Text style={styles.date}>{edu.startYear} - {edu.endYear}</Text>
              </View>
              <View style={styles.rowBetween}>
                  <Text style={styles.role}>Degree: {edu.degree}</Text>
                  <Text style={styles.role}>{edu.fieldOfStudy}</Text>
                  {edu.cgpa && <Text style={styles.description}>CGPA: {edu.cgpa}</Text>}
              </View>
              
            </View>
          ))}
        </View>
      )}

      {/* Coding Profiles */}
      {data.ProfileLinks?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheader}>CODING PROFILES</Text>
          {data.ProfileLinks.map((profile, idx) => (
            <Text key={idx} style={styles.skillItem}>
              {profile.name}: {profile.links}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

  const {title,create,single,update} = useResumeStore();
 
  const handleDownload = async () => {
    const blob = await pdf(<MyDocument data={resumedata} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    link.click();
    URL.revokeObjectURL(url);

    await create(title,resumedata);
    
  };
  const  handleUpdate = async()=>{
  if (!single?._id) {
    console.error("No resume id found!");
    return;
  }
  const updatedData = { ...single, ...resumedata };
  await update(single._id, updatedData);

  }

// --------------------------------------------------------------------
    const updateField=(field,data)=>{
       setresumedata(prev =>({
            ...prev,
            [field]:data
       }))
    };
    const addArrayItem=(field,item)=>{
        setresumedata(prev => ({
            ...prev,
            [field]:[...prev[field],item]
        }))
    };
    const updateArrayItem=(field,i,item)=>{
        setresumedata(prev => ({
            ...prev,
            [field]:prev[field].map((existing,index)=> index===i?item:existing)
        }))
    };
    const deleteArrayItems=(field,i)=>{
        setresumedata(prev=>({
            ...prev,
            [field]:prev[field].filter((existing,index)=> index!==i)
        }))
    }


    
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 pt-20 sm:pt-25  bg-gradient-to-br from-blue-50 via-white to-indigo-50 '>
        {/* Resume */}
  <div className='w-full max-w-4xl mx-auto h-screen overflow-y-scroll'>
 
    <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
    <div className='space-y-12'>
        {/* PersonalInfo */}
        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-6 rounded-xl border-l-4 border-blue-500  '>
            <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-6 flex items-center'>
                <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Full Name</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='Lakshyadeep Sharma' 
                    value={resumedata.fullname || ""}
                    onChange={(e)=>{updateField("fullname",e.target.value)}}
                />
            </div>
            <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Designation</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='Full Stack Developer'
                     value={resumedata.designation || ""}
                    onChange={(e)=>{updateField("designation",e.target.value)}}
                />
            </div>
            </div>
            <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Summary</h2>
                <textarea 
                    className='p-2.5 sm:p-4 w-full h-32 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none resize-none'
                    placeholder='I am passionate developer with knowledge of AI, performing well in coding and creating innovative solutions...'
                    value={resumedata.summary || ""}
                    onChange={(e)=>{updateField("summary",e.target.value)}}
               />
            </div>
        </div>

        {/* Contact Info */}
        <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-6  rounded-xl border-l-4 border-green-500'>
            <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-6 flex items-center'>
                <svg className="w-8 h-8 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Information
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Email</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='lakshya123@gmail.com'
                    value={resumedata.email || ""}
                    onChange={(e)=>{updateField("email",e.target.value)}}
                />
            </div>
            <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Phone</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='7777799999'
                    value={resumedata.phone || ""}
                    onChange={(e)=>{updateField("phone",e.target.value)}}
                />
            </div> 
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>LinkedIn</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='https://linkedin.com/in/your-profile'
                    value={resumedata.linkedin || ""}
                    onChange={(e)=>{updateField("linkedin",e.target.value)}}
                />
            </div>
            <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>GitHub</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='https://github.com/your-profile'
                    value={resumedata.github || ""}
                    onChange={(e)=>{updateField("github",e.target.value)}}
                />
            </div>
            </div>
        </div>

        {/* Work-Experience */}
       
        <div className='bg-gradient-to-r from-purple-50 to-violet-50 p-3 sm:p-6 rounded-xl border-l-4 border-purple-500'>
            <div className='flex justify-between'>
            <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-6 flex items-center'>
                <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                </svg>
                Work Experience
            </h1>
           <div>
            <button 
           className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-purple-400 text-lg bg-purple-200 shadow-lg'
           onClick={()=>{addArrayItem("workExperience",{company:"",role:"",startDate:"",endDate:"",description:""})}}
           >Add</button> 
           </div>
        </div> 
      {resumedata.workExperience.map((exp,idx)=>(

        <div key={idx} className='bg-gray-50 p-6 rounded-xl mb-6  '> {/* ONE PARENT WRAPPER */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div>
            <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Company</h2>
            <input
            value={exp.company || ''}
            onChange={(e) => updateArrayItem('workExperience', idx, {...exp, company: e.target.value})}
            className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
            placeholder='Amazon'
            />
        </div>
        <div>
            <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Role</h2>
            <input
            value={exp.role || ''}
            onChange={(e) => updateArrayItem('workExperience', idx, {...exp, role: e.target.value})}
            className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
            placeholder='Software Developer'
            />
        </div> 
        </div>
    
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div>
            <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Start Date</h2>
            <input
            value={exp.startDate || ''}
            onChange={(e) => updateArrayItem('workExperience', idx, {...exp, startDate: e.target.value})}
            className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
            placeholder='MM/YYYY'
            />
        </div>
        <div>
            <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>End Date</h2>
            <input
            value={exp.endDate || ''}
            onChange={(e) => updateArrayItem('workExperience', idx, {...exp, endDate: e.target.value})}
            className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
            placeholder='MM/YYYY or Present'
            />
        </div>
        </div>
    
        <div>
        <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Description</h2>
        <textarea
            value={exp.description || ''}
            onChange={(e) => updateArrayItem('workExperience', idx, {...exp, description: e.target.value})}
            className='p-2.5 sm:p-4 w-full h-32 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none resize-none'
            placeholder='Being a Software Developer at Amazon, I worked on...'
        />
        </div>
         <div>
            <button 
           className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-purple-400 text-lg bg-purple-200 shadow-lg'
           onClick={()=>{deleteArrayItems("workExperience",idx)}}
           >Delete</button> 
        </div>
        
    </div> 
    ))}
          
        </div>
        
            {/* Projects */}
        <div className='bg-gradient-to-r from-orange-50 to-amber-50 p-3 sm:p-6 rounded-xl border-l-4 border-orange-500'>
        <div className='flex justify-between'>
            <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center'>
            <svg className="w-8 h-8 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Projects
            </h1>
            <div>
            <button 
                className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-orange-400 text-lg bg-orange-100 shadow-lg'
                onClick={() => addArrayItem("Projects",{ title:"", liveLink:"", githubLink:"", description:"" })}
            >
                Add
            </button>
            </div>
        </div>

        {resumedata.Projects.map((exp,idx)=>(
            <div key={idx} className='bg-gray-50 p-6 rounded-xl mb-6'>
            {/* Title */}
            <div className='mb-6'>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Project Title</h2>
                <input
                className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                placeholder='ResumeAnalyst'
                value={exp.title || ""}
                onChange={(e)=>updateArrayItem("Projects",idx,{...exp,title:e.target.value})}
                />
            </div>

            {/* Links */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Live Link</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='https://your-project-link.com'
                    value={exp.liveLink || ""}
                    onChange={(e)=>updateArrayItem("Projects",idx,{...exp,liveLink:e.target.value})}
                />
                </div>
                <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>GitHub Repo</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='https://github.com/your-repo'
                    value={exp.githubLink || ""}
                    onChange={(e)=>updateArrayItem("Projects",idx,{...exp,githubLink:e.target.value})}
                />
                </div>
            </div>

            {/* Description */}
            <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Description</h2>
                <textarea
                className='p-2.5 sm:p-4 w-full h-32 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none resize-none'
                placeholder='Solving the problem of resume making manually. A comprehensive solution that helps users create professional resumes...'
                value={exp.description || ""}
                onChange={(e)=>updateArrayItem("Projects",idx,{...exp,description:e.target.value})}
                />
            </div>

            {/* Delete Button */}
            <div>
                <button 
                className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-orange-400 text-lg bg-orange-100 shadow-lg'
                onClick={()=>deleteArrayItems("Projects",idx)}
                >
                Delete
                </button>
            </div>
            </div>
        ))}
        </div>


        {/* Skills */}
        <div className='bg-gradient-to-r from-pink-50 to-rose-50 p-3 sm:p-6 rounded-xl border-l-4 border-pink-500'>
       <div className='flex justify-between'>
         <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center'>
            <svg className="w-8 h-8 mr-3 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Skills
        </h1>
           <div>
            <button 
            onClick={()=>addArrayItem("skills",{languages:""})}
           className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-pink-400 text-lg bg-pink-100 shadow-lg'>Add</button> </div>
       </div>
        {resumedata.skills.map((exp,idx)=>(
        <div key={idx}>
            <input
                className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                placeholder='JavaScript, React, Node.js, Python, MongoDB, AWS...'
                value={exp.languages || ""}
                onChange={(e)=>{updateArrayItem("skills",idx,{...exp,"languages":e.target.value})}}
            />
             <div>
                <button 
                className=' font-semibold p-2 rounded-xl cursor-pointer hover:bg-pink-400 text-lg bg-pink-100 shadow-lg'
                onClick={()=>{deleteArrayItems("skills",idx)}}
                >Delete
                </button> </div>
        </div>

        ))}
        </div>

        {/* Education */}
        <div className='bg-gradient-to-r from-teal-50 to-cyan-50 p-3 sm:p-6 rounded-xl border-l-4 border-teal-500'>
        <div className='flex justify-between'>
        <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center'>
            <svg className="w-8 h-8 mr-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            Education
        </h1>
        <div>
            <button 
           className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-green-300 text-lg bg-green-100 shadow-lg'
           onClick={()=>{addArrayItem("education",{degree:"",fieldOfStudy:"",institute:"",startYear:"",endYear:"",cgpa:""})}}
           >Add</button> 
           </div>
        </div>
            {resumedata.education.map((exp,idx)=>(
            <div key={idx}>
             <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Degree</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='B.Tech'
                    value={exp.degree || ''}
                    onChange={(e) => updateArrayItem('education', idx, {...exp, degree: e.target.value})}
                />
                </div>
                <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Institute</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='University/College Name'
                     value={exp.institute || ''}
                    onChange={(e) => updateArrayItem('education', idx, {...exp, institute: e.target.value})}
                />
                </div> 
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Field of Study</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='Computer Science Engineering'
                     value={exp.fieldOfStudy || ''}
                    onChange={(e) => updateArrayItem('education', idx, {...exp, fieldOfStudy: e.target.value})}
                />
                </div>
                <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>CGPA/Percentage</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='9.25 CGPA or 85%'
                    value={exp.cgpa || ''}
                    onChange={(e) => updateArrayItem('education', idx, {...exp, cgpa: e.target.value})}
                />
                </div> 
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Start Year</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='2020'
                    value={exp.startYear || ''}
                    onChange={(e) => updateArrayItem('education', idx, {...exp, startYear: e.target.value})}
                />
                </div>
                <div>
                <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>End Year</h2>
                <input
                    className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
                    placeholder='2024'
                    value={exp.endYear || ''}
                    onChange={(e) => updateArrayItem('education', idx, {...exp, endYear: e.target.value})}
                />
                </div> 
            </div>
                <div>
                <button 
                className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-green-300 text-lg bg-green-100 shadow-lg'
                onClick={()=>{deleteArrayItems("education",idx)}}
                >Delete</button> 
                </div>
            </div>
            ))}
        </div>

        {/* Coding Profiles */}
        <div className='bg-gradient-to-r from-indigo-50 to-blue-50 p-3 sm:p-6 rounded-xl border-l-4 border-indigo-500'>
        <div className='flex justify-between'>
         <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb:3 sm:mb-6 flex items-center'>
         <svg className="w-8 h-8 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
            Coding Profile Links
        </h1>
        <div>
         <button 
        onClick={() => addArrayItem("ProfileLinks",{ name:"", links:"" })}
        className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-indigo-400 text-lg bg-indigo-100 shadow-lg'
        >
        Add
      </button>
    </div>
  </div>

  {resumedata.ProfileLinks.map((exp, idx) => (
    <div key={idx} className='grid grid-cols-1 md:grid-cols-2 gap-6 p-2'>
      <div>
        <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Platform Name</h2>
        <input
          className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
          placeholder='Codeforces / LeetCode / HackerRank'
          value={exp.name || ""}
          onChange={(e) => updateArrayItem("ProfileLinks", idx, { ...exp, name: e.target.value })}
        />
      </div>

      <div>
        <h2 className='text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide'>Profile Link</h2>
        <input
          className='p-2.5 sm:p-4 w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-800 rounded-xl shadow-sm focus:shadow-md outline-none'
          placeholder='https://codeforces.com/profile/yourname'
          value={exp.links || ""}
          onChange={(e) => updateArrayItem("ProfileLinks", idx, { ...exp, links: e.target.value })}
        />
      </div>

      <div>
        <button 
          className='font-semibold p-2 rounded-xl cursor-pointer hover:bg-indigo-400 text-lg bg-indigo-100 shadow-lg'
          onClick={() => deleteArrayItems("ProfileLinks", idx)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


    </div>    
    </div>    
    </div>
        
        
        
  {/* Preview */}
<div className='w-full flex justify-center'>
<div className="bg-white  rounded-xl flex flex-col w-full sm:w-4xl">
  <div 
    className='flex justify-between items-center bg-blue-50 border-b-2 border-indigo-300  p-3 rounded-lg mb-2'
  >   
    <div className='text-lg sm:text-xl font-semibold'>Preview</div>
    <div className='bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text font-semibold text-lg sm:text-xl text-transparent'>.Live</div>
    <div className='flex gap-2'>
       <button onClick={handleUpdate} className='p-1.5 sm:p-2  bg-blue-400 font-semibold rounded-lg hover:bg-blue-600 cursor-pointer text-white'>Update</button>
      <button onClick={handleDownload} className='p-1.5 sm:p-2 bg-red-400 font-semibold rounded-lg hover:bg-red-600 cursor-pointer text-white'>Download</button>
    </div>
  </div>
  
  <div id="resume-preview" className=' h-140 bg-white rounded-xl w-full shadow-xl mt-2 overflow-y-auto p-2 sm:p-4'>
     
    {/* Header */}
    <div className='p-2 flex flex-col gap-1 items-center border-b border-gray-200 mb-4'>
      <h1 className='text-3xl font-semibold text-gray-800'>
        {resumedata.fullname?.trim() || single?.fullname || 'Your Name'}
      </h1>
      <h2 className='text-lg font-medium text-blue-600'>
        {resumedata.designation?.trim() || single?.designation || 'Your Designation'}
      </h2>
    </div>

    {/* Contact Information */}
    <div className='p-2 mb-4'>
      <div className='grid grid-cols-2 gap-2 text-sm'>
        {(resumedata.email?.trim() || single.email) && (
          <div><span className='font-semibold'>Email: </span>{resumedata?.email || single.email}</div>
        )}
        {(resumedata.phone?.trim() || single.phone) && (
          <div><span className='font-semibold'>Phone: </span>{resumedata?.phone || single.phone}</div>
        )}
        {(resumedata.linkedin?.trim() || single.linkedin) && (
          <div><span className='font-semibold'>LinkedIn: </span>
            <a href={resumedata.linkedin || single?.linkedin} className='text-blue-500 hover:underline'>{resumedata.linkedin || single.linkedin}</a>
          </div>
        )}
        {(resumedata.github?.trim() || single.github) && (
          <div><span className='font-semibold'>GitHub: </span>
            <a href={resumedata.github || single?.github} className='text-blue-500 hover:underline'>{resumedata.github || single.github}</a>
          </div>
        )}
      </div>
    </div>

    {/* Summary */}
    {(resumedata.summary?.trim() || single.summary) && (
      <div className='mb-6'>
        <h1 className='text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2'>SUMMARY</h1>
        <p className='text-sm text-gray-700 leading-relaxed'>{resumedata.summary || single.summary}</p>
      </div>
    )}

    {/* Work Experience */}
    {(resumedata.workExperience.length > 0 || single.workExperience?.length > 0) && (
      <div className='mb-6'>
        <h1 className='text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3'>WORK EXPERIENCE</h1>
        {(resumedata.workExperience.length > 0 ? resumedata.workExperience : single.workExperience).map((obj, idx) => (
          <div key={idx} className='mb-4'>
            <div className='flex justify-between items-start mb-1'>
              <div>
                <h1 className='text-md font-semibold text-gray-800'>{obj.company}</h1>
                <h2 className='text-sm text-blue-600 font-medium'>{obj.role}</h2>
              </div>
              <div>
                <h2 className='text-sm text-gray-500'>{obj.startDate} - {obj.endDate}</h2>
              </div>
            </div>
            {obj.description && <p className='text-sm text-gray-700 leading-relaxed'>{obj.description}</p>}
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {(resumedata.Projects.length > 0 || single.Projects?.length > 0) && (
      <div className='mb-6'>
        <h1 className='text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3'>PROJECTS</h1>
        {(resumedata.Projects.length > 0 ? resumedata.Projects : single.Projects).map((project, idx) => (
          <div key={idx} className='mb-4'>
            <h1 className='text-md font-semibold text-gray-800'>{project.title}</h1>
            {project.liveLink && (
              <div className='text-sm'>
                <span className='font-medium'>Live: </span>
                <a href={project.liveLink} className='text-blue-500 hover:underline'>{project.liveLink}</a>
              </div>
            )}
            {project.githubRepo && (
              <div className='text-sm'>
                <span className='font-medium'>GitHub: </span>
                <a href={project.githubRepo} className='text-blue-500 hover:underline'>{project.githubRepo}</a>
              </div>
            )}
            {project.description && <p className='text-sm text-gray-700 leading-relaxed mt-1'>{project.description}</p>}
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {(resumedata.skills.length > 0 || single.skills?.length > 0) && (
      <div className='mb-6'>
        <h1 className='text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3'>SKILLS</h1>
        <div className='flex flex-col gap-2'>
          {(resumedata.skills.length > 0 ? resumedata.skills : single.skills).map((skill, idx) => (
            <h1 key={idx}>{skill.languages}</h1>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {(resumedata.education.length > 0 || single.education?.length > 0) && (
      <div className='mb-6'>
        <h1 className='text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3'>EDUCATION</h1>
        {(resumedata.education.length > 0 ? resumedata.education : single.education).map((edu, idx) => (
          <div key={idx} className='mb-4'>
            <div className='flex justify-between items-center'>
              <div><p className='text-sm text-blue-600'>{idx+1}{". "}{edu.institute}</p></div>
              <div><span className='text-sm text-gray-500'>{edu.startYear}-{edu.endYear}</span></div>
            </div>
            <div className='mt-1 flex justify-between'>
              <h1 className='text-md font-semibold text-gray-800'>{edu.degree}</h1>
              <h3 className='text-sm text-gray-600'>{edu.fieldOfStudy}</h3>
              <p className='text-sm text-gray-600'>CGPA: {edu.cgpa}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Coding Profiles */}
    {(resumedata.ProfileLinks.length > 0 || single.ProfileLinks?.length > 0) && (
      <div className='mb-6'>
        <h1 className='text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3'>CODING PROFILES</h1>
        {(resumedata.ProfileLinks.length > 0 ? resumedata.ProfileLinks : single.ProfileLinks).map((profile, idx) => (
          <div key={idx} className='mb-2'>
            <span className='font-medium text-gray-700'>{profile.name}: </span>
            <a href={profile.links} className='text-blue-500 hover:underline text-sm'>{profile.links}</a>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

</div>
        
    </div>
  )
}

export default ResumeSection