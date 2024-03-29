import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";

const auth = getAuth(); // Initialize your Firebase auth instance here

const requireAuth = (handler) => async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if user is authenticated
  const user = auth.currentUser;
  if (!user) {
    // If user is not authenticated, return unauthorized response
    return res.status(401).json({ error: "Unauthorized" });
  }

  // If user is authenticated, proceed to the main handler
  return handler(req, res);
};

export default requireAuth;
