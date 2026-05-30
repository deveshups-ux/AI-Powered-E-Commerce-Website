import User from "../model/userModel.js";

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `currentUser error ${error}` });
  }
};

export const getAdmin = async (req, res) => {
  try {
    let adminEmail = req.adminEmail;
    if (!adminEmail) {
      return res.status(400).json({ message: " Admin Not Found" });
    }
    return res.status(200).json({
      email: adminEmail,
      role: "admin",
    });
  } catch (error) {
    return res.status(500).json({ message: "get admin error", error });
  }
};
