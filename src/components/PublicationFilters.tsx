import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PublicationFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  countryFilter: string;
  setCountryFilter: (country: string) => void;
  areaFilter: string;
  setAreaFilter: (area: string) => void;
  onSearch: () => void;
}

const PublicationFilters = ({
  searchQuery,
  setSearchQuery,
  countryFilter,
  setCountryFilter,
  areaFilter,
  setAreaFilter,
  onSearch,
}: PublicationFiltersProps) => {
  return (
    <div className="bg-background rounded-xl p-6 shadow-elegant">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
            />
          </div>
        </div>
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="País" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os países</SelectItem>
            <SelectItem value="Brasil">Brasil</SelectItem>
            <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
            <SelectItem value="Reino Unido">Reino Unido</SelectItem>
            <SelectItem value="Alemanha">Alemanha</SelectItem>
            <SelectItem value="Canadá">Canadá</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="hero" className="w-full" onClick={onSearch}>
          Buscar
        </Button>
      </div>
      {areaFilter && (
        <div className="mt-4">
          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as áreas</SelectItem>
              <SelectItem value="Tecnologia">Tecnologia</SelectItem>
              <SelectItem value="Saúde">Saúde</SelectItem>
              <SelectItem value="Engenharia">Engenharia</SelectItem>
              <SelectItem value="Administração">Administração</SelectItem>
              <SelectItem value="Educação">Educação</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default PublicationFilters;
