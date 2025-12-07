import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ClassicTemplate4 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl print:shadow-none p-10 flex flex-col" id="cv-preview">
      {/* Header with photo on the side */}
      <div className="flex items-start gap-5 mb-6 pb-4 border-b-4 border-purple-600">
        <div className="flex-1">
          <h1 className="text-4xl font-serif font-bold text-purple-800 mb-1 leading-tight">
            {data.firstName} {data.lastName}
          </h1>
          {firstJob && (
            <p className="text-xl text-purple-600 italic mb-2">{firstJob.jobTitle}</p>
          )}
        </div>
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-28 h-28 rounded object-cover border-4 border-purple-600 shadow-lg"
          />
        )}
      </div>
      
      {/* Contact bar */}
      <div className="bg-purple-100 -mx-10 px-10 py-2 mb-6 flex justify-around text-xs text-gray-700 flex-wrap gap-2">
        {data.email && <span className="flex items-center gap-1">✉ {data.email}</span>}
        {data.phone && <span className="flex items-center gap-1">☎ {data.countryCode} {data.phone}</span>}
        {data.location && <span className="flex items-center gap-1">📍 {data.location}</span>}
      </div>
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-2xl font-serif font-bold text-purple-800 mb-2">
            Resumo Profissional
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm italic border-l-4 border-purple-300 pl-3">
            {data.summary}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-6 flex-1">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 flex flex-col">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-2xl font-serif font-bold text-purple-800 mb-3">
                Experiência Profissional
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="bg-white p-4 rounded shadow-md border-t-4 border-purple-600">
                    <h3 className="text-base font-bold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-purple-600 font-semibold text-sm mb-1">{exp.company}</p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-xs text-gray-500 mb-2">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
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
              <h2 className="text-2xl font-serif font-bold text-purple-800 mb-3">
                Formação Acadêmica
              </h2>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-white p-4 rounded shadow-md border-t-4 border-purple-600">
                    <h3 className="text-base font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-purple-600 font-semibold text-sm mb-1">{edu.institution}</p>
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
              <h2 className="text-2xl font-serif font-bold text-purple-800 mb-3">
                Projetos
              </h2>
              <div className="space-y-2">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="bg-white p-3 rounded shadow-sm">
                    <h3 className="text-sm font-bold text-gray-800">{proj.name}</h3>
                    {proj.description && (
                      <p className="text-gray-700 text-xs">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - Skills, Languages, Certifications */}
        <div>
          {data.skills.length > 0 && (
            <div className="mb-5">
              <h2 className="text-2xl font-serif font-bold text-purple-800 mb-3">
                Habilidades
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="bg-purple-600 text-white px-3 py-1.5 rounded shadow text-center text-xs font-semibold">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="mb-5">
              <h2 className="text-2xl font-serif font-bold text-purple-800 mb-3">
                Idiomas
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
              <h2 className="text-2xl font-serif font-bold text-purple-800 mb-3">
                Certificações
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
