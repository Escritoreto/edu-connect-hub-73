import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none p-16 flex flex-col" id="cv-preview">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-6xl font-light text-gray-800 mb-2">
              {data.firstName}
            </h1>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              {data.lastName}
            </h1>
            {firstJob && (
              <p className="text-lg text-gray-600 font-light tracking-wide uppercase">
                {firstJob.jobTitle}
              </p>
            )}
          </div>
          {data.photoPreview && (
            <img 
              src={data.photoPreview} 
              alt="Profile" 
              className="w-28 h-28 object-cover grayscale"
            />
          )}
        </div>
        
        <div className="h-px bg-gray-300 my-6"></div>
        
        <div className="flex gap-8 text-sm text-gray-600 font-light">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.countryCode} {data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed font-light text-lg">
            {data.summary}
          </p>
        </div>
      )}
      
      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-6">
            Experiência
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">{exp.jobTitle}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-sm text-gray-500 font-light">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3 font-light">{exp.company}</p>
                {exp.responsibilities && (
                  <p className="text-gray-700 leading-relaxed font-light">
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
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-6">
            Formação
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">{edu.degree}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-sm text-gray-500 font-light">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Cursando'}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 font-light">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-6">
            Habilidades
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-2 border border-gray-300 text-gray-700 font-light text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Spacer */}
      <div className="flex-grow" />
    </div>
  );
};
