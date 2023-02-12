import { z } from "zod";
import { procedure, router } from "../trpc";
import { postRouter } from "./post";

export const appRouter = router({
  post: postRouter,
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
