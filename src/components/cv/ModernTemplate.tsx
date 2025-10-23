import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ModernTemplate = ({ data }: Props) => {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl overflow-hidden" id="cv-preview">
      <div className="flex h-full">
        {/* Left Sidebar - Accent Color */}
        <div className="w-2/5 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6">
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
            <h3 className="text-lg font-bold mb-3 border-b-2 border-white/30 pb-2">Contato</h3>
            <div className="space-y-2 text-sm">
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
          {skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 border-b-2 border-white/30 pb-2">Habilidades</h3>
              <div className="space-y-1.5">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white/20 rounded px-2.5 py-1.5 text-xs">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Content */}
        <div className="w-3/5 p-6 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="mb-5">
              <h1 className="text-3xl font-bold text-blue-600 mb-1">
                {data.firstName} {data.lastName}
              </h1>
              {data.jobTitle && (
                <p className="text-lg text-gray-600">{data.jobTitle}</p>
              )}
            </div>
            
            {/* Summary */}
            {data.summary && (
              <div className="mb-5">
                <h2 className="text-xl font-bold text-blue-600 mb-2 border-b-2 border-blue-200 pb-1">
                  Sobre Mim
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {data.jobTitle && data.company && (
              <div className="mb-5">
                <h2 className="text-xl font-bold text-blue-600 mb-2 border-b-2 border-blue-200 pb-1">
                  Experiência
                </h2>
                <div>
                  <h3 className="text-base font-bold text-gray-800">{data.jobTitle}</h3>
                  <p className="text-gray-600 text-sm mb-1">{data.company}</p>
                  {(data.expStartDate || data.expEndDate) && (
                    <p className="text-xs text-gray-500 mb-2">
                      {data.expStartDate && new Date(data.expStartDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {data.expEndDate ? new Date(data.expEndDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                    </p>
                  )}
                  {data.responsibilities && (
                    <p className="text-gray-700 leading-relaxed text-sm">{data.responsibilities}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Education */}
            {data.degree && data.institution && (
              <div>
                <h2 className="text-xl font-bold text-blue-600 mb-2 border-b-2 border-blue-200 pb-1">
                  Formação
                </h2>
                <div>
                  <h3 className="text-base font-bold text-gray-800">{data.degree}</h3>
                  <p className="text-gray-600 text-sm mb-1">{data.institution}</p>
                  {(data.startDate || data.endDate) && (
                    <p className="text-xs text-gray-500">
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
