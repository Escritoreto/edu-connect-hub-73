import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("user_favorites")
      .select("publication_id")
      .eq("user_id", user.id);

    if (!error && data) {
      setFavorites(data.map((fav) => fav.publication_id));
    }
    setLoading(false);
  };

  const toggleFavorite = async (publicationId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para salvar seus favoritos",
        variant: "destructive",
      });
      return;
    }

    const isFavorited = favorites.includes(publicationId);

    if (isFavorited) {
      // Remove favorite
      const { error } = await supabase
        .from("user_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("publication_id", publicationId);

      if (!error) {
        setFavorites(favorites.filter((id) => id !== publicationId));
        toast({
          title: "Removido dos favoritos",
        });
      }
    } else {
      // Add favorite
      const { error } = await supabase
        .from("user_favorites")
        .insert({ user_id: user.id, publication_id: publicationId });

      if (!error) {
        setFavorites([...favorites, publicationId]);
        toast({
          title: "Adicionado aos favoritos",
        });
      }
    }
  };

  const isFavorited = (publicationId: string) => {
    return favorites.includes(publicationId);
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorited,
    fetchFavorites,
  };
}
