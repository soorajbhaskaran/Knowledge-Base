  # frozen_string_literal: true

  json.articles @articles do |article|
    json.partial! "articles/article", article: article
    json.date article.published_date
    json.category article.category.title
    json.author "#{article.author.first_name} #{article.author.last_name}"
  end
