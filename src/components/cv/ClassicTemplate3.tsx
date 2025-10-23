import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ClassicTemplate3 = ({ data }: Props) => {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl p-12" id="cv-preview">
      {/* Header */}
      <div className="text-center border-b-4 border-green-800 pb-6 mb-8">
        <h1 className="text-5xl font-serif font-bold text-green-800 mb-2">
          {data.firstName} {data.lastName}
        </h1>
        {data.jobTitle && (
          <p className="text-xl text-gray-600 italic mb-4">{data.jobTitle}</p>
        )}
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.countryCode} {data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      
      {/* Photo - centered below header */}
      {data.photoPreview && (
        <div className="flex justify-center mb-8">
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-green-300"
          />
        </div>
      )}
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-green-800 mb-3 uppercase tracking-wide">
            Resumo Profissional
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {data.jobTitle && data.company && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-green-800 mb-4 uppercase tracking-wide">
            Experiência Profissional
          </h2>
          <div className="border-l-4 border-green-300 pl-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">{data.jobTitle}</h3>
              <p className="text-gray-600 italic mb-2">{data.company}</p>
              {(data.expStartDate || data.expEndDate) && (
                <p className="text-sm text-gray-500 mb-3">
                  {data.expStartDate && new Date(data.expStartDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {data.expEndDate ? new Date(data.expEndDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                </p>
              )}
              {data.responsibilities && (
                <p className="text-gray-700 leading-relaxed text-justify">{data.responsibilities}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Education */}
      {data.degree && data.institution && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-green-800 mb-4 uppercase tracking-wide">
            Formação Acadêmica
          </h2>
          <div className="border-l-4 border-green-300 pl-6">
            <h3 className="text-xl font-bold text-gray-800">{data.degree}</h3>
            <p className="text-gray-600 italic mb-2">{data.institution}</p>
            {(data.startDate || data.endDate) && (
              <p className="text-sm text-gray-500">
                {data.startDate && new Date(data.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {data.endDate ? new Date(data.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif font-bold text-green-800 mb-4 uppercase tracking-wide">
            Habilidades
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-800 rounded-full mr-3"></span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};