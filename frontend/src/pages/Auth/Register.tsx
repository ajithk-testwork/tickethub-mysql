// Register.tsx
import { useForm } from "react-hook-form";
import API from "../../api/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

interface RegisterForm {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await API.post("/auth/register", data);
      await Swal.fire({
        title: "Account Created",
        text: res.data.message || "Welcome to EventCenter.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: '#1E293B', // card
        color: '#FFFFFF',
        iconColor: '#22C55E' // success
      });
      reset();
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration Failed", { 
        style: { background: '#EF4444', color: '#FFF' } 
      });
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
          <h1 className="text-2xl font-bold text-textMain mb-2">Create an account</h1>
          <p className="text-textSecondary text-sm">Enter your details below to get started.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="Ajith K"
              {...register("name", { required: "Name is required" })}
              className={`w-full bg-background border rounded-lg px-4 py-3 text-textMain placeholder-textSecondary/50 outline-none transition-colors ${errors.name ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-borderCol focus:border-primary focus:ring-1 focus:ring-primary'}`}
            />
            {errors.name && <p className="text-error text-xs mt-1.5">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="developer@example.com"
              {...register("email", { required: "Email is required" })}
              className={`w-full bg-background border rounded-lg px-4 py-3 text-textMain placeholder-textSecondary/50 outline-none transition-colors ${errors.email ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-borderCol focus:border-primary focus:ring-1 focus:ring-primary'}`}
            />
            {errors.email && <p className="text-error text-xs mt-1.5">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1.5">Phone Number</label>
            <input
              type="text"
              placeholder="1234567890"
              maxLength={10}
              onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10); }}
              {...register("phoneNumber", {
                required: "Phone Number is required",
                pattern: { value: /^[0-9]{10}$/, message: "Must be exactly 10 digits" },
              })}
              className={`w-full bg-background border rounded-lg px-4 py-3 text-textMain placeholder-textSecondary/50 outline-none transition-colors ${errors.phoneNumber ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-borderCol focus:border-primary focus:ring-1 focus:ring-primary'}`}
            />
            {errors.phoneNumber && <p className="text-error text-xs mt-1.5">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters required" },
              })}
              className={`w-full bg-background border rounded-lg px-4 py-3 text-textMain placeholder-textSecondary/50 outline-none transition-colors ${errors.password ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-borderCol focus:border-primary focus:ring-1 focus:ring-primary'}`}
            />
            {errors.password && <p className="text-error text-xs mt-1.5">{errors.password.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-secondary text-textMain font-medium rounded-lg px-4 py-3 mt-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Sign up"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-textSecondary">
          Already have an account?
          <Link to="/login" className="text-primary font-medium ml-1.5 hover:text-secondary transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;