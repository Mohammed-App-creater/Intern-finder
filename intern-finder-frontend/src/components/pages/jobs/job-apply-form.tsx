"use client";

import Image from "next/image";
import { useState } from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApplyToJob } from "@/hooks/useJob";
import { useAuthStore } from "@/store/auth";
import { useRouter, useParams } from "next/navigation";
import { useUploadResume } from "@/hooks/useFileUpload";
interface JobApplicationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  companyName?: string;
  logo?: string;
}

interface JobApplicationPayload {
  jobId: string;
  talentId: string;
  applicantId: string;
  resumeUrl: string;
}

export default function JobApplicationPopup(props: JobApplicationPopupProps) {
  const {
    isOpen,
    onClose,
    jobTitle = "",
    companyName = "",
    logo = "/images/image_placeholder.jpg",
  } = props;
  const router = useRouter();
  const params = useParams() || {};
  const jobId: string = params?.["job-detail"] as string || "";

  const { user } = useAuthStore();
  const talentId = user?.role === "TALENT" ? user?.id || "" : "";
  const applicantId = user?.id || "";

  const applyHook = useApplyToJob();
  const uploadHook = useUploadResume();

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-lg font-semibold">
          Please log in to apply for jobs
        </h2>
        <Button onClick={() => router.push("/login")}>Login</Button>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      console.log("handleFileChange: no file selected");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    console.log("handleFileChange: selected file", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    if (!allowed.includes(file.type)) {
      const msg = `Only PDF / DOC / DOCX files are allowed. Detected type: ${file.type}`;
      console.log("handleFileChange: invalid type ->", msg);
      setSubmitError("Only PDF / DOC / DOCX files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      const msg = `File too large. Maximum size is 5MB. Selected size: ${(
        file.size /
        (1024 * 1024)
      ).toFixed(2)} MB`;
      console.log("handleFileChange: file too large ->", msg);
      setSubmitError("File too large. Maximum size is 5MB.");
      return;
    }

    setSubmitError(null);
    setResumeFile(file);
    console.log("handleFileChange: file accepted", {
      name: file.name,
      sizeMB: (file.size / (1024 * 1024)).toFixed(2),
    });
  };

  const uploadFile = async (file: File | null): Promise<string | null> => {
    if (!file) return null;
    setIsUploading(true);
    try {
      if (uploadHook?.mutateAsync) {
        const res = await uploadHook.mutateAsync(file);
        return res?.url ?? null;
      }

      if (uploadHook?.mutate) {
        return await new Promise<string | null>((resolve, reject) => {
          uploadHook.mutate(file, {
            onSuccess: (res: unknown) => {
              if (res && typeof res === "object" && "url" in res) {
                resolve((res as { url?: string }).url ?? null);
                console.log("Upload response:", res);
              } else {
                resolve(null);
              }
            },
            onError: (err: unknown) => {
              reject(err);
              console.error("Upload error:", err);
            },
          });
        });
      }

      if (typeof uploadHook === "function") {
        const res = await (uploadHook as (file: File) => Promise<unknown>)(
          file
        );
        if (res && typeof res === "object" && "url" in res) {
          return (res as { url?: string }).url ?? null;
        }
        return null;
      }

      return null;
    } catch (err) {
      console.error("Error uploading file:", err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const applyToJob = async (payload: JobApplicationPayload) => {
    if (applyHook?.mutateAsync) {
      return applyHook.mutateAsync(payload);
    }

    if (applyHook?.mutate) {
      return await new Promise((resolve, reject) => {
        applyHook.mutate(payload, {
          onSuccess: (res: unknown) => {
            resolve(res);
            console.log("Apply response:", res);
          },
          onError: (err: unknown) => {
            reject(err);
            console.error("Apply error:", err);
          },
        });
      });
    }

    if (typeof applyHook === "function") {
      return (
        applyHook as (payload: JobApplicationPayload) => Promise<unknown>
      )(payload);
    }

    throw new Error("apply hook not available");
  };

  // Manual validation for additionalInfo
  const validate = (): string | null => {
    if (additionalInfo.length > 2000) {
      return "Max 2000 characters";
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-text-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="Company Logo" width={40} height={40} />
            <div>
              <DialogTitle className="text-lg font-semibold text-dark">
                {jobTitle}
              </DialogTitle>
              <p className="text-sm text-light">{companyName}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitError(null);
              const validationError = validate();
              if (validationError) {
                setSubmitError(validationError);
                return;
              }
              setIsSubmitting(true);
              try {
                let resumeUrl: string | null = null;
                if (resumeFile) {
                  resumeUrl = await uploadFile(resumeFile);
                }
                const payload: JobApplicationPayload = {
                  jobId,
                  talentId,
                  applicantId,
                  resumeUrl: resumeUrl ?? "",
                };
                await applyToJob(payload);
                onClose();
              } catch (err) {
                console.error("Error applying to job:", err);
                let errorMsg = "Failed to submit application";
                if (
                  err &&
                  typeof err === "object" &&
                  err !== null &&
                  "message" in err
                ) {
                  // @ts-expect-error: err may not have a message property, but we expect it from error objects
                  errorMsg = err.message;
                }
                setSubmitError(errorMsg);
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <div>
              <Label
                htmlFor="additionalInfo"
                className="text-sm font-medium text-dark"
              >
                Additional information
              </Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                placeholder="Add a cover letter or anything else you want to share"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-dark mb-2 block">
                Attach your resume
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="resume"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Paperclip className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-primary">
                      Attach Resume
                    </span>
                    <span className="text-xs text-light block">
                      or drag and drop
                    </span>
                  </div>
                </Label>

                {resumeFile && (
                  <p className="text-sm text-dark mt-2">
                    Selected: {resumeFile.name}
                  </p>
                )}

                {submitError && (
                  <p className="text-xs text-red-600 mt-2">{submitError}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
            >
              {isSubmitting || isUploading
                ? "Submitting..."
                : "Submit Application"}
            </Button>

            <p className="text-xs text-light text-center">
              By sending this request you confirm that you accept our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
