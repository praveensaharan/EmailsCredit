import React from "react";

const PreviewComponent = ({ data, email, companyName }) => {
  const renderEmailPreview = () => {
    const hiringManagerText = data.hiringManager
      ? `${data.hiringManager},`
      : "Hiring Team,";

    const emailSubject = `Application for ${
      data.role || "[Job Role]"
    } Position`;

    const emailBody = `Dear ${hiringManagerText}

I hope this message finds you well. I am writing to express my interest in the ${
      data.role || "[Job Role]"
    } position at ${
      data.companyName || companyName || "[Company Name]"
    } that I discovered through ${data.jobPortal || "[Job Portal]"}.

I have ${
      data.yearsOfExperience || "[Years of Experience]"
    } years of experience in ${
      data.industry || "[Industry]"
    }. I believe that my skills in ${
      data.relevantSkills && data.relevantSkills.length > 0
        ? data.relevantSkills.join(", ")
        : "[Relevant Skills]"
    } align well with the requirements of the role, and I am confident that I can contribute effectively to your team.

Thank you for taking the time out of your busy schedule to consider my application. For your convenience, I have attached my resume to this email to provide you with a better understanding of my background. I would welcome the opportunity to discuss how my experience in ${
      data.industryDomain || "[Industry Domain]"
    } makes me a strong candidate for this position.

I look forward to hearing from you soon.

Best Regards,
${data.fullName || "[Full Name]"}${
      data.contactInformation ? `\n${data.contactInformation}` : ""
    }${data.resume ? `\nResume: ${data.resume}` : ""}${
      data.linkedinProfile ? `\nLinkedIn: ${data.linkedinProfile}` : ""
    }${data.githubProfile ? `\nGithub: ${data.githubProfile}` : ""}
`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    return (
      <div className="space-y-4 p-2 max-w-xl mx-auto ">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
          <p className="text-gray-700 font-medium">
            <strong>To:</strong> <span className="text-blue-600">{email}</span>
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
          <p className="text-gray-700 font-medium">
            <strong>Subject:</strong> Application for{" "}
            {data.role ? (
              <span className="text-blue-600">{data.role}</span>
            ) : (
              <span className="text-red-500">[Job Role]</span>
            )}{" "}
            Position
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
          <p className="text-gray-700">
            Dear{" "}
            <span className="font-semibold text-blue-600">
              {" "}
              {hiringManagerText}
            </span>
          </p>

          <p className="text-gray-700 mt-2">
            I hope this message finds you well. I am writing to express my
            interest in the{" "}
            {data.role ? (
              <span className="font-semibold text-blue-600">{data.role}</span>
            ) : (
              <span className="font-semibold text-red-500">[Job Role]</span>
            )}{" "}
            position at{" "}
            {data.companyName ? (
              <span className="font-semibold text-blue-600">
                {data.companyName}
              </span>
            ) : (
              <span className="font-semibold text-blue-500">
                [{companyName}]
              </span>
            )}{" "}
            that I discovered through{" "}
            {data.jobPortal ? (
              <span className="font-semibold text-blue-600">
                {data.jobPortal}
              </span>
            ) : (
              <span className="font-semibold text-red-500">[Job Portal]</span>
            )}
            .
          </p>

          <p className="text-gray-700 mt-2">
            I have{" "}
            {data.yearsOfExperience ? (
              <span className="font-semibold text-blue-600">
                {data.yearsOfExperience}
              </span>
            ) : (
              <span className="font-semibold text-red-500">
                [Years of Experience]
              </span>
            )}{" "}
            years of experience in{" "}
            {data.industry ? (
              <span className="font-semibold text-blue-600">
                {data.industry}
              </span>
            ) : (
              <span className="font-semibold text-red-500">[Industry]</span>
            )}
            . My skills in{" "}
            {data.relevantSkills && data.relevantSkills.length > 0 ? (
              <span className="font-semibold text-blue-600">
                {data.relevantSkills.join(", ")}
              </span>
            ) : (
              <span className="font-semibold text-red-500">
                [Relevant Skills]
              </span>
            )}{" "}
            align well with the requirements of the role, and I am confident
            that I can contribute effectively to your team.
          </p>

          <p className="text-gray-700 mt-2">
            Thank you for taking the time out of your busy schedule to consider
            my application. For your convenience, I have attached my resume to
            this email to provide you with a better understanding of my
            background. I would welcome the opportunity to discuss how my
            experience in{" "}
            {data.industryDomain ? (
              <span className="font-semibold text-blue-600">
                {data.industryDomain}
              </span>
            ) : (
              <span className="font-semibold text-red-500">
                [Industry Domain]
              </span>
            )}{" "}
            makes me a strong candidate for this position.
          </p>

          <p className="text-gray-700 mt-4">
            I look forward to hearing from you soon.
          </p>

          <p className="mt-2">Best Regards,</p>
          <span className="font-semibold text-blue-600">
            {data.fullName ? (
              data.fullName
            ) : (
              <span className="text-red-500">[Full Name]</span>
            )}
            <br />
          </span>

          {data.contactInformation && (
            <span className="text-blue-600 font-semibold">
              {data.contactInformation} <br />
            </span>
          )}

          {data.resume && (
            <span className="text-gray-700 mt-2">
              Resume:{" "}
              <a
                href={data.resume}
                className="text-blue-600 hover:underline font-semibold"
              >
                {data.resume}
              </a>{" "}
              <br />
            </span>
          )}

          {data.linkedinProfile && (
            <span className="text-gray-700 mt-2">
              LinkedIn:{" "}
              <a
                href={data.linkedinProfile}
                className="text-blue-600 hover:underline font-semibold"
              >
                {data.linkedinProfile}
              </a>
              <br />
            </span>
          )}

          {data.githubProfile && (
            <span className="text-gray-700 mt-2">
              GitHub:{" "}
              <a
                href={data.githubProfile}
                className="text-blue-600 hover:underline font-semibold"
              >
                {data.githubProfile}
              </a>
            </span>
          )}
        </div>

        <div className="text-center mt-6">
          <a href={mailtoLink} className="inline-block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">
              Send Email
            </button>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div>
      {data && Object.keys(data).length >= 0 ? (
        renderEmailPreview()
      ) : (
        <p>No data to display. Please fill out the form.</p>
      )}
    </div>
  );
};

export default PreviewComponent;
