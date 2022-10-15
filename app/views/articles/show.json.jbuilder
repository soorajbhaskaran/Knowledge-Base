# frozen_string_literal: true

json.article do
  json.title @article.title
  json.content @article.content
  json.status @article.status
  json.category @article.category
  json.slug @article.slug
  json.published_date @article.published_date
end
