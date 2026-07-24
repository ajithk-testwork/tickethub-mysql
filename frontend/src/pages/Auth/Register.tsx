import { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../api/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Eye, EyeOff, Ticket, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface RegisterForm {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await API.post("/auth/register", data);
      await Swal.fire({
        title: "Account Created!",
        text: res.data.message || "Welcome to EventCenter. Ready to book your first event!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: '#0F172A',
        color: '#FFFFFF',
        iconColor: '#10B981',
        customClass: {
          popup: 'rounded-3xl border border-slate-800 shadow-2xl'
        }
      });
      reset();
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration Failed", { 
        style: { background: '#EF4444', color: '#FFF', borderRadius: '12px' } 
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#090D16] text-white p-4 sm:p-6 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden my-8"
      >
        {/* Ticket Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
            <Ticket className="w-7 h-7 text-white -rotate-12" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Join PassVerse
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Create Account</h1>
          <p className="text-slate-400 text-sm mt-1">Unlock instant booking for live concerts & events</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Ajith K"
                {...register("name", { required: "Name is required" })}
                className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                  errors.name 
                    ? 'border-red-500/80 focus:border-red-500 ring-2 ring-red-500/20' 
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 hover:border-slate-700'
                }`}
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="email"
                placeholder="developer@example.com"
                {...register("email", { required: "Email is required" })}
                className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-500/80 focus:border-red-500 ring-2 ring-red-500/20' 
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 hover:border-slate-700'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase mb-1.5">
              Phone Number
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="1234567890"
                maxLength={10}
                onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10); }}
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Must be exactly 10 digits" },
                })}
                className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                  errors.phoneNumber 
                    ? 'border-red-500/80 focus:border-red-500 ring-2 ring-red-500/20' 
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 hover:border-slate-700'
                }`}
              />
            </div>
            {errors.phoneNumber && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.phoneNumber.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters required" },
                })}
                className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                  errors.password 
                    ? 'border-red-500/80 focus:border-red-500 ring-2 ring-red-500/20' 
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 hover:border-slate-700'
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
            {errors.password && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-3 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Create PassVerse Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors underline-offset-4 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;