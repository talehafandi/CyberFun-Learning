import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LeaderboardService {
    constructor(@InjectModel(User.name) private readonly repo: Model<User>) { }

    async refresh() {
        try {
            const aggregate: any[] = [
                // find rank of each document and ouput it
                {
                    $setWindowFields: {
                        sortBy: { totalScore: -1 },
                        output: { rank: { $denseRank: {} } }
                    },
                },
                // find next user of each user by totalScore
                {
                    $lookup: {
                        from: "users",
                        let: { foreignTotalScore: "$totalScore" },
                        pipeline: [
                            // filter out docs with less totalScore
                            { $match: { $expr: { $gt: ["$totalScore", "$$foreignTotalScore"] } } },
                            // sort descending order and limit to 1 to pick only next document
                            { $sort: { totalScore: 1 } },
                            { $limit: 1 },
                            { $project: { _id: 1 } }
                        ],
                        as: "nextUser"
                    }
                },
                // write next user id to nextUser field in each document (except top1)
                {
                    $set: {
                        nextUser: { $arrayElemAt: ["$nextUser._id", 0] }
                    }
                },
                // merge output of prev stage with the document
                {
                    $merge: {
                        into: "users",
                        on: "_id",
                        whenMatched: "replace"
                    }
                }
            ]
            await this.repo.aggregate(aggregate);

            return { message: "List updated successfully" }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    async list(limit: number, offset: number): Promise<User> {
        return this.repo
            .find({}, { rank: 1, username: 1, totalScore: 1, avatar: 1 })
            .sort({ totalScore: -1 })
            .limit(limit)
            .skip(offset)
            .exec() as unknown as User;
    }
}
