import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/ksa-invoice-generator',
        destination: '/sa',
        permanent: true, // 301 Redirect: مفيد جداً للـ SEO عشان ينقل قوة الصفحة القديمة للجديدة
      },
      {
        source: '/invoice-generator-uae',
        destination: '/ae',
        permanent: true,
      },
    ]
  },
}

export default eslintConfig;
