import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ModernTemplate2 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl print:shadow-none" id="cv-preview">
      <div className="flex flex-col min-h-[297mm]">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 flex items-center gap-6">
          {data.photoPreview && (
            <img 
              src={data.photoPreview} 
              alt="Profile" 
              className="w-32 h-32 rounded-lg object-cover border-4 border-white shadow-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2">
              {data.firstName} {data.lastName}
            </h1>
            {firstJob && (
              <p className="text-xl text-white/90 font-light">{firstJob.jobTitle}</p>
            )}
          </div>
        </div>
        
        {/* Two Column Content */}
        <div className="flex flex-1">
          {/* Left Column */}
          <div className="w-1/3 bg-purple-50 p-8 space-y-6">
            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold text-purple-800 mb-3 border-b-2 border-purple-200 pb-2">Contato</h3>
              <div className="space-y-2 text-base text-gray-700">
                {data.email && <p className="break-words">{data.email}</p>}
                {data.phone && <p>{data.countryCode} {data.phone}</p>}
                {data.location && <p>{data.location}</p>}
              </div>
            </div>
            
            {/* Skills */}
            {data.skills.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-purple-800 mb-3 border-b-2 border-purple-200 pb-2">Habilidades</h3>
                <div className="space-y-2">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="bg-purple-50 rounded px-3 py-2 text-base">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div className="w-2/3 p-8 space-y-6">
            {/* Summary */}
            {data.summary && (
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-1">
                  Sobre Mim
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-3 border-b-2 border-purple-200 pb-1">
                  Experiência
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-gray-600 text-lg mb-1">{exp.company}</p>
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-sm text-gray-500 mb-2">
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                        </p>
                      )}
                      {exp.responsibilities && (
                        <p className="text-gray-700 leading-relaxed text-lg">{exp.responsibilities}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-3 border-b-2 border-purple-200 pb-1">
                  Formação
                </h2>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600 text-lg mb-1">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-sm text-gray-500">
                          {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Cursando'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};