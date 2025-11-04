import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ClassicTemplate2 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl p-12 overflow-hidden flex flex-col" id="cv-preview">
      {/* Header */}
      <div className="text-center border-b-4 border-blue-800 pb-6 mb-8">
        <h1 className="text-5xl font-serif font-bold text-blue-800 mb-2">
          {data.firstName} {data.lastName}
        </h1>
        {firstJob && (
          <p className="text-xl text-gray-600 italic mb-4">{firstJob.jobTitle}</p>
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
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300"
          />
        </div>
      )}
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-blue-800 mb-3 uppercase tracking-wide">
            Resumo Profissional
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-blue-800 mb-4 uppercase tracking-wide">
            Experiência Profissional
          </h2>
          <div className="border-l-4 border-blue-300 pl-6 space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                <p className="text-gray-600 italic mb-2">{exp.company}</p>
                {(exp.startDate || exp.endDate) && (
                  <p className="text-sm text-gray-500 mb-3">
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
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-blue-800 mb-4 uppercase tracking-wide">
            Formação Acadêmica
          </h2>
          <div className="border-l-4 border-blue-300 pl-6 space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600 italic mb-2">{edu.institution}</p>
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
      
      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif font-bold text-blue-800 mb-4 uppercase tracking-wide">
            Habilidades
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-800 rounded-full mr-3"></span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};