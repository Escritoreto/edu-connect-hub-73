import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none p-12 flex flex-col" id="cv-preview">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-5xl font-light text-gray-800 mb-1">
              {data.firstName}
            </h1>
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              {data.lastName}
            </h1>
            {firstJob && (
              <p className="text-base text-gray-600 font-light tracking-wide uppercase">
                {firstJob.jobTitle}
              </p>
            )}
          </div>
          {data.photoPreview && (
            <img 
              src={data.photoPreview} 
              alt="Profile" 
              className="w-24 h-24 object-cover grayscale"
            />
          )}
        </div>
        
        <div className="h-px bg-gray-300 my-5"></div>
        
        <div className="flex gap-6 text-sm text-gray-600 font-light flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.countryCode} {data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed font-light text-sm">
            {data.summary}
          </p>
        </div>
      )}
      
      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">
            Experiência
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-semibold text-gray-700">{exp.jobTitle}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-xs text-gray-500 font-light">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2 font-light text-sm">{exp.company}</p>
                {exp.responsibilities && (
                  <p className="text-gray-700 leading-relaxed font-light text-sm">
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
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">
            Formação
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-semibold text-gray-700">{edu.degree}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-xs text-gray-500 font-light">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Cursando'}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 font-light text-sm">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Three Column Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-light text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">
              Idiomas
            </h2>
            <div className="space-y-1">
              {data.languages.map((lang) => (
                <p key={lang.id} className="text-sm text-gray-700 font-light">
                  {lang.name} - {lang.level}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">
              Certificações
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-medium text-gray-800">{cert.name}</p>
                  <p className="text-xs text-gray-600 font-light">{cert.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">
            Projetos
          </h2>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-sm font-semibold text-gray-700">{proj.name}</h3>
                {proj.description && (
                  <p className="text-gray-600 font-light text-xs">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Spacer */}
      <div className="flex-grow" />
    </div>
  );
};
