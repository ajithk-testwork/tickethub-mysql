// Login.tsx
import { useForm } from "react-hook-form";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      toast.success(res.data.message, { style: { background: '#22C55E', color: '#FFF' } });
      
      if (res.data.user.role === 'ADMIN' || res.data.user.role === 'SUPER_ADMIN') {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login Failed", { style: { background: '#EF4444', color: '#FFF' } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-sans p-6 text-textMain">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-card border border-borderCol rounded-2xl p-8 sm:p-10 shadow-2xl"
      >
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-textMain mb-2">Welcome back</h1>
          <p className="text-textSecondary text-sm">Enter your credentials to access your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="developer@example.com"
              {...register("email", { required: "Email is required" })}
              className={`w-full bg-background border rounded-lg px-4 py-3 text-textMain placeholder-textSecondary/50 outline-none transition-colors ${errors.email ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-borderCol focus:border-primary focus:ring-1 focus:ring-primary'}`}
            />
            {errors.email && <p className="text-error text-xs mt-1.5">{errors.email?.message as string}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-textSecondary">Password</label>
              <a href="#" className="text-xs font-medium text-primary hover:text-secondary transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className={`w-full bg-background border rounded-lg px-4 py-3 text-textMain placeholder-textSecondary/50 outline-none transition-colors ${errors.password ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-borderCol focus:border-primary focus:ring-1 focus:ring-primary'}`}
            />
            {errors.password && <p className="text-error text-xs mt-1.5">{errors.password?.message as string}</p>}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-secondary text-textMain font-medium rounded-lg px-4 py-3 mt-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Authenticating..." : "Log in"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-textSecondary">
          Don't have an account?
          <Link to="/register" className="text-primary font-medium ml-1.5 hover:text-secondary transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;