# frozen_string_literal: true

class FilterArticlesService < ApplicationService
  attr_reader :categories_ids, :status

  def initialize(categories_ids, status)
    @categories_ids = categories_ids
    @status = status
  end

  def process
    articles = categories_ids.reduce([]) { |articles, category_id| articles + Article.where(category_id: category_id) }
    return articles.uniq if status.blank?

    status && articles = articles.select { |article| article.status == status }
  end
end
