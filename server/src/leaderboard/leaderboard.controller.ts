import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly service: LeaderboardService) { }

    @Get('refresh')
    async refresh() {
        //? Never forget to add "()", or whole code of the method will be disclosed
        return this.service.refresh();
    }

    @Get()
    async list(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0
        ) {
        return this.service.list(limit, offset);
    }
}
