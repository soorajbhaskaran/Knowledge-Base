# frozen_string_literal: true

class SearchArticlesService < ApplicationService
  attr_accessor :query, :categories_ids, :status

  def initialize(query, categories_ids, status)
    @query = query
    @categories_ids = categories_ids
    @status = status
  end

  def process
    articles = current_user.articles.includes(:category).where("lower(title) LIKE ?", "%#{query.downcase}%")
    !status.blank? && articles = articles.where(status: status)
    !categories_ids.blank? && articles = articles.map { |article|
      article if categories_ids.include?(article.category_id) }.compact
    articles
  end
end
