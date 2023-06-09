import { createTRPCRouter, publicProcedure, privateProcedure } from '../trpc'
import { z } from 'zod'

export const imovelRouter = createTRPCRouter({
    getPropertyPhotos: publicProcedure.input(z.object({ imovelId: z.string(), limit: z.number() })).query(async ({ ctx, input }) => {
        if (!input.imovelId) {
            throw new Error('No property provided')
        }
        if (input.limit === 1) {
            return await ctx.prisma.fotoImovel.findFirst({
                where: {
                    imovelId: input.imovelId,
                    isAtivo: true
                },
                take: input.limit,
                orderBy: {
                    isPrincipal: 'desc'
                }
            })
        }
        return await ctx.prisma.fotoImovel.findMany({
            where: {
                imovelId: input.imovelId,
                isAtivo: true
            },
            take: input.limit,
            orderBy: {
                isPrincipal: 'desc'
            }
        })
    })
})