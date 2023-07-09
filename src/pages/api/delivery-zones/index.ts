import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { deliveryZoneValidationSchema } from 'validationSchema/delivery-zones';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDeliveryZones();
    case 'POST':
      return createDeliveryZone();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDeliveryZones() {
    const data = await prisma.delivery_zone
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'delivery_zone'));
    return res.status(200).json(data);
  }

  async function createDeliveryZone() {
    await deliveryZoneValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.delivery_zone.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
