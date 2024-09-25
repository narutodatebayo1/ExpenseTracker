import dbConnect from "../../../../lib/dbConnect";
import Expense from "../../../../models/Expense";
import Models from "../../../../models/Models";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {

    const { User, ExpenseType, Expense } = Models()

    await dbConnect()

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');
    const expenseTypeId = searchParams.get('expense_type_id');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const timezone = searchParams.get('timezone');
    const groupBy = searchParams.get('group_by');

    try {

        if(userId && startDate && endDate && timezone && groupBy) {
        
            if(groupBy == "expense_type") {
                
                const expenses = await Expense.aggregate([
                    {
                        $addFields: {
                            date: {
                                $dateToString: {
                                    date: "$createdAt",
                                    timezone: timezone
                                }
                            }
                        }
                    },
                    {
                        $match: {
                            user: new ObjectId(userId!),
                            date: {
                                $gte: startDate,
                                $lt: endDate,
                            },
                        }
                    },
                    {
                        $group: {
                            _id: "$expenseType",
                            totalAmount: { $sum: "$amount" }
                        }
                    },
                    {
                        $addFields: {
                            expenseType: "$_id"
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    },
                    {
                        $lookup: {
                            from: "expensetypes",
                            localField: "expenseType",
                            foreignField: "_id",
                            as: "expenseType"
                        }
                    },
                    {
                        $unwind: "$expenseType"
                    },
                    {
                        $sort: {
                            totalAmount: -1
                        }
                    }
                ])

                const totalAmount = await Expense.aggregate([
                    {
                        $addFields: {
                            date: {
                                $dateToString: {
                                    date: "$createdAt",
                                    timezone: timezone
                                }
                            }
                        }
                    },
                    {
                        $match: {
                            user: new ObjectId(userId),
                            date: {
                                $gte: startDate,
                                $lt: endDate
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$user",
                            totalAmount: { $sum: "$amount" }
                        }
                    }
                ])

                console.log(totalAmount)

                return Response.json({ success: true, data: expenses, totalAmount: expenses.length > 0 ? totalAmount[0].totalAmount : 0 });

            } else if(groupBy == "date") {
    
                const expenses = await Expense.aggregate([
                    {
                        $match: {
                            user: new ObjectId(userId)
                        }
                    },
                    {
                        $lookup: {
                            from: "expensetypes",
                            localField: "expenseType",
                            foreignField: "_id",
                            as: "expenseType"
                        }
                    },
                    {
                        $unwind: "$expenseType"
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user"
                        }
                    },
                    {
                        $unwind: "$user"
                    },
                    {
                        $addFields: {
                            dateOnly: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$createdAt",
                                    timezone: timezone
                                }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$dateOnly",
                            expenses: {
                                $push: {
                                    _id: "$_id",
                                    expenseType: "$expenseType",
                                    user: "$user",
                                    amount: "$amount",
                                    description: "$description",
                                }
                            }
                        }
                    },
                    {
                        $addFields: {
                            date: "$_id"
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                        }
                    },
                    {
                        $sort: {
                            date: -1,
                        }
                    }
                ])
                return Response.json({ success: true, data: expenses });

            }
    
        } else if(userId && startDate && endDate && expenseTypeId && timezone) {
    
            const expenses = await Expense.aggregate([
                {
                    $addFields: {
                        date: {
                            $dateToString: {
                                date: "$createdAt",
                                timezone: timezone
                            }
                        }
                    }
                },
                {
                    $match: {
                        user: new ObjectId(userId),
                        expenseType: new ObjectId(expenseTypeId),
                        date: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                }
            ])

            const totalAmount = await Expense.aggregate([
                {
                    $addFields: {
                        date: {
                            $dateToString: {
                                date: "$createdAt",
                                timezone: timezone
                            }
                        }
                    }
                },
                {
                    $match: {
                        user: new ObjectId(userId),
                        expenseType: new ObjectId(expenseTypeId),
                        date: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                },
                {
                    $group: {
                        _id: "$user",
                        totalAmount: { $sum: "$amount" }
                    }
                }
            ])
            
            if (expenses.length > 0) {
                return Response.json({ success: true, data: expenses, totalAmount: totalAmount[0].totalAmount });
            }
    
            return Response.json({ success: true, data: expenses, totalAmount: 0 });
    
        } else if(userId && timezone) {

            const expenses = await Expense.aggregate([
                {
                    $match: {
                        user: new ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "expensetypes",
                        localField: "expenseType",
                        foreignField: "_id",
                        as: "expenseType"
                    }
                },
                {
                    $unwind: "$expenseType"
                },
                {
                    $addFields: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt",
                                timezone: timezone
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        user: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0
                    }
                },
            ])

            return Response.json({ success: true, data: expenses })

        }

        return Response.json({ success: false });

    } catch (error) {
        return Response.json({ success: false });
    }
}

export async function POST(req: Request) {

    await dbConnect()

    try {
        const body = await req.json()
        const expense = await Expense.create(body);
        return Response.json({ success: true, data: expense });
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}

// POST
// GET BY ID
// PUT BY ID
// DELETE BY ID
// GET BY USER ID
// GET BY USER ID, EXPENSE TYPE ID, DATE
// GET BY USER ID, DATE (GROUPED BY EXPENSE TYPE)
// GET BY USER ID, DATE, TIMEZONE (GROUPED BY DATE)

// QUERY PARAMETER
// USER ID
// EXPENSE TYPE ID
// DATE
// TIMEZONE
// GROUP BY
// SORT BY