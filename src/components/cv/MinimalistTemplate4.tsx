import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate4 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none flex" id="cv-preview">
      {/* Left accent bar */}
      <div className="w-2 bg-gradient-to-b from-purple-600 to-purple-400"></div>
      
      <div className="flex-1 p-16 flex flex-col">
        {/* Header with photo inline */}
        <div className="flex items-center gap-6 mb-10">
          {data.photoPreview && (
            <img 
              src={data.photoPreview} 
              alt="Profile" 
              className="w-28 h-28 rounded object-cover grayscale"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-extralight text-purple-900">
              {data.firstName}
            </h1>
            <h1 className="text-5xl font-bold text-purple-900 mb-2">
              {data.lastName}
            </h1>
            {firstJob && (
              <p className="text-base text-purple-600 font-light tracking-wider">
                {firstJob.jobTitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Contact */}
        <div className="mb-10 pb-6 border-b border-purple-200">
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 font-light">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.countryCode} {data.phone}</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </div>
        
        {/* Summary */}
        {data.summary && (
          <div className="mb-10">
            <p className="text-gray-700 leading-relaxed font-light text-base border-l-4 border-purple-400 pl-6">
              {data.summary}
            </p>
          </div>
        )}
        
        {/* Timeline style content */}
        <div className="space-y-10">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-4">Experiência Profissional</p>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute left-0 top-0 w-3 h-3 bg-purple-600 rounded-full"></div>
                    <div className="pl-8">
                      <h3 className="text-xl font-semibold text-purple-800">{exp.jobTitle}</h3>
                      <p className="text-purple-600 mb-2 font-light">{exp.company}</p>
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-sm text-gray-500 font-light mb-3">
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                        </p>
                      )}
                      {exp.responsibilities && (
                        <p className="text-gray-700 leading-relaxed font-light text-sm">
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
              <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-4">Formação Acadêmica</p>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id} className="relative">
                    <div className="absolute left-0 top-0 w-3 h-3 bg-purple-600 rounded-full"></div>
                    <div className="pl-8">
                      <h3 className="text-xl font-semibold text-purple-800">{edu.degree}</h3>
                      <p className="text-purple-600 font-light mb-2">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-sm text-gray-500 font-light">
                          {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-4">Habilidades</p>
              <div className="relative">
                <div className="absolute left-0 top-0 w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="pl-8">
                  <div className="grid grid-cols-2 gap-2">
                    {data.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="text-gray-700 font-light text-sm py-1"
                      >
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Spacer */}
        <div className="flex-grow" />
      </div>
    </div>
  );
};
