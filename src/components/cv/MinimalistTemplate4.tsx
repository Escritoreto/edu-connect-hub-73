import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate4 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl print:shadow-none flex" id="cv-preview">
      {/* Left accent bar */}
      <div className="w-2 bg-gradient-to-b from-purple-600 to-purple-400"></div>
      
      <div className="flex-1 p-12 flex flex-col">
        {/* Header with photo inline */}
        <div className="flex items-center gap-5 mb-8">
          {data.photoPreview && (
            <img 
              src={data.photoPreview} 
              alt="Profile" 
              className="w-24 h-24 rounded object-cover grayscale"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-extralight text-purple-900">
              {data.firstName}
            </h1>
            <h1 className="text-4xl font-bold text-purple-900 mb-1">
              {data.lastName}
            </h1>
            {firstJob && (
              <p className="text-sm text-purple-600 font-light tracking-wider">
                {firstJob.jobTitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Contact */}
        <div className="mb-8 pb-4 border-b border-purple-200">
          <div className="grid grid-cols-3 gap-3 text-xs text-gray-600 font-light">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.countryCode} {data.phone}</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </div>
        
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed font-light text-sm border-l-4 border-purple-400 pl-5">
              {data.summary}
            </p>
          </div>
        )}
        
        {/* Timeline style content */}
        <div className="space-y-8">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-3">Experiência Profissional</p>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute left-0 top-0 w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                    <div className="pl-6">
                      <h3 className="text-base font-semibold text-purple-800">{exp.jobTitle}</h3>
                      <p className="text-purple-600 mb-1 font-light text-sm">{exp.company}</p>
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-xs text-gray-500 font-light mb-2">
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                        </p>
                      )}
                      {exp.responsibilities && (
                        <p className="text-gray-700 leading-relaxed font-light text-xs">
                          {exp.responsibilities}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-3">Formação Acadêmica</p>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="relative">
                    <div className="absolute left-0 top-0 w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                    <div className="pl-6">
                      <h3 className="text-base font-semibold text-purple-800">{edu.degree}</h3>
                      <p className="text-purple-600 font-light mb-1 text-sm">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-xs text-gray-500 font-light">
                          {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Three Column Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Skills */}
            {data.skills.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-3">Habilidades</p>
                <div className="relative">
                  <div className="absolute left-0 top-0 w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                  <div className="pl-6">
                    <div className="space-y-1">
                      {data.skills.map((skill, index) => (
                        <div 
                          key={index} 
                          className="text-gray-700 font-light text-xs"
                        >
                          • {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-3">Idiomas</p>
                <div className="relative">
                  <div className="absolute left-0 top-0 w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                  <div className="pl-6">
                    <div className="space-y-1">
                      {data.languages.map((lang) => (
                        <p key={lang.id} className="text-xs text-gray-700 font-light">
                          {lang.name} - {lang.level}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-3">Certificações</p>
                <div className="relative">
                  <div className="absolute left-0 top-0 w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                  <div className="pl-6">
                    <div className="space-y-1">
                      {data.certifications.map((cert) => (
                        <p key={cert.id} className="text-xs text-gray-700 font-light">
                          {cert.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-3">Projetos</p>
              <div className="relative">
                <div className="absolute left-0 top-0 w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                <div className="pl-6">
                  <div className="space-y-2">
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <p className="text-sm font-medium text-purple-800">{proj.name}</p>
                        {proj.description && (
                          <p className="text-xs text-gray-700 font-light">{proj.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
