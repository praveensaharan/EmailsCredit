import React from "react";

const EmailPreview = ({ form }) => {
  const values = form.getFieldsValue();
  const hiringManagerText = values.hiringManager
    ? `Dear ${values.hiringManager},`
    : "Dear Hiring Team,";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Email Preview</h2>
      <p>
        <strong>Subject:</strong> Application for {values.role} Position
      </p>
      <p>{hiringManagerText}</p>
      <p>
        I hope this message finds you well. I am writing to express my interest
        in the {values.role} position at {values.companyName} that I discovered
        through {values.jobPortal}.
      </p>
      <p>
        I have {values.yearsOfExperience} years of experience in{" "}
        {values.industry}. I believe that my skills in{" "}
        {values.relevantSkills.join(", ")} align well with the requirements of
        the role, and I am confident that I can contribute effectively to your
        team.
      </p>
      <p>
        Thank you for taking the time out of your busy schedule to consider my
        application. For your convenience, I have attached my resume to this
        email to provide you with a better understanding of my background. I
        would welcome the opportunity to discuss how my experience in{" "}
        {values.industryDomain} makes me a strong candidate for this position.
      </p>
      <p>I look forward to hearing from you soon.</p>
      <p>Best Regards,</p>
      <span>{values.fullName}</span>
      <br />
      {values.contactInformation && (
        <span>
          {values.contactInformation}
          <br />
        </span>
      )}
      {values.resume && (
        <span>
          Resume: {values.resume}
          <br />
        </span>
      )}
      {values.linkedinProfile && (
        <span>
          LinkedIn: {values.linkedinProfile}
          <br />
        </span>
      )}
      {values.githubProfile && (
        <span>
          Github: {values.githubProfile}
          <br />
        </span>
      )}
    </div>
  );
};

export default EmailPreview;
