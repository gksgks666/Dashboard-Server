const User = require("../models/User");
const Customer = require("../models/Customer");
const dayjs = require("dayjs");
const managementControllers = {};

managementControllers.getUserList = async (req, res) => {
  try {
    const { page, pageSize, search } = req.query;

    const searchQuery =
      search.length > 0
        ? {
            $or: [
              { Name: { $regex: new RegExp(search, "gi") } },
              { Role: { $eq: search } },
            ],
          }
        : {};

    const [userFind, rowCount] = await Promise.all([
      User.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(page * pageSize)
        .limit(pageSize)
        .select("-password"),
      User.countDocuments(searchQuery),
    ]);

    const dataArray = userFind.map((e) => ({
      ...e._doc,
      createdAt: dayjs(e.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    }));
    res.status(200).json({ dataArray, rowCount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

managementControllers.saveRole = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.role = req.body.role;

    const updateUser = await user.save();

    res.status(200).json({ message: "success", updateUser });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

managementControllers.getCustomerList = async (req, res) => {
  try {
    const { page, pageSize, search } = req.query;

    const searchQuery =
      search.length > 0
        ? {
            $or: [
              { Name: { $regex: new RegExp(search, "gi") } },
              { email: { $regex: new RegExp(search, "gi") } },
              { accountstatus: { $eq: search } },
            ],
          }
        : {};

    const [customerFind, rowCount] = await Promise.all([
      Customer.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(page * pageSize)
        .limit(pageSize)
        .select("-password"),
      Customer.countDocuments(searchQuery),
    ]);

    const dataArray = customerFind.map((e) => ({
      ...e._doc,
      createdAt: dayjs(e.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    }));
    res.status(200).json({ dataArray, rowCount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

managementControllers.saveCustomerAccount = async (req, res) => {
  try {
    const customerInfo = await Customer.findById(req.body.userId);
    customerInfo.accountstatus = req.body.accountstatus;

    const updateCustomer = await customerInfo.save();

    res.status(200).json({ message: "success", updateCustomer });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = managementControllers;
