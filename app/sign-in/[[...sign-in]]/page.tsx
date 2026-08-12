import { SignIn } from "@clerk/nextjs";
import { PaveMark } from "@/components/pave/logo";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-pave-paper px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <span className="inline-flex text-pave-clay">
            <PaveMark className="w-8 h-8" />
          </span>
          <h1 className="mt-4 font-display text-3xl text-pave-ink">Welcome back</h1>
          <p className="mt-3 text-pave-soft">Pick up where you left off.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <SignIn
            appearance={{
              variables: {
                colorPrimary: "#B4471F",
                colorText: "#17130F",
                colorBackground: "#FFFFFF",
                borderRadius: "0.5rem",
                fontSize: "15px",
              },
              elements: {
                rootBox: "w-full",
                card: "shadow-none border border-pave-line rounded-xl",
                headerTitle: "font-display",
                footerAction: "text-pave-soft",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/auth-redirect"
            fallbackRedirectUrl="/auth-redirect"
          />
        </div>
      </div>
    </div>
  );
}
