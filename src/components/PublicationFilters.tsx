import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PublicationFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  countryFilter: string;
  setCountryFilter: (country: string) => void;
  areaFilter: string;
  setAreaFilter: (area: string) => void;
  scholarshipTypeFilter?: string;
  setScholarshipTypeFilter?: (type: string) => void;
  studyLevelFilter?: string;
  setStudyLevelFilter?: (level: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  onSearch?: () => void;
}

const PublicationFilters = ({
  searchQuery,
  setSearchQuery,
  countryFilter,
  setCountryFilter,
  areaFilter,
  setAreaFilter
}: PublicationFiltersProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      








      
      <div className="flex gap-3">
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="bg-card text-foreground border border-border">
            <SelectValue placeholder="Todos os países" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-foreground border border-border z-50">
            <SelectItem value="all">Todos os países</SelectItem>
            <SelectItem value="Canadá">Canadá</SelectItem>
            <SelectItem value="Turquia">Turquia</SelectItem>
            <SelectItem value="China">China</SelectItem>
            <SelectItem value="Índia">Índia</SelectItem>
            <SelectItem value="Brasil">Brasil</SelectItem>
            <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
            <SelectItem value="Reino Unido">Reino Unido</SelectItem>
            <SelectItem value="Alemanha">Alemanha</SelectItem>
          </SelectContent>
        </Select>

        <Select value={areaFilter} onValueChange={setAreaFilter}>
          <SelectTrigger className="bg-card text-foreground border border-border">
            <SelectValue placeholder="Todas as áreas" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-foreground border border-border z-50">
            <SelectItem value="all">Todas as áreas</SelectItem>
            <SelectItem value="Tecnologia">Tecnologia</SelectItem>
            <SelectItem value="Saúde">Saúde</SelectItem>
            <SelectItem value="Engenharia">Engenharia</SelectItem>
            <SelectItem value="Administração">Administração</SelectItem>
            <SelectItem value="Educação">Educação</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>);

};

export default PublicationFilters;