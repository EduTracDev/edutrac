import { PaginationQueryDto } from './pagination-query.dto';
import { SearchQueryDto } from './search-query.dto';
import { SortQueryDto } from './sort-query.dto';

export class BaseQueryDto extends PaginationQueryDto {
  search?: string;

  sortBy?: string;

  order?: 'asc' | 'desc';
}