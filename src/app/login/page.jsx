// src/app/login/page.jsx

import { Suspense } from "react";
import LoginPageClient from "./LoginPageClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
      <LoginPageClient />
    </Suspense>
  );
}
