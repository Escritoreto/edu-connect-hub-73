import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate2 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none p-12 flex flex-col" id="cv-preview">
      {/* Compact Header with photo on the right */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-blue-200">
        <div>
          <h1 className="text-4xl font-light text-blue-900 mb-1">
            {data.firstName} <span className="font-bold">{data.lastName}</span>
          </h1>
          {firstJob && (
            <p className="text-base text-blue-600 font-light uppercase tracking-widest mt-1">
              {firstJob.jobTitle}
            </p>
          )}
        </div>
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-300"
          />
        )}
      </div>
      
      {/* Contact in single line */}
      <div className="flex justify-between text-xs text-gray-600 font-light mb-8 pb-4 border-b border-gray-200 flex-wrap gap-2">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.countryCode} {data.phone}</span>}
        {data.location && <span>{data.location}</span>}
      </div>
      
      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-10 flex-1">
        {/* Main content */}
        <div className="col-span-2 flex flex-col">
          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-2 pb-1 border-b border-blue-200">
                Sobre
              </h2>
              <p className="text-gray-700 leading-relaxed font-light text-sm">
                {data.summary}
              </p>
            </div>
          )}
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Experiência
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-base font-semibold text-blue-700">{exp.jobTitle}</h3>
                    <p className="text-blue-600 mb-0.5 font-light text-sm">{exp.company}</p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-xs text-gray-500 font-light mb-2">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                      </p>
                    )}
                    {exp.responsibilities && (
                      <p className="text-gray-700 leading-relaxed font-light text-xs">
                        {exp.responsibilities}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Formação
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-base font-semibold text-blue-700">{edu.degree}</h3>
                    <p className="text-blue-600 font-light mb-0.5 text-sm">{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-xs text-gray-500 font-light">
                        {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Cursando'}
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
              <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Projetos
              </h2>
              <div className="space-y-2">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-sm font-semibold text-blue-700">{proj.name}</h3>
                    {proj.description && (
                      <p className="text-gray-700 font-light text-xs">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Spacer */}
          <div className="flex-grow" />
        </div>
        
        {/* Sidebar */}
        <div>
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Habilidades
              </h2>
              <div className="space-y-1.5">
                {data.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="text-gray-700 font-light text-xs py-1 border-l-2 border-blue-400 pl-2"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Idiomas
              </h2>
              <div className="space-y-1">
                {data.languages.map((lang) => (
                  <p key={lang.id} className="text-xs text-gray-700 font-light">
                    {lang.name} - {lang.level}
                  </p>
                ))}
              </div>
            </div>
          )}

          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Certificações
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-xs font-medium text-gray-800">{cert.name}</p>
                    <p className="text-xs text-gray-600 font-light">{cert.institution}</p>
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
