import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ModernTemplate2 = ({ data }: Props) => {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return (
      <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl overflow-hidden" id="cv-preview">
        <div className="flex flex-col h-full">
          {/* Top Banner - Purple Theme with horizontal layout */}
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
          {data.jobTitle && (
            <p className="text-2xl opacity-90">{data.jobTitle}</p>
          )}
        </div>
      </div>
      
      {/* Two Column Content */}
      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-1/3 bg-purple-50 p-8 space-y-6">
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-purple-800 mb-3 border-b-2 border-purple-300 pb-1">Contato</h3>
            <div className="space-y-2 text-base text-gray-700">
              {data.email && <p className="break-words">{data.email}</p>}
              {data.phone && <p>{data.countryCode} {data.phone}</p>}
              {data.location && <p>{data.location}</p>}
            </div>
          </div>
          
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-purple-800 mb-3 border-b-2 border-purple-300 pb-1">Habilidades</h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-purple-200 rounded px-4 py-2 text-base text-purple-900">
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
              <h2 className="text-2xl font-bold text-purple-800 mb-2 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600"></span>
                Sobre Mim
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {data.jobTitle && data.company && (
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600"></span>
                Experiência
              </h2>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-bold text-gray-800">{data.jobTitle}</h3>
                <p className="text-purple-600 text-lg mb-1 font-semibold">{data.company}</p>
                {(data.expStartDate || data.expEndDate) && (
                  <p className="text-sm text-gray-500 mb-2">
                    {data.expStartDate && new Date(data.expStartDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {data.expEndDate ? new Date(data.expEndDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                  </p>
                )}
                {data.responsibilities && (
                  <p className="text-gray-700 leading-relaxed text-lg">{data.responsibilities}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.degree && data.institution && (
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600"></span>
                Formação
              </h2>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-bold text-gray-800">{data.degree}</h3>
                <p className="text-purple-600 text-lg mb-1 font-semibold">{data.institution}</p>
                {(data.startDate || data.endDate) && (
                  <p className="text-sm text-gray-500">
                    {data.startDate && new Date(data.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {data.endDate ? new Date(data.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Cursando'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        </div>
        </div>
      </div>
  );
};
