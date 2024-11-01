import {
  prepareSubscriberData,
  validateSubscriber,
} from "~/utils/validateSubscriber";

import type { ActionValidationErrors } from "~/types/commonTypes";
import { differenceInMonths, differenceInYears } from "date-fns";
import type { Subscriber } from "@prisma/client";

export const subscribeUser = async (
  subscriber: FormData,
  errors: ActionValidationErrors,
) => {
  const data = prepareSubscriberData(subscriber);
  const isValid = validateSubscriber(data, errors);
  if (!isValid) {
    return null;
  }

  const newSubscriber = await prisma.subscriber.upsert({
    where: {
      email: data.email,
    },
    update: data,
    create: data,
  });

  return newSubscriber;
};

const countNumbers = async (field: keyof Subscriber) => {
  const counts = await prisma.subscriber.groupBy({
    by: [field],
    _count: { [field]: true },
  });

  return counts.map((item) => ({
    field: item[field],
    count: item._count[field],
  }));
};

export const getAnalytics = async () => {
  const totalSubscribers = await prisma.subscriber.count();
  const averageAge = await getAverageAge();

  const ageGroups = {
    "<10": 0,
    "10-20": 0,
    "20-30": 0,
    "30-40": 0,
    "40-50": 0,
    "50-60": 0,
    "60-70": 0,
    "70+": 0,
  };

  const subscribers = await prisma.subscriber.findMany({
    select: { dateOfBirth: true },
  });

  subscribers.forEach((subscriber) => {
    const age = differenceInYears(new Date(), subscriber.dateOfBirth);

    if (age < 10) ageGroups["<10"]++;
    else if (age < 20) ageGroups["10-20"]++;
    else if (age < 30) ageGroups["20-30"]++;
    else if (age < 40) ageGroups["30-40"]++;
    else if (age < 50) ageGroups["40-50"]++;
    else if (age < 60) ageGroups["50-60"]++;
    else if (age < 70) ageGroups["60-70"]++;
    else ageGroups["70+"]++;
  });

  const lifePathStats = await countNumbers("lifePathNumber");
  const expressionStats = await countNumbers("expressionNumber");
  const soulStats = await countNumbers("soulNumber");
  const personalStats = await countNumbers("personalNumber");

  return {
    totalSubscribers,
    averageAge,
    ageGroups,
    stats: {
      lifePath: lifePathStats,
      expression: expressionStats,
      soul: soulStats,
      personal: personalStats,
    },
  };
};

const getAverageAge = async () => {
  const subscribers = await prisma.subscriber.findMany({
    select: { dateOfBirth: true },
  });

  const totalAge = subscribers.reduce(
    (acc, subscriber) => {
      const ageInYears = differenceInYears(new Date(), subscriber.dateOfBirth);
      const ageInMonths =
        differenceInMonths(new Date(), subscriber.dateOfBirth) % 12;
      return {
        totalYears: acc.totalYears + ageInYears,
        totalMonths: acc.totalMonths + ageInMonths,
      };
    },
    { totalYears: 0, totalMonths: 0 },
  );

  const averageYears = Math.floor(totalAge.totalYears / subscribers.length);
  const averageMonths = Math.floor(totalAge.totalMonths / subscribers.length);

  return `${averageYears} years ${averageMonths} ${averageMonths > 1 ? "months" : "month"}`;
};
