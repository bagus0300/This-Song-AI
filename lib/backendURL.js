export const BACKEND_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000" // localhost
    : "http://3.22.225.201"; // AWS EC2
