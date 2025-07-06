"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, you are being redirected...");
          },
          onError: (error) => {
            toast.error(`Internal Server Error`);
          },
        },
      });
    });
  };

  const signInWithEmail = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification code sent to your email");
            router.push(`/verify-email?email=${email}`);
          },
          onError: () => {
            toast.error(`Error sending verification code`);
          },
        },
      });
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>
          Login with your Github or Email account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button
          onClick={signInWithGithub}
          disabled={githubPending}
          className="w-full"
          variant={"outline"}
        >
          {githubPending ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" /> Sign in with Github
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Send className="size-4 mr-2" />
                Continue with Email
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
