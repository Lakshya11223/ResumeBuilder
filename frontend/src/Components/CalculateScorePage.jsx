import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../Store/resume.Store';
import { Upload, FileText, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


function CalculateScorePage() {
  const [file, setFile] = useState(null);
  const [designation, setDesignation] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const { scoreText } = useResumeStore(); // Connect to Zustand store action
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      toast.error('Please upload a valid PDF file.');
    }
  };

  const parsePDF = async (pdfFile) => {
        const arrayBuffer = await pdfFile.arrayBuffer();

        const pdf = await pdfjs.getDocument({
            data: arrayBuffer,
        }).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            text +=
            content.items
                .map((item) => item.str)
                .join(" ") + "\n";
        }

        return text;
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a resume PDF file.');
      return;
    }
    if (!designation.trim()) {
      toast.error('Please enter your target designation.');
      return;
    }

    setIsParsing(true);
    try {
      const text = await parsePDF(file);
      
      if (!text.trim()) {
        throw new Error("Could not extract text. The PDF might be scanned/image-only.");
      }

      // Send to backend store action
      await scoreText(text, designation);
      
      toast.success("Analysis complete!");
      navigate('/score/upload');
    } catch (err) {
      console.error(err);
      // [FIX] Show the real error so we can see what failed
      toast.error(`Error reading PDF: ${err.message || err}`);
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8 border border-slate-100">
        <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2 mb-6">
          Calculate Resume Score <Sparkles className="text-yellow-500 fill-yellow-500" />
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Target Designation</label>
            <input
              type="text"
              className="p-3 w-full bg-slate-50 border rounded-xl"
              placeholder="e.g. Frontend Developer"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              disabled={isParsing}
            />
          </div>
          <div className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-2 bg-slate-50 cursor-pointer relative">
            <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} disabled={isParsing} />
            <Upload className="text-blue-500 size-8" />
            <p className="font-bold text-sm text-slate-700">{file ? file.name : "Upload Resume (PDF)"}</p>
          </div>
          <button type="submit" disabled={isParsing} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700">
            {isParsing ? <Loader2 className="animate-spin mx-auto" /> : 'Scan Resume'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CalculateScorePage;