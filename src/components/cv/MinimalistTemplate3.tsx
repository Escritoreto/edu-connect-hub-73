import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate3 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none p-12 flex flex-col" id="cv-preview">
      {/* Centered minimalist header */}
      <div className="text-center mb-8">
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover mx-auto mb-3 grayscale opacity-80"
          />
        )}
        <h1 className="text-3xl font-light text-emerald-900 tracking-wide">
          {data.firstName} {data.lastName}
        </h1>
        <div className="w-12 h-px bg-emerald-400 mx-auto my-2"></div>
        {firstJob && (
          <p className="text-xs text-emerald-600 uppercase tracking-widest font-light">
            {firstJob.jobTitle}
          </p>
        )}
        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-3 font-light flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.countryCode} {data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-6 text-center">
          <p className="text-gray-700 leading-relaxed font-light italic max-w-2xl mx-auto text-sm">
            "{data.summary}"
          </p>
        </div>
      )}
      
      <div className="h-px bg-gray-200 my-5"></div>
      
      {/* Skills as badges */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-3">
            Competências
          </h2>
          <div className="flex flex-wrap justify-center gap-1.5">
            {data.skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-light rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-3">
            Idiomas
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {data.languages.map((lang) => (
              <span key={lang.id} className="text-xs text-gray-700 font-light">
                {lang.name} ({lang.level})
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="h-px bg-gray-200 my-5"></div>
      
      {/* Experience - centered style */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-4">
            Experiência Profissional
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="max-w-xl mx-auto text-center">
                <h3 className="text-base font-semibold text-emerald-700">{exp.jobTitle}</h3>
                <p className="text-emerald-600 mb-1 font-light text-sm">{exp.company}</p>
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
            ))}
          </div>
        </div>
      )}
      
      {/* Education - centered style */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-4">
            Formação Acadêmica
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="max-w-xl mx-auto text-center">
                <h3 className="text-base font-semibold text-emerald-700">{edu.degree}</h3>
                <p className="text-emerald-600 font-light mb-1 text-sm">{edu.institution}</p>
                {(edu.startDate || edu.endDate) && (
                  <p className="text-xs text-gray-500 font-light">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Projects */}
      <div className="grid grid-cols-2 gap-6">
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-3">
              Certificações
            </h2>
            <div className="space-y-2 text-center">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-medium text-gray-800">{cert.name}</p>
                  <p className="text-xs text-gray-600 font-light">{cert.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-3">
              Projetos
            </h2>
            <div className="space-y-2 text-center">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-sm font-medium text-gray-800">{proj.name}</p>
                  {proj.description && (
                    <p className="text-xs text-gray-600 font-light">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Spacer */}
      <div className="flex-grow" />
    </div>
  );
};
