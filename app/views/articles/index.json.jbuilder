# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :title,
    :content,
    :status,
    :created_at

  json.category article.category.title
  json.author "#{article.author.first_name} #{article.author.last_name}"
end
