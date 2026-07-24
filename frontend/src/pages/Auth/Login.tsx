import { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Ticket, ArrowRight, Loader2, Sparkles } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      toast.success(res.data.message || "Welcome back!", { 
        style: { background: '#10B981', color: '#FFF', borderRadius: '12px' } 
      });
      
      if (res.data.user.role === 'ADMIN' || res.data.user.role === 'SUPER_ADMIN') {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login Failed", { 
        style: { background: '#EF4444', color: '#FFF', borderRadius: '12px' } 
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#090D16] text-white p-4 sm:p-6 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Ticket Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 mb-4">
            <Ticket className="w-7 h-7 text-white -rotate-12" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Event Pass Portal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Welcome Back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to manage and claim your event tickets</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase mb-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="email"
                placeholder="developer@example.com"
                {...register("email", { required: "Email is required" })}
                className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-500/80 focus:border-red-500 ring-2 ring-red-500/20' 
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-700'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.email?.message as string}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-11 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                  errors.password 
                    ? 'border-red-500/80 focus:border-red-500 ring-2 ring-red-500/20' 
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-700'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.password?.message as string}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-300 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Log in to Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline">
            Sign up now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;