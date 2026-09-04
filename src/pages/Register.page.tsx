import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import loginImage from "@/assets/CodexImage.png";
import { register } from "@/services/auth.service";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await register(formData);
      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      navigate("/dashboard");
    } catch (err: any) {
      // Show detailed error message from backend
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.message) {
        errorMessage = err.message;
      }
      if (err.errors) {
        // If backend returns field-specific errors
        const errorList = Object.values(err.errors).flat().join(", ");
        errorMessage = errorList || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-6 sm:p-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid-cols-2">
        
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-sm">

            <Card className="border-none py-0 shadow-none ring-0">
              <CardHeader className="px-0">
                <CardTitle className="text-xl font-bold leading-tight text-slate-900 sm:text-[2.75rem]">
                  Create an account
                </CardTitle>
                {/* <CardDescription className="pt-3 text-sm text-slate-500">
                  Hey, welcome back to your special place
                </CardDescription> */}
              </CardHeader>

              <CardContent className="mt-6 space-y-4 px-0">
                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="mb-1 block text-sm font-medium text-slate-700">
                      Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password_confirmation" className="mb-1 block text-sm font-medium text-slate-700">
                      Confirm Password
                    </Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                      className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-10 w-full rounded-lg bg-violet-600 text-sm font-semibold hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="mt-6 flex-col items-stretch gap-6 px-0">
                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-violet-600 hover:text-violet-700"
                  >
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="hidden bg-linear-to-br from-violet-300 via-purple-500 to-purple-700 lg:block">
          <img
            src={loginImage}
            alt="login page image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
