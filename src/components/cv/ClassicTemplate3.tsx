import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ClassicTemplate3 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none p-10 flex flex-col" id="cv-preview">
      {/* Header - Left aligned with vertical accent */}
      <div className="flex gap-4 mb-6 pb-4 border-b-2 border-green-200">
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-20 h-20 rounded object-cover border-2 border-green-600"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-green-800 mb-1">
            {data.firstName} {data.lastName}
          </h1>
          {firstJob && (
            <p className="text-lg text-green-600 mb-2">{firstJob.jobTitle}</p>
          )}
          <div className="flex gap-3 text-xs text-gray-600 flex-wrap">
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>☎ {data.countryCode} {data.phone}</span>}
            {data.location && <span>📍 {data.location}</span>}
          </div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="flex gap-6 flex-1">
        {/* Left Column */}
        <div className="w-2/3 flex flex-col">
          {/* Summary */}
          {data.summary && (
            <div className="mb-5">
              <h2 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">
                <span className="w-6 h-1 bg-green-600"></span>
                PERFIL
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm text-justify">{data.summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-1 bg-green-600"></span>
                EXPERIÊNCIA
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-5 border-l-2 border-green-300">
                    <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                    <h3 className="text-base font-bold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-green-600 font-semibold text-sm mb-0.5">{exp.company}</p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-xs text-gray-500 mb-1">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                      </p>
                    )}
                    {exp.responsibilities && (
                      <p className="text-gray-700 leading-relaxed text-sm text-justify">{exp.responsibilities}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-1 bg-green-600"></span>
                FORMAÇÃO
              </h2>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id} className="relative pl-5 border-l-2 border-green-300">
                    <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                    <h3 className="text-base font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-green-600 font-semibold text-sm mb-0.5">{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-xs text-gray-500">
                        {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-1 bg-green-600"></span>
                PROJETOS
              </h2>
              <div className="space-y-2">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-sm font-bold text-gray-800">{proj.name}</h3>
                    {proj.description && (
                      <p className="text-gray-700 text-xs">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Spacer */}
          <div className="flex-grow" />
        </div>
        
        {/* Right Column - Skills, Languages, Certifications */}
        <div className="w-1/3">
          {data.skills.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-4 h-1 bg-green-600"></span>
                SKILLS
              </h2>
              <div className="space-y-1.5">
                {data.skills.map((skill, index) => (
                  <div key={index} className="bg-green-50 border-l-4 border-green-600 px-2 py-1.5">
                    <span className="text-gray-700 text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-4 h-1 bg-green-600"></span>
                IDIOMAS
              </h2>
              <div className="space-y-1">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="text-sm text-gray-700">
                    <span className="font-medium">{lang.name}</span> - {lang.level}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-4 h-1 bg-green-600"></span>
                CERTIFICAÇÕES
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-medium text-gray-800">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
