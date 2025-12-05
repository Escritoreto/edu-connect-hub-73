import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ModernTemplate2 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none" id="cv-preview">
      <div className="flex flex-col h-[297mm]">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 flex items-center gap-6">
          {data.photoPreview && (
            <img 
              src={data.photoPreview} 
              alt="Profile" 
              className="w-28 h-28 rounded-lg object-cover border-4 border-white shadow-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-1">
              {data.firstName} {data.lastName}
            </h1>
            {firstJob && (
              <p className="text-lg text-white/90 font-light">{firstJob.jobTitle}</p>
            )}
          </div>
        </div>
        
        {/* Two Column Content */}
        <div className="flex flex-1">
          {/* Left Column */}
          <div className="w-1/3 bg-purple-50 p-6 flex flex-col">
            {/* Contact */}
            <div className="mb-5">
              <h3 className="text-lg font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-1">Contato</h3>
              <div className="space-y-1.5 text-sm text-gray-700">
                {data.email && <p className="break-words">{data.email}</p>}
                {data.phone && <p>{data.countryCode} {data.phone}</p>}
                {data.location && <p>{data.location}</p>}
              </div>
            </div>
            
            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="mb-5">
                <h3 className="text-lg font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-1">Habilidades</h3>
                <div className="space-y-1.5">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="bg-purple-100 rounded px-2 py-1 text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <div className="mb-5">
                <h3 className="text-lg font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-1">Idiomas</h3>
                <div className="space-y-1">
                  {data.languages.map((lang) => (
                    <div key={lang.id} className="text-sm text-gray-700">
                      <span className="font-medium">{lang.name}</span> - {lang.level}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-1">Certificações</h3>
                <div className="space-y-2">
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="text-sm">
                      <p className="font-medium text-gray-800">{cert.name}</p>
                      <p className="text-gray-600 text-xs">{cert.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div className="w-2/3 p-6 flex flex-col">
            {/* Summary */}
            {data.summary && (
              <div className="mb-5">
                <h2 className="text-xl font-bold text-purple-800 mb-1 border-b-2 border-purple-200 pb-1">
                  Sobre Mim
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xl font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-1">
                  Experiência
                </h2>
                <div className="space-y-3">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="text-base font-bold text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-gray-600 text-sm mb-0.5">{exp.company}</p>
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-xs text-gray-500 mb-1">
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                        </p>
                      )}
                      {exp.responsibilities && (
                        <p className="text-gray-700 leading-relaxed text-sm">{exp.responsibilities}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xl font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-1">
                  Formação
                </h2>
                <div className="space-y-2">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-base font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600 text-sm mb-0.5">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-xs text-gray-500">
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
                <h2 className="text-xl font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-1">
                  Projetos
                </h2>
                <div className="space-y-2">
                  {data.projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 className="text-base font-bold text-gray-800">{proj.name}</h3>
                      {proj.description && (
                        <p className="text-gray-700 text-sm">{proj.description}</p>
                      )}
                      {proj.link && (
                        <p className="text-xs text-purple-600">{proj.link}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Spacer */}
            <div className="flex-grow" />
          </div>
        </div>
      </div>
    </div>
  );
};
