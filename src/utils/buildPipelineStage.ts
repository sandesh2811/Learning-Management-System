// Refactor

import "server-only";

import { LIMIT } from "@/constants/Constants";

import mongoose, { PipelineStage } from "mongoose";

interface BuildPipelineStageProps {
    filters: SearchParamsType & URLSearchParams;
}

const buildPipelineStage = ({ filters }: BuildPipelineStageProps) => {
    const filtersObject = Object.fromEntries(filters);
    const { search, duration, language, pageCursor, price, type, priceCursor } =
        filtersObject as SearchParamsType;

    const filtersDBQuery: Record<string, unknown> = {};
    let match: PipelineStage.Match = { $match: {} };
    let sort: Record<string, 1 | -1> = {};

    if (search || type)
        filtersDBQuery.$or = [
            {
                title: {
                    $regex: search || type,
                    $options: "i",
                },
            },
            {
                tags: {
                    $in: [search, type],
                },
            },
        ];

    if (duration)
        filtersDBQuery.duration = {
            $regex: duration,
            $options: "i",
        };

    if (language)
        filtersDBQuery.languagesAvailable = {
            $in: [language],
        };

    const hasFilters = Object.keys(filtersDBQuery).length > 0;

    if (price) {
        const isHighToLow = price.toLowerCase() === "high to low";
        sort = isHighToLow ? { price: -1, _id: -1 } : { price: 1, _id: 1 };

        if (priceCursor && pageCursor) {
            match = {
                $match: {
                    $expr: {
                        $or: [
                            {
                                [isHighToLow ? "$lt" : "$gt"]: [
                                    "$price",
                                    Number(priceCursor),
                                ],
                            },
                            {
                                $and: [
                                    { $eq: ["$price", Number(priceCursor)] },
                                    {
                                        [isHighToLow ? "$lt" : "$gt"]: [
                                            "$_id",
                                            new mongoose.Types.ObjectId(
                                                pageCursor
                                            ),
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    ...filtersDBQuery,
                },
            };
        } else if (hasFilters) {
            match = {
                $match: {
                    ...filtersDBQuery,
                },
            };
        }
    } else if (pageCursor && !hasFilters) {
        match = {
            $match: { _id: { $gt: new mongoose.Types.ObjectId(pageCursor) } },
        };
    } else if (pageCursor && hasFilters) {
        match = {
            $match: {
                _id: { $gt: new mongoose.Types.ObjectId(pageCursor) },
                ...filtersDBQuery,
            },
        };
    } else if (hasFilters) {
        match = {
            $match: filtersDBQuery,
        };
    }

    const basePipeline = [
        match,
        {
            $lookup: {
                // Document to join
                from: "users",
                // Field which helps to match documents
                localField: "authorId",
                // Field to which it is going to map
                foreignField: "_id",
                // New field name
                as: "courseswithuserinfo",
            },
        },
        { $unwind: "$courseswithuserinfo" },
        {
            $project: {
                courseswithuserinfo: {
                    fullname: 1,
                },
                title: 1,
                price: 1,
                coverImage: 1,
                rating: 1,
                tags: 1,
                discount: 1,
            },
        },
    ];

    const pipeline: PipelineStage[] = basePipeline;

    if (sort && Object.keys(sort).length > 0) {
        pipeline.push({ $sort: sort });
    } else {
        pipeline.push({ $sort: { _id: 1, price: 1 } });
    }

    pipeline.push({ $limit: LIMIT + 1 });

    return {
        pipeline,
        priceCursor,
        pageCursor,
    };
};

export default buildPipelineStage;
