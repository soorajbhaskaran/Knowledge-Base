# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :category, foreign_key: "category_id", class_name: "Category"
  belongs_to :author, foreign_key: "author_id", class_name: "User"

  enum status: { draft: "draft", published: "published" }

  validates :title, presence: true, length: { maximum: 25 }
  validates :content, presence: true, length: { maximum: 100 }
end
