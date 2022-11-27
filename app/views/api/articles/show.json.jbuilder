# frozen_string_literal: true

json.article do
  json.partial! "api/articles/article", article: @article
  json.category @article.category
  json.published_date @article.published_date
  json.restored_from @article.restored_from
end
