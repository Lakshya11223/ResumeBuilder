import Resume from "../models/Resume.models.js"


const createResume = async (req, res) => {
  const { title, fullname, designation, summary, phone, email, github, linkedin, workExperience, Projects, skills, education, ProfileLinks } = req.body;
  
  const userId = req.user?._id;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  try {
    const resumeData = {
      userId,
      title: title || "Software Engineer",
      fullname: fullname || "",
      designation: designation || "",
      summary: summary || "",
      phone: phone || "",
      email: email || "",
      github: github || "",
      linkedin: linkedin || "",
      workExperience: workExperience || [],
      Projects: Projects || [],
      skills: skills || [],
      education: education || [],
      ProfileLinks: ProfileLinks || []
    };

    const newResume = await Resume.create(resumeData);
   
    return res.status(201).json({
      success: true,
      message: "Your resume has been created",
      data: newResume,
    });
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({
      success: false,
      message: "Resume could not be created",
      error: error.message,
    });
  }
};
 const getallresume = async (req,res) =>{
            const userid = req.user?._id;
            
            if(!userid){
                res.status(400).json({message:"Unauthorised user, Please log in"});
            }
            try {
            const resumes =await Resume.find({userId : userid}).sort({updatedAt:-1});
            if(!resumes ||  resumes.length === 0){
                res.status(400).json({message:"No resume found"});
            }
            res.status(200).json({message:"Succesfuuly get resumes",data:resumes});
                
            } catch (error) {
                console.log("Error in getting all the resumes",error)
            }
            
        };
        
        const getresumebyid = async (req,res) =>{
            const userid = req.user?._id;
            const {id:resumeid} = req.params

            try{
            if(!userid){
            res.status("Unauthorised user, Please log in");
            }
            if(!resumeid){
                res.status("Failed to fetch, the resume");
            }
            const oneresume =await Resume.find({_id : resumeid,userId:userid});

            if(!oneresume){
                res.status(400).json({message:"No resume found"});
            }

            res.status(200).json({message:"Resume fetched successfully",data:oneresume});

            }
            catch(error){
                console.log("Error in fetching one resume");
                res.status(401).json({
                    message:"No resume found"
                });
            }
        }

    const updateResume = async (req,res) =>{
        const {resumedata} = req.body
        const {id:resumeid} = req.params
        try{
            
        if(!resumedata){
         return res.status(401).json({message:"No data found for updating the resume"});
        }
        if(!resumeid){
            return res.status(401).json({message:"No resume selectes yet for updation"});
        }
        const updatedResume = await Resume.findByIdAndUpdate(
            resumeid,
            { $set: resumedata },
            { new: true } 
            );
        
            if(!updatedResume){
               console.log("Resume  is not updated")
            }
            
        return res.status(200).json({message:"your resume has been updated",data:updatedResume});

        }
        catch(error){
            console.log("Error in the updation");
               return res.status(401).json({
                message:"No updation happened",
                error:error,
            });
            
        }
        
    }

const deleteResume = async (req,res)=>{
const {id:resumeid} = req.params;
    try {
        if(!resumeid){
        res.status(401).json({message:"No resume selectes yet for updation"});
        }
        console.log("Reached delete");
        const resumefordelete =await Resume.findByIdAndDelete(
            resumeid
        );
        console.log("deleted")

        if(!resumefordelete){
            res.status(401).json({message:"Not deleted"});
        }
        res.status(200).json({message:"your resume has been deleted"});

    } catch (error) {
            console.log("Error in the deletion");
            res.status(401).json({
            message:"No deletion happened",
            error:error,
        });
    }

    }


        export {createResume,updateResume,deleteResume,getallresume,getresumebyid}


            //        resumeid,
            //        {$unset : {field:""}}, -> delete only one field
            //        {new:true}