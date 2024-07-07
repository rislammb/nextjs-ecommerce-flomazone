import NextAuth from "next-auth";
import { authOptions } from "@/lib/configs";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
