import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ClassicTemplate2 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none p-10 flex flex-col" id="cv-preview">
      {/* Header */}
      <div className="text-center border-b-4 border-blue-800 pb-4 mb-6">
        <h1 className="text-4xl font-serif font-bold text-blue-800 mb-1">
          {data.firstName} {data.lastName}
        </h1>
        {firstJob && (
          <p className="text-lg text-gray-600 italic mb-3">{firstJob.jobTitle}</p>
        )}
        <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.countryCode} {data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      
      {/* Photo - centered below header */}
      {data.photoPreview && (
        <div className="flex justify-center mb-6">
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-300"
          />
        </div>
      )}
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-xl font-serif font-bold text-blue-800 mb-2 uppercase tracking-wide">
            Resumo Profissional
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm text-justify">{data.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-serif font-bold text-blue-800 mb-3 uppercase tracking-wide">
            Experiência Profissional
          </h2>
          <div className="border-l-4 border-blue-300 pl-4 space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-base font-bold text-gray-800">{exp.jobTitle}</h3>
                <p className="text-gray-600 italic text-sm mb-1">{exp.company}</p>
                {(exp.startDate || exp.endDate) && (
                  <p className="text-xs text-gray-500 mb-2">
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
          <h2 className="text-xl font-serif font-bold text-blue-800 mb-3 uppercase tracking-wide">
            Formação Acadêmica
          </h2>
          <div className="border-l-4 border-blue-300 pl-4 space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-base font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600 italic text-sm mb-1">{edu.institution}</p>
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

      {/* Two Column Section */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-serif font-bold text-blue-800 mb-3 uppercase tracking-wide">
              Habilidades
            </h2>
            <div className="grid grid-cols-1 gap-1.5">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mr-2"></span>
                  <span className="text-gray-700 text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-serif font-bold text-blue-800 mb-3 uppercase tracking-wide">
              Idiomas
            </h2>
            <div className="space-y-1">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mr-2"></span>
                  <span className="text-gray-700 text-sm">{lang.name} - {lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-serif font-bold text-blue-800 mb-3 uppercase tracking-wide">
            Certificações
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-sm font-bold text-gray-800">{cert.name}</h3>
                <p className="text-gray-600 text-xs">{cert.institution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-xl font-serif font-bold text-blue-800 mb-3 uppercase tracking-wide">
            Projetos
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
  );
};
