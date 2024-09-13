const errorlogControllers = {};
const ErrorLog = require("../models/ErrorLog");
const dayjs = require("dayjs");

errorlogControllers.errorsave = async (req, res) => {
  try {
    const errorLog = new ErrorLog(req.body);

    const result = await errorLog.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

errorlogControllers.errorget = async (req, res) => {
  try {
    const { page, pageSize, search, startDate, endDate } = req.query;
    const startFormatDate = dayjs(startDate).toDate();
    const endFormatDate = dayjs(endDate).toDate();

    const searchQuery = {
      ...(search.length > 0 && {
        $or: [
          { stackTrace: { $regex: new RegExp(search, "gi") } },
          { userId: { $eq: search } },
          { _id: { $eq: search } },
        ],
      }),
      ...(startDate &&
        endDate && {
          createdAt: {
            $gte: startFormatDate,
            $lte: endFormatDate,
          },
        }),
    };

    const [errorList, rowCount] = await Promise.all([
      ErrorLog.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(page * pageSize)
        .limit(pageSize),
      ErrorLog.countDocuments(searchQuery),
    ]);

    const dataArray = errorList.map((e) => ({
      ...e._doc,
      createdAt: dayjs(e.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: dayjs(e.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    }));

    res.status(200).json({ dataArray, rowCount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = errorlogControllers;
