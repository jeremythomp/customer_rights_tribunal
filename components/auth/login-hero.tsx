import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export function LoginHero() {
  return (
    <div className="flex flex-col justify-center bg-primary/5 p-8 md:p-12 lg:p-16 dark:bg-primary/10">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 text-primary">
        <div className="inline-flex items-center gap-3 text-primary">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Secure Portal
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Secure Portal Access
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Log in to manage your case, submit documents, and communicate with
            the tribunal securely. Your information is protected with
            industry-leading safeguards.
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-primary/20 bg-white shadow-sm dark:border-primary/30 dark:bg-primary/5">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkrvmWvJhODDUp8xb_Dw3mRHmda-XtlAgDMsacaXz088ElCX_BF1--0GLaT5R5B8Zj_4tEDYwg7AnlArKTMdTZy7pXRE_NId-jU3wgrMWbgbNsL-y5WjFUK938ecIP0QoRqKMCBSZ0dNiC4JhvSvsDvsak5P2gNXl6zNfdPlrRdsu0GUMHmhvtDq3NejETyi89b8U9XxjI4W7fhZvU4vwDovvbrYElXS6ulZCx2msqZLGrtfaNWK3bRATXyBazaFYc7B6eW_v3tK4"
            alt="Illustration of a person interacting with a secure digital interface, symbolizing user empowerment and data security."
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

