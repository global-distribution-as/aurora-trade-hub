import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Aurora from "@/components/Aurora";
import Logo from "@/components/Logo";

const DEMO_USERS = [
  {
    email: "admin@gdist.no",
    role: "admin",
    label: "Admin",
    description: "Admin Portal",
    path: "/admin/dashboard",
    color: "text-purple-400",
    dot: "bg-purple-400",
  },
  {
    email: "leverandor@gdist.no",
    role: "supplier",
    label: "Leverandør",
    description: "Supplier Portal",
    path: "/supplier/dashboard",
    color: "text-blue-400",
    dot: "bg-blue-400",
  },
  {
    email: "salg@gdist.no",
    role: "buyer",
    label: "Salg",
    description: "Buyer Portal",
    path: "/buyer/dashboard",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
  },
];

const USER_MAP: Record<string, { role: string; path: string }> = {
  "admin@gdist.no": { role: "admin", path: "/admin/dashboard" },
  "leverandor@gdist.no": { role: "supplier", path: "/supplier/dashboard" },
  "salg@gdist.no": { role: "buyer", path: "/buyer/dashboard" },
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectUser = (user: (typeof DEMO_USERS)[number]) => {
    setEmail(user.email);
    setPassword("demo");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const user = USER_MAP[email.toLowerCase()];
    if (!user) {
      setError("Ukjent bruker. Velg en demo-bruker fra listen.");
      setLoading(false);
      return;
    }

    localStorage.setItem("demo_role", user.role);
    navigate(user.path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <Aurora />
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/[0.04] rounded-2xl p-8 border border-white/[0.08]">
          <div className="text-center mb-8">
            <Logo className="h-10 mx-auto mb-4" variant="dark" />
            <h1 className="text-xl font-bold text-foreground">Sign In</h1>
            <p className="text-muted-foreground text-sm mt-1">
              You'll be redirected to your portal
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email with demo user picker */}
            <div>
              <label className="text-muted-foreground text-sm block mb-1.5 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="email@company.com"
              />

              {/* Demo user picker — always visible */}
              <div className="mt-1.5 rounded-xl border border-white/[0.1] bg-white/[0.03] overflow-hidden">
                <p className="px-3 pt-2.5 pb-1 text-[10px] text-white/25 tracking-widest uppercase">
                  Demo-brukere
                </p>
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.email}
                    type="button"
                    onClick={() => selectUser(user)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.06] transition-colors duration-150 text-left"
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${user.dot}`} />
                    <span className="flex-1 min-w-0">
                      <span className={`block text-xs font-semibold ${user.color}`}>
                        {user.label}
                      </span>
                      <span className="block text-[11px] text-white/40 truncate">
                        {user.email}
                      </span>
                    </span>
                    <span className="text-[10px] text-white/20 flex-shrink-0">
                      {user.description}
                    </span>
                  </button>
                ))}
                <div className="h-1.5" />
              </div>
            </div>

            <div>
              <label className="text-muted-foreground text-sm block mb-1.5 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-status-red">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="block w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-center hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 text-sm"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <Link
            to="/"
            className="block text-center text-muted-foreground text-xs mt-6 hover:text-foreground transition-colors duration-150"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
