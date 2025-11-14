import { cache } from "react";

import type { Prisma } from "@/lib/generated/prisma/client";

import { prisma } from "@/lib/db";

export interface PublicRulingListItem {
  orderNumber: string;
  caseNumber: string;
  title: string;
  category: string | null;
  issuedDate: Date;
  status: string;
  claimAmount: number | null;
  summary: string;
  adjudicatorName: string | null;
}

export interface PublicRulingDetail extends PublicRulingListItem {
  filedDate: Date;
  caseDescription: string | null;
  content: string;
  pdfPath: string | null;
}

const ORDER_INCLUDE = {
  case: {
    select: {
      caseNumber: true,
      category: true,
      filedDate: true,
      status: true,
      claimAmount: true,
      description: true,
    },
  },
  adjudicator: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
} satisfies Parameters<typeof prisma.order.findMany>[0]["include"];

type OrderWithCase = Prisma.OrderGetPayload<{
  include: typeof ORDER_INCLUDE;
}>;

const buildSummary = (content: string | null, fallback: string) => {
  if (!content?.trim()) {
    return fallback;
  }

  const trimmed = content.trim().replace(/\s+/g, " ");

  return trimmed.length > 240 ? `${trimmed.slice(0, 237)}…` : trimmed;
};

const formatAdjudicatorName = (
  adjudicator: OrderWithCase["adjudicator"] | null,
) => {
  if (!adjudicator) {
    return null;
  }

  const { firstName, lastName } = adjudicator;

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return firstName ?? lastName ?? null;
};

const toTitleCase = (value: string) =>
  value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const buildTitle = (order: OrderWithCase) => {
  if (order.case.category) {
    return `${toTitleCase(order.case.category)} Decision`;
  }

  return `Decision for ${order.case.caseNumber}`;
};

const serializeClaimAmount = (value: OrderWithCase["case"]["claimAmount"]) => {
  if (!value) {
    return null;
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "bigint") {
    return Number(value);
  }

  if (typeof value === "string") {
    return Number(value);
  }

  if (typeof (value as Prisma.Decimal).toNumber === "function") {
    return Number((value as Prisma.Decimal).toNumber());
  }

  return Number(value);
};

const mapOrderToListItem = (
  order: OrderWithCase,
): PublicRulingListItem => {
  return {
    orderNumber: order.orderNumber,
    caseNumber: order.case.caseNumber,
    title: buildTitle(order),
    category: order.case.category,
    issuedDate: order.issuedDate,
    status: order.case.status,
    claimAmount: serializeClaimAmount(order.case.claimAmount),
    summary: buildSummary(
      order.content,
      "Final decision issued by the tribunal. Details will be available soon.",
    ),
    adjudicatorName: formatAdjudicatorName(order.adjudicator),
  };
};

const mapOrderToDetail = (order: OrderWithCase): PublicRulingDetail => {
  return {
    ...mapOrderToListItem(order),
    filedDate: order.case.filedDate,
    caseDescription: order.case.description,
    content: order.content,
    pdfPath: order.pdfPath,
  };
};

export const getPublicRulings = cache(async (): Promise<PublicRulingListItem[]> => {
  const orders = await prisma.order.findMany({
    where: {
      orderType: "final_decision",
    },
    include: ORDER_INCLUDE,
    orderBy: {
      issuedDate: "desc",
    },
  });

  return orders.map(mapOrderToListItem);
});

export const getPublicRuling = cache(async (orderNumber: string): Promise<PublicRulingDetail | null> => {
  const order = await prisma.order.findFirst({
    where: {
      orderNumber,
      orderType: "final_decision",
    },
    include: ORDER_INCLUDE,
  });

  if (!order) {
    return null;
  }

  return mapOrderToDetail(order);
});

