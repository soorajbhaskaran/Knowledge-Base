# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_TITLE_LENGTH = 50

  has_many :articles
  belongs_to :author, class_name: "User", foreign_key: "author_id"

  validates :title, presence: true, uniqueness: true, length: { maximum: MAX_CATEGORY_TITLE_LENGTH }

  acts_as_list

  def split_category_articles_based_on_status
    articles = {
      published: self.articles.of_status(:published),
      draft: self.articles.of_status(:draft)
    }
 end

  def self.show_category_with_published_articles
    category = Category.includes(:articles).map do |category|
      category.attributes.merge(
        {
          articles: category.articles.of_status(:published)
        }) if category.articles.of_status(:published).present?
    end
    category.compact
  end
end
