import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ModernTemplate = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl overflow-hidden" id="cv-preview">
      <div className="flex h-full">
        {/* Left Sidebar - Accent Color */}
        <div className="w-2/5 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-8">
          {/* Photo */}
          {data.photoPreview && (
            <div className="mb-4">
              <img 
                src={data.photoPreview} 
                alt="Profile" 
                className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 border-b-2 border-white/30 pb-2">Contato</h3>
            <div className="space-y-2.5 text-base">
              {data.email && (
                <div className="break-words">
                  <p className="font-semibold">Email</p>
                  <p className="opacity-90">{data.email}</p>
                </div>
              )}
              {data.phone && (
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="opacity-90">{data.countryCode} {data.phone}</p>
                </div>
              )}
              {data.location && (
                <div>
                  <p className="font-semibold">Localização</p>
                  <p className="opacity-90">{data.location}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-3 border-b-2 border-white/30 pb-2">Habilidades</h3>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="bg-white/20 rounded px-3 py-2 text-base">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Content */}
        <div className="w-3/5 p-8 flex flex-col gap-6">
          <div>
            {/* Header */}
            <div className="mb-5">
              <h1 className="text-4xl font-bold text-blue-600 mb-2">
                {data.firstName} {data.lastName}
              </h1>
              {firstJob && (
                <p className="text-2xl text-gray-600">{firstJob.jobTitle}</p>
              )}
            </div>
            
            {/* Summary */}
            {data.summary && (
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-blue-600 mb-2 border-b-2 border-blue-200 pb-1">
                  Sobre Mim
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-blue-600 mb-2 border-b-2 border-blue-200 pb-1">
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
                <h2 className="text-2xl font-bold text-blue-600 mb-2 border-b-2 border-blue-200 pb-1">
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
