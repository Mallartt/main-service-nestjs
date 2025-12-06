import { Controller, Put, Body, Get, Param, BadRequestException } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('api/exchange_result') 
export class ResultController {
  private readonly SECRET_TOKEN = 'MY_SECRET_TOKEN';

  constructor(private readonly resultService: ResultService) {}

  @Put()
  acceptResult(@Body() body: any) {
    const { token, request_id, breakdown } = body;

    if (!token || !request_id || !breakdown) {
      throw new BadRequestException('Invalid payload');
    }

    if (token !== this.SECRET_TOKEN) {
      throw new BadRequestException('Invalid token');
    }

    this.resultService.saveResult({ request_id, breakdown });

    return { status: 'ok' };
  }

  @Get(':id')
  getResult(@Param('id') id: string) {
    const data = this.resultService.getResult(id);

    if (!data) {
      return { error: 'not found' };
    }

    return data;
  }
}
