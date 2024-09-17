/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_MAIL_JS_PUBLIC_KEY: string;
  VITE_MAIL_JS_SERVICE_ID: string;
  VITE_MAIL_JS_TEMPLATE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
