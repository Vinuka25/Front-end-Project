import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import loginImage from "@/assets/CodexImage.png";
import { login } from "@/services/auth.service";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({ email, password });
      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
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
                <CardTitle className="text-3xl font-bold leading-tight text-slate-900 sm:text-[2.75rem]">
                  Hola,
                  <br />
                  Welcome Back
                </CardTitle>
                <CardDescription className="pt-3 text-sm text-slate-500">
                  Hey, welcome back to your special place
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-6 space-y-4 px-0">
                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="password"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        defaultChecked
                        className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm font-normal text-slate-600"
                      >
                        Remember me
                      </Label>
                    </div>

                    <a
                      href="#forgot-password"
                      className="text-sm text-slate-500 transition-colors hover:text-violet-600"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-lg bg-violet-600 text-sm font-semibold hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="mt-6 flex-col items-stretch gap-6 px-0">
                <p className="text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-violet-600 hover:text-violet-700"
                  >
                    Sign Up
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
