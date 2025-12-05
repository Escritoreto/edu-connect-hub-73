import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate2 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl print:shadow-none p-16 flex flex-col" id="cv-preview">
      {/* Compact Header with photo on the right */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-blue-200">
        <div>
          <h1 className="text-5xl font-light text-blue-900 mb-1">
            {data.firstName} <span className="font-bold">{data.lastName}</span>
          </h1>
          {firstJob && (
            <p className="text-lg text-blue-600 font-light uppercase tracking-widest mt-2">
              {firstJob.jobTitle}
            </p>
          )}
        </div>
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-300"
          />
        )}
      </div>
      
      {/* Contact in single line */}
      <div className="flex justify-between text-sm text-gray-600 font-light mb-10 pb-6 border-b border-gray-200">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.countryCode} {data.phone}</span>}
        {data.location && <span>{data.location}</span>}
      </div>
      
      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-12 flex-1">
        {/* Main content */}
        <div className="col-span-2 flex flex-col">
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-3 pb-2 border-b border-blue-200">
                Sobre
              </h2>
              <p className="text-gray-700 leading-relaxed font-light">
                {data.summary}
              </p>
            </div>
          )}
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 pb-2 border-b border-blue-200">
                Experiência
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-lg font-semibold text-blue-700">{exp.jobTitle}</h3>
                    <p className="text-blue-600 mb-1 font-light">{exp.company}</p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-xs text-gray-500 font-light mb-3">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                      </p>
                    )}
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
            <div>
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 pb-2 border-b border-blue-200">
                Formação
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-lg font-semibold text-blue-700">{edu.degree}</h3>
                    <p className="text-blue-600 font-light mb-1">{edu.institution}</p>
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
          
          {/* Spacer */}
          <div className="flex-grow" />
        </div>
        
        {/* Sidebar */}
        <div>
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 pb-2 border-b border-blue-200">
                Habilidades
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="text-gray-700 font-light text-sm py-1 border-l-2 border-blue-400 pl-3"
                  >
                    {skill}
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
