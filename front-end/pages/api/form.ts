import { NextApiResponse, NextApiRequest } from "next";
import { ethers } from 'ethers';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const { body } = req
    const { amount, completionDate } = body;

    res.status(200).json({
        amount: amount,
        completionDate: completionDate
    })
}