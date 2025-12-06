import { Injectable } from '@nestjs/common';

export interface BreakdownItem {
  denomination_id: number;
  subtotal_rub: number;
}

export interface ResultData {
  request_id: string;
  breakdown: BreakdownItem[];
}

@Injectable()
export class ResultService {
  private readonly store = new Map<string, ResultData>();

  saveResult(data: ResultData) {
    this.store.set(data.request_id, data);
  }

  getResult(id: string): ResultData | undefined {
    return this.store.get(id);
  }
}
