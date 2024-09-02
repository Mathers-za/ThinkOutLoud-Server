import { Schema } from "mongoose";
import Posts from "../models/Posts";

export const getAllUsersPosts = async (
  userOrUsersIds: string[] | Schema.Types.ObjectId[],
  page: number = 1,
  pageSize: number = 10
) => {
  console.log("made it into the getallusersposts helper fucntion");
  const offset = (page - 1) * pageSize;
  let postsArray = await Posts.aggregate([
    { $match: { creatorId: { $in: userOrUsersIds } } },

    {
      $lookup: {
        from: "users",
        localField: "creatorId",
        foreignField: "_id",
        as: "creatorDetails",
      },
    },
    { $unwind: "$creatorDetails" },
    { $addFields: { numComments: { $size: "$comments" } } },
    {
      $project: {
        "creatorDetails.hash": 0,
        "creatorDetails.salt": 0,
        "creatorDetails.additionalInfo": 0,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    { $skip: offset },

    { $limit: pageSize },
  ]);

  return postsArray;
};
