import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ModernTemplate = ({ data }: Props) => {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl" id="cv-preview">
      <div className="flex">
        {/* Left Sidebar - Accent Color */}
        <div className="w-2/5 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-8">
          {/* Photo */}
          {data.photoPreview && (
            <div className="mb-6">
              <img 
                src={data.photoPreview} 
                alt="Profile" 
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-white/30 pb-2">Contato</h3>
            <div className="space-y-3 text-sm">
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
              <h3 className="text-xl font-bold mb-4 border-b-2 border-white/30 pb-2">Habilidades</h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white/20 rounded px-3 py-2 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Content */}
        <div className="w-3/5 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">
              {data.firstName} {data.lastName}
            </h1>
            {data.jobTitle && (
              <p className="text-xl text-gray-600">{data.jobTitle}</p>
            )}
          </div>
          
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">
                Sobre Mim
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {data.jobTitle && data.company && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">
                Experiência
              </h2>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">{data.jobTitle}</h3>
                <p className="text-gray-600 mb-2">{data.company}</p>
                {(data.expStartDate || data.expEndDate) && (
                  <p className="text-sm text-gray-500 mb-2">
                    {data.expStartDate && new Date(data.expStartDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {data.expEndDate ? new Date(data.expEndDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                  </p>
                )}
                {data.responsibilities && (
                  <p className="text-gray-700 leading-relaxed">{data.responsibilities}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.degree && data.institution && (
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">
                Formação
              </h2>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{data.degree}</h3>
                <p className="text-gray-600 mb-2">{data.institution}</p>
                {(data.startDate || data.endDate) && (
                  <p className="text-sm text-gray-500">
                    {data.startDate && new Date(data.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {data.endDate ? new Date(data.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
