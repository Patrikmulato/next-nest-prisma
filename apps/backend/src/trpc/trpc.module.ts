import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trcp.router';

@Module({
  imports: [],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
