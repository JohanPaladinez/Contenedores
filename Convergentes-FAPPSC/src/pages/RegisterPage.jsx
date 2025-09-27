import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/notes");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900">Register</h1>

        {registerErrors.map((error, i) => (
          <div
            key={i}
            className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-700"
          >
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Username"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
            />
            {errors.username && (
              <p className="text-sm text-red-500">Username is required</p>
            )}
          </div>

          <div className="space-y-1.5">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
            />
            {errors.email && (
              <p className="text-sm text-red-500">Email is required</p>
            )}
          </div>

          <div className="space-y-1.5">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
            />
            {errors.password && (
              <p className="text-sm text-red-500">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
