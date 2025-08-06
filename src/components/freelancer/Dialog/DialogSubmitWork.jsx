"use client"
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import axios from "axios";
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { updateFreelancersJob } from "@/redux/jobSlice";
import { Upload, Trash, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';

const DialogSubmitWork = ({ open, setOpen, job }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dispatch = useDispatch();

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    const updatedFiles = [...selectedFiles, ...newFiles].filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    setSelectedFiles(updatedFiles);
    e.target.value = ""; // reset input to allow same file selection again
  };

  const handleFileRemove = (fileToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter(
        (file) =>
          !(file.name === fileToRemove.name && file.size === fileToRemove.size)
      )
    );
  };

  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("files", file);
  });

  const submitHandler = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        `/api/job/submitWork/${job}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        dispatch(updateFreelancersJob(res.data.job));
        toast.success(res.data.message);
        setOpen(false);
        router.push("/freelancer/my-project")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold mb-7">
            Submit Your Work
          </DialogTitle>
          <div className="flex flex-col gap-4">
            <p className="text-sm">Project Files</p>

            {/* Upload area */}
            <div
              className="border-dotted cursor-pointer border-2 border-slate-200 p-4 flex flex-col justify-center items-center gap-3"
              onClick={handleFileClick}
            >
              <div className="rounded-full p-3 bg-slate-300 flex justify-center items-center">
                <Upload />
              </div>
              <p>Upload Your Work</p>
              <p className="text-sm">
                Drag and drop your files here or click to browse
              </p>
              <p>Supported format: ZIP, RAR  (Max 20 MB)</p>

              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Preview Section */}
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-semibold mb-1">Selected Files:</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  {selectedFiles.map((file, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-slate-100 px-3 py-1 rounded"
                    >
                      <span className="truncate max-w-[80%]">{file.name}</span>
                      <button
                        onClick={() => handleFileRemove(file)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {loading ? (
              <Button variant="outline"
                className="bg-blue-700 text-white">
                Plese Wait <Loader2 className="animate-spin mr-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                className="bg-blue-700 text-white"
                onClick={submitHandler}
              >
                Submit Work
              </Button>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSubmitWork;
