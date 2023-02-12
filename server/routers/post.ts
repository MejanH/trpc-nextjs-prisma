import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../prisma";
import { procedure, router } from "../trpc";

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  content: true,
});
export const postRouter = router({
  list: procedure.query(async () => {
    return prisma.post.findMany();
  }),
  add: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.post.create({
        data: input,
        select: defaultPostSelect,
      });
    }),
  delete: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
