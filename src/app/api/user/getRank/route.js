import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Rank from "@/models/rankSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensure compatibility with Mongoose

export async function GET(req) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const usersRank = await Rank.findOne({ userDetails: userId });

    if (!usersRank) {
      return NextResponse.json(
        {
          message: "Rank of this user cannot be calculated",
          success: false,
        },
        { status: 404 }
      );
    }

    const safeDivide = (num, denom, multiplier = 1) =>
      denom && denom !== 0 ? (num / denom) * multiplier : 0;

    const reviewScore = safeDivide(
      usersRank.clientRating.totalRating,
      usersRank.clientRating.totalReviews,
      5
    );

    const accuracyScore = safeDivide(
      usersRank.timeAccuracy.accuracyScore,
      usersRank.timeAccuracy.totalDeliveries
    );

    let rehireScore = safeDivide(
      usersRank.rehireRate.sameClient,
      usersRank.rehireRate.totalWork,
      4
    );
    if (rehireScore > 10) rehireScore = 10;

    const subjectScore = usersRank.subjectKnowledge;

    const quizScore = safeDivide(
      usersRank.freelanceQuiz.quizScore,
      usersRank.freelanceQuiz.totalQuiz,
      0.5
    );

    const experienceScore = usersRank.experience * 0.5;

    const responseScore = safeDivide(
      usersRank.responseTime.totalScore,
      usersRank.responseTime.totalWork,
      0.5
    );

    const conversionScore = safeDivide(
      usersRank.conversionRate.acceptedProposals,
      usersRank.conversionRate.totalProposals,
      1
    );

    const uspScore = safeDivide(
      usersRank.uspClearity.uspRelated,
      usersRank.uspClearity.totalWorkDone,
      0.5
    );

    const profileScore = usersRank.profileCompletion;
    const plagScore = usersRank.plaigFreeContent * 0.5;
    const loyalityScore = usersRank.platformLoyality * 0.5;

    const rank =
      reviewScore +
      accuracyScore +
      rehireScore +
      subjectScore +
      quizScore +
      experienceScore +
      responseScore +
      conversionScore +
      uspScore +
      profileScore +
      plagScore +
      loyalityScore;

    usersRank.rank = rank / 10;
    await usersRank.save();

    await User.findByIdAndUpdate(userId, { rank: rank / 10 });

    return NextResponse.json(
      {
        message: "Rank calculated successfully",
        success: true,
        rank: rank / 10,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
