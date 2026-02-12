import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  publicationId: string;
  variant?: "default" | "icon";
  className?: string;
}

const FavoriteButton = ({ publicationId, variant = "default", className }: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorited } = useFavorites();
  const favorited = isFavorited(publicationId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(publicationId);
  };

  if (variant === "icon") {
    return (
      <button
        data-favorite-button
        onClick={handleClick}
        className={cn(
          "p-2 rounded-full hover:bg-muted transition-colors",
          className
        )}
        aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-all",
            favorited ? "fill-primary text-primary" : "text-muted-foreground"
          )}
        />
      </button>
    );
  }

  return (
    <Button
      data-favorite-button
      variant={favorited ? "default" : "outline"}
      size="sm"
      onClick={handleClick}
      className={className}
    >
      <Heart
        className={cn(
          "h-4 w-4 mr-2",
          favorited && "fill-current"
        )}
      />
      {favorited ? "Salvo" : "Salvar"}
    </Button>
  );
};

export default FavoriteButton;
