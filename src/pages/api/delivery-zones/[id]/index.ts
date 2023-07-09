import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { deliveryZoneValidationSchema } from 'validationSchema/delivery-zones';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.delivery_zone
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDeliveryZoneById();
    case 'PUT':
      return updateDeliveryZoneById();
    case 'DELETE':
      return deleteDeliveryZoneById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDeliveryZoneById() {
    const data = await prisma.delivery_zone.findFirst(convertQueryToPrismaUtil(req.query, 'delivery_zone'));
    return res.status(200).json(data);
  }

  async function updateDeliveryZoneById() {
    await deliveryZoneValidationSchema.validate(req.body);
    const data = await prisma.delivery_zone.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDeliveryZoneById() {
    const data = await prisma.delivery_zone.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
