import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ClassicTemplate3 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl p-12 overflow-hidden flex flex-col" id="cv-preview">
      {/* Header - Left aligned with vertical accent */}
      <div className="flex gap-4 mb-8 pb-6 border-b-2 border-green-200">
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-24 h-24 rounded object-cover border-2 border-green-600"
          />
        )}
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-green-800 mb-1">
            {data.firstName} {data.lastName}
          </h1>
          {firstJob && (
            <p className="text-xl text-green-600 mb-3">{firstJob.jobTitle}</p>
          )}
          <div className="flex gap-4 text-sm text-gray-600">
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>☎ {data.countryCode} {data.phone}</span>}
            {data.location && <span>📍 {data.location}</span>}
          </div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="flex gap-8">
        {/* Left Column */}
        <div className="w-2/3 space-y-6">
          {/* Summary */}
          {data.summary && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-1 bg-green-600"></span>
                PERFIL
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-green-600"></span>
                EXPERIÊNCIA
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-green-300">
                    <div className="absolute -left-2 top-0 w-3 h-3 bg-green-600 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-green-600 font-semibold mb-1">{exp.company}</p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-sm text-gray-500 mb-2">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                      </p>
                    )}
                    {exp.responsibilities && (
                      <p className="text-gray-700 leading-relaxed text-justify">{exp.responsibilities}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-green-600"></span>
                FORMAÇÃO
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2 border-green-300">
                    <div className="absolute -left-2 top-0 w-3 h-3 bg-green-600 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-green-600 font-semibold mb-1">{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-sm text-gray-500">
                        {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Skills */}
        <div className="w-1/3">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-1 bg-green-600"></span>
                SKILLS
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="bg-green-50 border-l-4 border-green-600 px-3 py-2">
                    <span className="text-gray-700 text-sm">{skill}</span>
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