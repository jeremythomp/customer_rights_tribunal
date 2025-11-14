import Image from "next/image";
import { Shield } from "lucide-react";

export function RegisterHero() {
  return (
    <div className="flex flex-col justify-center bg-primary/5 p-8 md:p-12 lg:p-16 dark:bg-primary/10">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 text-primary">
        <div className="inline-flex items-center gap-3 text-primary">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Trusted Registration
          </span>
        </div>
        <div className="flex flex-col gap-3 text-foreground">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Create Your Secure Account
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Register to file and manage complaints, track case progress, and
            communicate securely with the tribunal. Your information is protected
            with the highest security standards.
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-primary/20 bg-white shadow-sm dark:border-primary/30 dark:bg-primary/5">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkrvmWvJhODDUp8xb_Dw3mRHmda-XtlAgDMsacaXz088ElCX_BF1--0GLaT5R5B8Zj_4tEDYwg7AnlArKTMdTZy7pXRE_NId-jU3wgrMWbgbNsL-y5WjFUK938ecIP0QoRqKMCBSZ0dNiC4JhvSvsDvsak5P2gNXl6zNfdPlrRdsu0GUMHmhvtDq3NejETyi89b8U9XxjI4W7fhZvU4vwDovvbrYElXS6ulZCx2msqZLGrtfaNWK3bRATXyBazaFYc7B6eW_v3tK4"
            alt="Illustration representing account security and trust."
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




