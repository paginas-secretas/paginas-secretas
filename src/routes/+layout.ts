import { dev } from '$app/environment';

export const prerender = !dev;

// Disable SSR completely for two reasons: we build for CSR and this also fixes hot-reload getting
// stuck on cyclic dependencies files
export const ssr = false;
