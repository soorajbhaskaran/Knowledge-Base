# frozen_string_literal: true

json.article do
  json.partial! "articles/article", article: @article
  json.category @article.category
  json.published_date @article.published_date
end
