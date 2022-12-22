# frozen_string_literal: true

class FilterArticlesService < ApplicationService
  attr_reader :categories_ids, :status

  def initialize(categories_ids, status)
    @categories_ids = categories_ids
    @status = status
  end

  def process
    articles = current_user.articles.includes(:category)
    articles = categories_ids.reduce([]) { |articles_list, category_id|
 articles_list + articles.where(category_id: category_id) }
    return articles.uniq if status.blank?

    articles = articles.select { |article| article.status == status } if status.present?
  end
end
