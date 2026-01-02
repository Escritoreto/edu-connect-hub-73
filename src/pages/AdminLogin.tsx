import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, signIn, loading, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checkingAdmin, setCheckingAdmin] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      if (isAdmin) {
        navigate("/admin");
      } else if (checkingAdmin) {
        // User logged in but is not admin
        setCheckingAdmin(false);
        setIsLoading(false);
      }
    }
  }, [user, loading, isAdmin, navigate, checkingAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCheckingAdmin(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setIsLoading(false);
      setCheckingAdmin(false);
    }
    // If no error, wait for useEffect to handle navigation or show error
  };

  // Show message if user is logged in but not admin
  if (user && !loading && !isAdmin && !checkingAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Acesso Negado</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Você não tem permissão de administrador.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                Voltar ao site
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Link to="/" className="flex items-center space-x-2 mb-8 group">
        <Shield className="h-10 w-10 text-amber-400 transition-transform group-hover:scale-110" />
        <span className="text-2xl font-bold text-white">Admin Panel</span>
      </Link>

      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Acesso Administrativo</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Entre com suas credenciais de administrador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Entrar como Admin"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">
              ← Voltar ao site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
