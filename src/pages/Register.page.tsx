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

export default function RegisterPage() {
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
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-500">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    defaultValue=""
                    className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-500">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    defaultValue=""
                    className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-500">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue=""
                    className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-500">
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    defaultValue=""
                    className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-slate-500">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    defaultValue=""
                    className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-slate-500">
                    Confirm Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    defaultValue=""
                    className="h-10 rounded-lg border-slate-200 px-4 text-sm focus-visible:border-slate-500 focus-visible:ring-0"
                  />
                </div>

              </CardContent>

              <CardFooter className="mt-6 flex-col items-stretch gap-6 px-0">
                <Button className="h-10 w-full rounded-lg bg-violet-600 text-sm font-semibold hover:bg-violet-700">
                  Sign In
                </Button>

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
