import { Article } from 'src/app/shared/models/article-interface';

export interface ResponseMultiArticles {
  articles: [Article];
  articlesCount: number;
}
