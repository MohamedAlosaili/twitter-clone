import User from "../models/User.js";
import Tweet from "../models/Tweet.js";
import ErrorResponse from "../utils/errorResponse.js";
import lookup from "../utils/lookup.js";

// @desc    Search for all tweets
// @route   GET /api/search?q=search text&type=tweets
// access   Public
export const search = (req, res, next) => {
  const { q: query, type } = req.query;

  if (!type) {
    return next(
      new ErrorResponse("Type is missing. Provide a search type", 400)
    );
  }

  if (!query) {
    return next(
      new ErrorResponse("Query is missing. Provide a search query", 400)
    );
  }

  // Not doing this will add filters to advancedResults filters
  delete req.query.q;
  delete req.query.type;

  const authorIdLookup = [
    lookup("users", "authorId", "_id", "authorId", [
      { $project: { name: 1, username: 1, avatar: 1 } },
    ]),
    { $unwind: "$authorId" },
  ];

  switch (type) {
    case "tweets":
      tweetsSearch(req, query, authorIdLookup);
      break;
    case "users":
      usersSearch(req, query);
      break;
    case "media":
      mediaSearch(req, query, authorIdLookup);
      break;
    default:
      return next(new ErrorResponse(`${type} is invalid search type`, 400));
  }

  next();
};

const tweetsSearch = (req, query, authorIdLookup) => {
  const pipeline = [
    ...authorIdLookup,
    {
      $match: {
        $or: [
          { content: { $regex: query, $options: "i" } },
          { "authorId.name": { $regex: query, $options: "i" } },
          { "authorId.username": { $regex: query, $options: "i" } },
        ],
      },
    },
  ];

  req.model = Tweet;
  req.queryMethod = "aggregate";
  req.aggregatePipeline = pipeline;
  req.countDocuments = Tweet.aggregate([...pipeline, { $count: "count" }]);
};

const usersSearch = (req, query) => {
  req.model = User;
  req.queryMethod = "find";
  req.controllerFilters = {
    $or: [
      { name: { $regex: query, $options: "i" } },
      { username: { $regex: query, $options: "i" } },
      { bio: { $regex: query, $options: "i" } },
    ],
  };
};

const mediaSearch = (req, query, authorIdLookup) => {
  const pipeline = [
    ...authorIdLookup,
    {
      $match: {
        $and: [
          { media: { $ne: [] } },
          {
            $or: [
              { content: { $regex: query, $options: "i" } },
              { "authorId.name": { $regex: query, $options: "i" } },
              { "authorId.username": { $regex: query, $options: "i" } },
            ],
          },
        ],
      },
    },
  ];

  req.model = Tweet;
  req.queryMethod = "aggregate";
  req.aggregatePipeline = pipeline;
  req.countDocuments = Tweet.aggregate([...pipeline, { $count: "count" }]);
};
