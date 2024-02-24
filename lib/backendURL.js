export const BACKEND_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000" // localhost
    : "https://ec2-3-22-225-201.us-east-2.compute.amazonaws.com/"; // AWS EC2
